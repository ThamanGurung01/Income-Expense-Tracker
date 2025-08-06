import { getCookie } from "../Authentication/cookieService";

const post_url=import.meta.env.VITE_BACKEND_URL;
export const patchService=async(data:object,value:string,id?:string)=>{
  try{
    const url=post_url+value;
    const token=getCookie("Token");
    const response=await fetch(url+"/"+id,{
      method:"PATCH",
      credentials:"include",
      headers:{
        'Authorization': `Bearer ${token}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    }); 
    return await response.json();
  }catch(error){
  }
}