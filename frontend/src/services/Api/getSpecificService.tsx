const post_url=import.meta.env.VITE_BACKEND_URL;
export const getSpecificService=async(value:string,id:string)=>{
  try{
    const getRequest=post_url+value+"/"+id;
    const response=await fetch(getRequest,{
      method:"GET",
      credentials:"include",
    }); 
    return await response.json();
  }catch(error){
    throw new Error(`Error in GET request: ${(error as Error).message}`);
  }
}