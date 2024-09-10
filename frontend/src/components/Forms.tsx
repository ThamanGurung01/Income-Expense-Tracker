import React,{useState,useEffect} from 'react'
import { FormProps } from './components-types'
import { postService } from '../services/Api/postService';
import {getSpecificService} from "../services/Api/getSpecificService"
import { patchService } from '../services/Api/patchService';
import { useNavigate } from 'react-router-dom';
const Forms:React.FC<FormProps> = ({value,method,id}) => {
  const navigate=useNavigate();
  const [amount,setAmount]=useState<Number>(1000);
  const [category,setCategory]=useState<string>(value==="expense"?"Tax":"Salary");
  const [descriptions,setDescriptions]=useState<string>("");
  const [date,setDate]=useState<string>("");
  const [message,setMessage]=useState<{msg:string,error:string}>({msg:"",
    error:"",
  });
  async function getRequest(id:string,value:string){
    try{
      const data= await getSpecificService(value,id);
      setAmount(data[value+"_amount"]);
      setCategory(data[value+"_category"]);
      setDescriptions(data[value+"_description"]);
      setDate(data[value+"_date"]);
    }catch(error){
      console.log("error");
    }
  } 
  useEffect(()=>{
    if(id){
      getRequest(id,value?value:"");
    }
  },[id]);

  const handleAmount=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setAmount(Number(e.target.value));

  }
  const handleCategory=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    if(e.target.value!=""){
      setCategory(e.target.value);
    }
  }
  const handleDescription=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
      setDescriptions(e.target.value);
  }
  const handleDate=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setDate(e.target.value);
  }


  const handleResponse=(SubmitResponse:{msg?:string,
    error?:string,
    tokenError?:string,
  })=>{
    if(SubmitResponse.tokenError) return navigate("/login");
    if(!SubmitResponse.error){
      const resMsg=SubmitResponse.msg;
      setMessage((c)=>({...c,error:"",msg:resMsg?resMsg:""}));
      if(method==="POST"){
        setAmount(1000);
        setCategory("Salary");
        setDescriptions("");
        setDate("");
      }
      setTimeout(()=>{
        setMessage({msg:"",
          error:"",
        });
      },2000);
    }else{
      const errorMsg=SubmitResponse.error;
      setMessage((c)=>({...c,error:errorMsg?errorMsg:"",msg:""}));
    }
  }

  const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
  e.preventDefault();
  if(Number(amount)>=100&&category&&date){
    if(method==="POST"){
      switch (value){
        case "income":{
          const SubmitResponse =await postService({
            income_amount:amount,
            income_category:category,
            income_description:descriptions,
            income_date:date,
          },value);
          handleResponse(SubmitResponse);
          break;
        }
        case "expense":{
         const  SubmitResponse=await postService({
            expense_amount:amount,
            expense_category:category,
            expense_description:descriptions,
            expense_date:date,
          },value);
          handleResponse(SubmitResponse);
          break;
        }
        default:{
          console.log("form error");
          break;
        }
      }
    }else if(method==="PATCH"){
      switch (value){
        case "income":{
          const SubmitResponse =await patchService({
            income_amount:amount,
            income_category:category,
            income_description:descriptions,
            income_date:date,
          },value,id);
          handleResponse(SubmitResponse);
          break;
        }
        case "expense":{
         const  SubmitResponse=await patchService({
            expense_amount:amount,
            expense_category:category,
            expense_description:descriptions,
            expense_date:date,
          },value,id);
          handleResponse(SubmitResponse);
          break;
        }
        default:{
          console.log("form error");
          break;
        }
      }
    }

  }else{
    setMessage((c)=>({...c,error:Number(amount)>=100?"Input all fields":"amount must be greater than 100"}));
  }
}
  return (
    <div className='w-64 flex flex-col' id="form">
      <span className='text-red-500'>{message.error}</span>
      <input type="number" name={`${value}_amount`} min={1} max={10000000} onChange={handleAmount} value={amount?.toString()} required/><br />
      <select name={`${value}_category`} value={category} onChange={handleCategory} required>
      {value==="expense"?(<><option value="Tax">Tax</option>
        <option value="Rent">Rent</option></>):(<><option value="Salary">Salary</option>
          <option value="Parttime">Parttime</option></>)}
      </select><br />
      <textarea className='' name={`${value}_description`} onChange={handleDescription} value={descriptions}></textarea><br />
      <input type="date" name={`${value}_date`}
      onChange={handleDate} value={date} required/><br />
      <button onClick={handleSubmit} type='submit'>Submit</button>
      <span className='text-green-500'>{message.msg}</span>
    </div>
  )
}

export default Forms