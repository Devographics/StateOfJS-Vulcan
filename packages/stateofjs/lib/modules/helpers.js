/*

Replace all occurences of a string

*/
// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function(search, replacement) {
  const target = this
  return target.replace(new RegExp(search, 'g'), replacement)
}

/*

Take a string ("Front-end") and make it usable as an ID ("frontend")

*/
const disallowedCharacters = '?.(){}[]=>&,/- ';
export const makeId = str => {
  let s = str.toLowerCase()
  const charArray = [...disallowedCharacters]
  charArray.forEach(c => {
      s = s.replaceAll(`\\${c}`, '');
  })
  return s
}