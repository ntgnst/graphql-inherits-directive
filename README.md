# graphql-utils

## `buildSchema([module,...,moduleN])`
### `Module: { typeDefs, resolvers }`
#### Merges given modules as parameter. 
#### If there is conflict between modules, prefers right module and overrides left module's definitions and resolvers .
#### Also provides usage of *`@inherits`* directive in type definitions. (`OBJECT_TYPE_DEFINITION`)
####  *`@inherits`* directive injects given (as parameter) type's fields and resolvers into declared type.
  
#### So you get rid of the extra definition.
### Usage:

#### Initial *`typeDefs`*.
```
 type Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }

 type Human @inherits(type: "Character") {
    totalCredits: Int
  }
  
 type Droid @inherits(type: "Character") {
    primaryFunction: String
  }
```

#### After merge it will generate *`typeDefs`* below:
```
type Character {
   id: ID!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
 }

type Human {
   id: ID!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
   totalCredits: Int
}
  
type Droid {
   id: ID!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
   primaryFunction: String
}
```

### *Also you can override field definitions.*

#### *`ModuleA`*
```
type Character {
   id: ID!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
}
```

### *`ModuleB`*

```
type Human @inherits(type: "Character") {
   id: Int!
   totalCredits: String
}
```

#### After merge it generate output below:
```
type Character {
   id: ID!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
}

type Human {
   id: Int!
   name: String!
   friends: [Character]
   appearsIn: [Episode]!
   totalCredits: String
}
```

### Example usage#1:
```
...
import * as moduleA from '/your/moduleA';
import * as moduleB from '/your/moduleB';

const schema = buildSchema([moduleA, moduleB]);

const server = new ApolloServer({
  schema,
});
```

### Example usage#2:
```
...
import { buildSchema } from 'graphql-utils';
import * as moduleA from '/your/moduleA';
import * as moduleB from '/your/moduleB';

const schema = buildSchema([moduleA, moduleB]);

const server = new ApolloServer({
  schema: buildSubgraphSchema(schema),
});
```
---

## `extend(oldResolver, ...args)`
#### Extends given resolver.

### Usage:
#### *`ModuleA`* Resolver:
```
const resolvers = {
  Query: {
    getUser: () => {
      return {
        id: 1,
        name: 'The',
      }
    },
  },
  User: {
    name: (parent) => {
      return parent.name;
    }
  }
};
```

#### *`ModuleB`* resolver:
```
const resolvers = {
  Query: {
    getUser: extend((oldResolver, parent) => {
      const result = oldResolver(parent);
      
      return {
        ...result,
        name: result.name + ' White'; 
      }
    }),
  },
  User: {
    name: (parent) => {
      return 'Gandalf ' + parent.name;
    }
  }
};
```

#### After extending User resolver in *`ModuleB`*, it querying user's name returns result like this:
```
{
"getUser": {
  "id": "1"
  "name": "Gandalf The White",
 }
}
```




