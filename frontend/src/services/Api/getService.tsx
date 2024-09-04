const post_url=import.meta.env.VITE_BACKEND_URL;

export const getService=async(value:string)=>{
  try{
    const response=await fetch(post_url+value,{
      method:"GET",
      credentials:"include",
    }); 
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, response.statusText);
  }
    return await response.json();
  }catch(error){
    throw new Error(`Error in GET request: ${(error as Error).message}`);
  }
}