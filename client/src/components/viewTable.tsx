
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getService } from '../services/Api/getService';
import { viewTableProps } from './components-types';
import { TailSpin } from 'react-loader-spinner';
// import { deleteService } from '../services/Api/deleteService';
const ViewTable:React.FC<viewTableProps> = ({value}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [viewData,setViewData]=useState<Array<{[key:string]:string}>>([]);
  const navigate=useNavigate();
  async function getRequest(){
    setLoading(true);
      try{
        const AllData=await getService(value);
        if(AllData.length>0){
          setViewData(AllData);
        }else {
          console.log("error");
        }
      }catch(error){
        console.error(`Error fetching ${value} data:`, error);
      }finally{
        setLoading(false);
      }
  }
  async function handleUpdate(id:string, value:string){
    navigate("/update/"+id+"/"+value);
  }
  useEffect(()=>{getRequest();},[value]);

  if (loading) {
    return (
      <div className="mt-72">
        <TailSpin height="60" width="60" color="#4f46e5" />
      </div>
    );
  }
  return (
    <div className=''>
      <legend className='text-center mt-5 pb-5 text-2xl font-bold underline'>{value.toUpperCase()}</legend>
      <table className='w-full table-auto tableStyle border-collapse border border-red-600'>
    <thead>
<tr className='px-10'>
<th className='tableElementBorder tableStyleRow'>Amount</th>
      <th className='tableElementBorder tableStyleRow'>Category</th>
      <th className='tableElementBorder tableStyleRow'>Date</th>
</tr>
    </thead>
    <tbody>
{
(viewData.length!==0)?(viewData.map((el,i)=>(<tr className='tableRow bg-white hover:bg-indigo-50 cursor-pointer transition-colors duration-200' onClick={()=>{handleUpdate(el["_id"],value)}} key={i}>
  <td className='tableElementBorder tableStyleRow text-left' title={el[value+"_description"]}>{el[value+"_amount"]}</td>
  <td className='tableElementBorder tableStyleRow text-left' title={el[value+"_description"]}>{el[value+"_category"]}</td>
  <td className='tableElementBorder tableStyleRow text-left' title={el[value+"_description"]}>{el[value+"_date"]}</td>
</tr>))
):( <tr><td className='tableElementBorder text-center' colSpan={4}>No data found</td></tr> )
 }
    </tbody>
  </table>
    </div>
  )
}

export default ViewTable