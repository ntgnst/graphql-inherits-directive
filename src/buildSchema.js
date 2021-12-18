import { gql } from 'apollo-server';
import { curry, reverse, uniqWith } from 'ramda';
import { mergeResolvers } from './internal/mergeResolvers';
import { mergeTypeDefs } from './internal/mergeTypeDefs';
import { applyInheritsDirective } from './internal/applyInheritsDirective';

const overrideDefinition = curry((typeDef, key) => {
  if (typeDef[key]?.length) {
    typeDef[key] = uniqWith(
      (field) => typeDef[key].filter((f) => f.kind === field.kind && f.name.value === field.name.value).length > 1,
      reverse(typeDef[key]),
    );
  }
});

const overrideDefinitions = (typeDefs) => {
  typeDefs.definitions.forEach((typeDef) => {
    ['fields', 'directives', 'interfaces'].forEach(overrideDefinition(typeDef));
  });
};
/**
* @type {Function}
* @param {Function} modules - [{typeDefs,resolvers}, ..., {typeDefsN,resolversN}]
* @returns {Object}
  *{
  * typeDefs: mergedTypeDefs,
  * resolver: mergedResolverDefs
  *}
  *
  *
* ---
* IMPORTANT NOTE
*
** If there is conflict between modules, prefers right module and overrides left module's definitions and resolvers .
** Merges given schemas. Also provides usage of '@inherits' directive in type definitins
** '@inherits' directive injects given type's fields and resolvers into current type.
* ---
*
* ---
* Usage:
* ---
** Usage of *'@inherits'* direvtice on type definition.
*
*```
  type User {
    id: ID
    firstName: String
    lastName: String
  }

  type Profile -@inherits-(type: "User") {
     profileUrl: String
  }

  // Result SDL:

  type Profile {
    id: ID //injected
    firstName: String //injected
    lastName: String // injected
    profileUrl: String // built-in field
  }
*```
*
* ---
*
* ```
import * as userModule from './user';
import * as profileModule from './profile';

const schema = buildSchema([userModule, profileModule]);
* ```
*/
const buildSchema = (modules) => {
  const inheritsDirective = gql`
    directive @inherits(type: String) on OBJECT
  `;

  const mappedModules = modules.reduce(
    (acc, { typeDefs, resolvers }) => ({
      typeDefs: (acc.typeDefs || []).concat(typeDefs),
      resolvers: (acc.resolvers || []).concat(resolvers),
    }),
    {},
  );

  const mergedResolvers = mergeResolvers(mappedModules.resolvers);
  const mergedTypeDefs = mergeTypeDefs(mappedModules.typeDefs.concat(inheritsDirective));
  const schema = applyInheritsDirective({ typeDefs: mergedTypeDefs, resolvers: mergedResolvers });
  overrideDefinitions(schema.typeDefs);

  return schema;
};

export {
  buildSchema,
};
