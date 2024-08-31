
import React, { useState,useEffect } from 'react'
import { getService } from '../services/Api/getService';
import { viewTableProps } from './components-types';
import { capitalizeFirstLetter } from '../utils/stringUtils';
const ViewTable:React.FC<viewTableProps> = ({value}) => {
  const [viewData,setViewData]=useState<Array<{[key:string]:string}>>([]);
  const capitalizedValue=capitalizeFirstLetter(value);
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
</tr>
    </thead>
    <tbody>
{viewData.map((el,i)=> <tr title={el[value+"_description"]} key={i}>
<td>{el[value+"_amount"]}</td>
<td>{el[value+"_category"]}</td>
<td>{el[value+"_date"]}</td>
</tr>
 )}
    </tbody>
  </table>
    </div>
  )
}

export default ViewTable