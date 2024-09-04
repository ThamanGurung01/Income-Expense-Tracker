const post_url=import.meta.env.VITE_BACKEND_URL;

export const getService=async(value:string)=>{
  try{
    const url=post_url+value;
    const response=await fetch(url,{
      method:"GET",
      credentials:"include",
    }); 
    return await response.json();
  }catch(error){
  }
}