import { assocPath } from 'ramda';

const extend = (extendedResolver) => ({
  extended: true,
  resolver: extendedResolver,
});

const mergeResolvers = (allResolvers) => {
  let [firstResolversConfig, ...rest] = allResolvers;

  rest.forEach((resolversConfigs) => {
    Object.entries(resolversConfigs).forEach(([type, resolversConfig]) => {
      Object.entries(resolversConfig).forEach(([field, resolver]) => {
        if (resolver.extended) {
          const oldResolver = firstResolversConfig[type][field];

          const extendedResolver = (...args) => resolver.resolver(oldResolver, ...args);

          firstResolversConfig = assocPath([type, field], extendedResolver, firstResolversConfig);
        } else {
          firstResolversConfig = assocPath([type, field], resolver, firstResolversConfig);
        }
      });
    });
  });

  return firstResolversConfig;
};

export {
  extend,
  mergeResolvers,
};
