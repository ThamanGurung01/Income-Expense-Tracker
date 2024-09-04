const post_url=import.meta.env.VITE_BACKEND_URL;
export const loginService=async(data:object,value:string)=>{
  try{
    console.log(post_url+value);
    const response=await fetch(post_url+value,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(data),
    }); 
    if (!response.ok) {
      console.error('Failed to fetch:', response.status, response.statusText);
  }
    return await response.json();
  }catch(error){
    throw new Error(`Error in POST request: ${(error as Error).message}`);
  }
}