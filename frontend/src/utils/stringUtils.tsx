
export function capitalizeFirstLetter(str:string):string{
  if(typeof str!=="string" || !str.length) return "";
  return str.charAt(0).toUpperCase()+str.slice(1);
}