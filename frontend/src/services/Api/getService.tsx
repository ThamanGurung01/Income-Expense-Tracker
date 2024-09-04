const post_url=import.meta.env.VITE_BACKEND_URL;

export const getService=async(value:string)=>{
  try{
    const response=await fetch(post_url+value,{
      method:"GET",
      credentials:"include",
    }); 
    return await response.json();
  }catch(error){
  }
}