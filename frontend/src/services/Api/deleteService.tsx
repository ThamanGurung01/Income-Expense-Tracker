const post_url=import.meta.env.VITE_BACKEND_URL;
export const deleteService=async(value:string,id:string)=>{
  try{
    const getRequest=post_url+value+"/"+id;
    const response=await fetch(getRequest,{
      method:"DELETE",
      credentials:"include",
    }); 
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, response.statusText);
      throw new Error('Failed to fetch: ' + response.statusText);
  }
    return await response.json();
  }catch(error){
    throw new Error(`Error in GET request: ${(error as Error).message}`);
  }
}