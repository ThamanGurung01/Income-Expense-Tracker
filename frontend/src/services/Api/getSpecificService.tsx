const post_url=import.meta.env.VITE_BACKEND_URL;
export const getSpecificService=async(value:string,id:string)=>{
  try{
    const url=post_url+value;
    const getRequest=url+"/"+id;
    const response=await fetch(getRequest,{
      method:"GET",
      credentials:"include",
    }); 
    return await response.json();
  }catch(error){
  }
}