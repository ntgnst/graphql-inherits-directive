import { visit } from 'graphql/language';

const INHERITS = 'inherits';

const applyInheritsDirective = ({ typeDefs, resolvers }) => {
  const objectTypeMap = {};

  visit(typeDefs, {
    enter: {
      ObjectTypeDefinition: (node) => {
        objectTypeMap[node.name.value] = { fieldDefs: node.fields, fieldResolvers: resolvers[node.name.value] };
      },
    },
  });

  const newResolvers = { ...resolvers };

  const newTypeDefs = visit(typeDefs, {
    enter: {
      ObjectTypeDefinition: (node) => {
        if ('directives' in node && node.directives?.length) {
          const inheritsDirective = node.directives.find((directive) => directive.name.value === INHERITS);

          if (inheritsDirective) {
            const inheritedType = inheritsDirective.arguments[0].value.value;

            // Directive parameter if is not in types.
            if (!(inheritedType in objectTypeMap)) {
              throw `Invalid parameter. Parameter ${inheritedType} not in type definitions.`;
            }

            const { fieldDefs, fieldResolvers } = objectTypeMap[inheritedType];
            newResolvers[node.name.value] = { ...fieldResolvers, ...newResolvers[node.name.value] };

            return { ...node, fields: [...fieldDefs, ...node.fields] };
          }
        }
      },
    },
  });

  return {
    typeDefs: newTypeDefs,
    resolvers: newResolvers,
  };
};

export {
  applyInheritsDirective,
};
