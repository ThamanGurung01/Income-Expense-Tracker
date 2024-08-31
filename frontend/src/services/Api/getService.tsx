const post_url=import.meta.env.VITE_BACKEND_URL;

export const getService=async(value:string)=>{
  try{
    const response=await fetch(post_url+value,{
      method:"GET",
    }); 
    return await response.json();
  }catch(error){
    throw new Error(`Error in POST request: ${(error as Error).message}`);
  }
}