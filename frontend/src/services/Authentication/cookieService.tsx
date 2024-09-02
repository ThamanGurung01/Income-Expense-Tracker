
export const cookieService = async(token:string) => {
let date=new Date();
date.setTime(date.getTime()+(30*24*60*60*1000));
let expires="expires="+ date.toUTCString();
document.cookie =`Token=${token}; ${expires}; path=/`;
}