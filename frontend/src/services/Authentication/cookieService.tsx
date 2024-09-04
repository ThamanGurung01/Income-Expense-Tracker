import Cookies from "js-cookie";
export const cookieService = async(token:string) => {
// let date=new Date();
// date.setTime(date.getTime()+(30*24*60*60*1000));
// let expires="expires="+ date.toUTCString();
Cookies.set("Token",token,{
  expires: 60,
    path: '/',
})
// document.cookie =`Token=${token}; ${expires}; path=/`;
}
export const getCookie=(key:string)=>{
return Cookies.get(key);
}

export const removeCookie=(key:string)=>{
  Cookies.remove(key, { path: '/' });

  }