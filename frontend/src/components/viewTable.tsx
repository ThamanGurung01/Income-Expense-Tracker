
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getService } from '../services/Api/getService';
import { viewTableProps } from './components-types';
// import { deleteService } from '../services/Api/deleteService';
const ViewTable:React.FC<viewTableProps> = ({value}) => {
  const [viewData,setViewData]=useState<Array<{[key:string]:string}>>([]);
  const navigate=useNavigate();
  async function getRequest(){
      try{
        const AllData=await getService(value);
        if(AllData.length>0){
          setViewData(AllData);
        }else {
          console.log("error");
        }
      }catch(error){
        console.error(`Error fetching ${value} data:`, error);
      }
  }
  async function handleUpdate(id:string, value:string){
    navigate("/update/"+id+"/"+value);
  }
  useEffect(()=>{getRequest();},[value]);
  return (
    <div className=''>
      <legend className='text-center mt-5 pb-5 text-2xl font-bold underline'>{value.toUpperCase()}</legend>
      <table className='table-auto tableStyle border-collapse border border-red-600'>
    <thead>
<tr>
<th className='tableElementBorder tableStyleRow'>Amount</th>
      <th className='tableElementBorder tableStyleRow'>Category</th>
      <th className='tableElementBorder tableStyleRow'>Date</th>
</tr>
    </thead>
    <tbody>
{viewData.map((el,i)=> (el[value+"_category"])?(<tr className='tableRow' onClick={()=>{handleUpdate(el["_id"],value)}} key={i}>
<td className='tableElementBorder tableStyleRow' title={el[value+"_description"]}>{el[value+"_amount"]}</td>
<td className='tableElementBorder tableStyleRow' title={el[value+"_description"]}>{el[value+"_category"]}</td>
<td className='tableElementBorder tableStyleRow' title={el[value+"_description"]}>{el[value+"_date"]}</td>

</tr>):( <tr key={i}><td className='tableElementBorder text-center' colSpan={4}>No data found</td></tr> )
 )}
    </tbody>
  </table>
    </div>
  )
}

export default ViewTable