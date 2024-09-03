
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getService } from '../services/Api/getService';
import { viewTableProps } from './components-types';
import { deleteService } from '../services/Api/deleteService';
const ViewTable:React.FC<viewTableProps> = ({value}) => {
  const [viewData,setViewData]=useState<Array<{[key:string]:string}>>([]);
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
  async function handleDelete(id:string){
    try{
      await deleteService(value,id);
      getRequest();
    }catch(error){
      console.log("error");
    }
  }
  useEffect(()=>{getRequest();},[value]);
  return (
    <div>
      <legend>{value.toUpperCase()}</legend>
      <table className='table-auto border-collapse border border-red-600'>
    <thead>
<tr>
<th className='tableElementBorder'>Amount</th>
      <th className='tableElementBorder'>Category</th>
      <th className='tableElementBorder'>Date</th>
      <th className='tableElementBorder' colSpan={2}>Action</th>
</tr>
    </thead>
    <tbody>
{viewData.map((el,i)=> (el[value+"_category"])?(<tr key={i}>
<td className='tableElementBorder' title={el[value+"_description"]}>{el[value+"_amount"]}</td>
<td className='tableElementBorder' title={el[value+"_description"]}>{el[value+"_category"]}</td>
<td className='tableElementBorder' title={el[value+"_description"]}>{el[value+"_date"]}</td>
<td className='tableElementBorder'><Link to={"/update/"+el["_id"]+"/"+value}>Update</Link></td>
<td className='tableElementBorder'><button onClick={()=>handleDelete(el["_id"])}>Delete</button></td>
</tr>):( <tr key={i}><td className='tableElementBorder text-center' colSpan={4}>No data found</td></tr> )
 )}
    </tbody>
  </table>
    </div>
  )
}

export default ViewTable