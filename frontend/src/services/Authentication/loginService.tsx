const post_url=import.meta.env.VITE_BACKEND_URL;
export const loginService=async(data:object,value:string)=>{
  try{
    const url=post_url+value;
    const response=await fetch(url,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    }); 
    return await response.json();
  }catch(error){
  }
}