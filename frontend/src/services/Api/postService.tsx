const post_url=import.meta.env.VITE_BACKEND_URL;
export const postService=async(data:object,value:string)=>{
  try{
    const response=await fetch(post_url+value,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    }); 
    return await response.json();
  }catch(error){
    throw new Error(`Error in POST request: ${(error as Error).message}`);
  }
}