
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
      <table>
    <thead>
<tr>
<th>Amount</th>
      <th>Category</th>
      <th>Date</th>
      <th>Action</th>
</tr>
    </thead>
    <tbody>
{viewData.map((el,i)=> <tr key={i}>
<td title={el[value+"_description"]}>{el[value+"_amount"]}</td>
<td title={el[value+"_description"]}>{el[value+"_category"]}</td>
<td title={el[value+"_description"]}>{el[value+"_date"]}</td>
<td><Link to={"/update/"+el["_id"]+"/"+value}>Update</Link> <button onClick={()=>handleDelete(el["_id"])}>Delete</button></td>
</tr>
 )}
    </tbody>
  </table>
    </div>
  )
}

export default ViewTable