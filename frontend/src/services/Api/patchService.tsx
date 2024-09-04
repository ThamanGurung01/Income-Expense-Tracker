const post_url=import.meta.env.VITE_BACKEND_URL;
export const patchService=async(data:object,value:string,id?:string)=>{
  try{
    const response=await fetch(post_url+value+"/"+id,{
      method:"PATCH",
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