import { mergeWithKey } from 'ramda';

const mergeDefinition = (key, left, right) => {
  // if it is not definition NO-OP
  if (key !== 'definitions') {
    return left;
  }

  // sometimes left or right can be undefined. proceed with only if neither of them is undefined.
  if (left && right) {
    const mergableKeys = ['interfaces', 'directives', 'fields'];
    // loop-through each definition in right.
    right.forEach((rightDef) => {
      // if both left and right side have the definition
      const existingDef = left.find((el) => el.name.value === rightDef.name.value && el.kind === rightDef.kind);

      if (existingDef) {
        // if there is an existing definition on the left side with the same name and kind,
        // then we should add the definitions on the right side to the left one
        left.splice(
          left.indexOf(existingDef),
          1,
          mergeWithKey(
            (childKey, leftChild, rightChild) => {
              if (mergableKeys.includes(childKey)) {
                return leftChild.concat(rightChild);
              }

              return rightChild;
            },
            existingDef,
            rightDef,
          ),
        );
      } else {
        // Otherwise directly add all definitions on the right side to the left.
        left.push(rightDef);
      }
    });
  }

  // If both left and right aren't undefined try to return defined one, otherwise return undefined.
  return left || right;
};

const mergeTypeDefs = (typeDefs) => {
  const [firstDef, ...restDefs] = typeDefs;

  let mergedTypeDef = { ...firstDef };
  restDefs.forEach((typeDef) => {
    // sum up document length all documents lengths.
    mergedTypeDef.loc.end += typeDef.loc.end;
    mergedTypeDef = mergeWithKey(mergeDefinition, mergedTypeDef, typeDef);
  });

  return mergedTypeDef;
};

export {
  mergeTypeDefs,
};
