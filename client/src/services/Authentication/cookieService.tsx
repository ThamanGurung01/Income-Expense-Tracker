import Cookies from "js-cookie";
export const cookieService = async(token:string) => {
Cookies.set("Token",token,{
  expires: 60,
    path: '/',
    sameSite: 'Lax',
    secure: false
})
}
export const getCookie=(key:string)=>{
return Cookies.get(key);
}

export const removeCookie=(key:string)=>{
  Cookies.remove(key, { path: '/' });
  }