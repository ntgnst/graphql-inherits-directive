/**
* @type {Function}
* @param {Function} resolver - Function
* @returns {Object}
  *{
  * extended: true,
  * resolver: extendedResolver
  *}
  *
* ---
* Usage:
* ---
* Description:
- Extends given resolver.
*
* ```
extend((oldResolver, parent, context?, info?, args?) => {
  * const result = oldResolver(parent);
  * // New Resolver Logic
  * const user = {...result, newProp: 'extended prop'};

  * return user;
}),
* ```
*/
const extend = (extendedResolver) => ({
  extended: true,
  resolver: extendedResolver,
});

export {
  extend,
};
