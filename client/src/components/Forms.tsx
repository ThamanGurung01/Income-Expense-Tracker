import React,{useState,useEffect} from 'react'
import { FormProps } from './components-types'
import { postService } from '../services/Api/postService';
import {getSpecificService} from "../services/Api/getSpecificService"
import { patchService } from '../services/Api/patchService';
import { useNavigate } from 'react-router-dom';
import { deleteService } from '../services/Api/deleteService';
import { Banknote, RefreshCcw, TrendingDown } from 'lucide-react';
const Forms:React.FC<FormProps> = ({value,method,id}) => {
  const navigate=useNavigate();
  const [amount,setAmount]=useState<Number>(1000);
  const [category,setCategory]=useState<string>(value==="expense"?"Rent":"Salary");
  const [descriptions,setDescriptions]=useState<string>("");
  const today = new Date().toISOString().split('T')[0];
  const [date,setDate]=useState<string>(today);
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
const handleDelete = async() => {
  const confirmed = window.confirm('Are you sure you want to delete this item?');
  if (confirmed) {
    try{
      await deleteService(value??"",id??"");
      navigate("/view");
    }catch(error){
      console.log("error");
    }
  } else {
  }
};
  return (
    <div className='w-full sm:w-4/5 md:w-3/4 lg:w-2/5 mx-auto flex flex-col text-lg gap-4 bg-white p-6 rounded-lg shadow-md mt-10' id="form">  
      <h1 className="flex items-center gap-4 text-2xl font-semibold text-gray-800">
      <div className={`p-2 rounded-full ${(value === "income"&&method==="POST") ? 'bg-green-100 text-green-700' :value==="expense"? 'bg-red-100 text-red-700':'bg-red-100 text-yellow-700'}`}>
        {(value === "income"&&method==="POST") ? <Banknote className="w-6 h-6" /> :value==="expense"? <TrendingDown className="w-6 h-6" />:<RefreshCcw/>}
      </div>
      <span>{(value === "income"&&method==="POST") ? 'Add Incomes' :value==="expense"? 'Add Expenses':'Update Transactions'}</span>
       </h1>
      {message.error?(<span className='text-red-600 font-semibold'>{message.error.toUpperCase()}!</span>):""}
      {message.msg?(<span className='text-green-600 font-semibold'>{message.msg.toUpperCase()}</span>):""}
      <input type="number" name={`${value}_amount`} min={1} onChange={handleAmount} value={amount?.toString()} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/><br />
      <select name={`${value}_category`} value={category} onChange={handleCategory} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
      {value==="expense"?(<>
      <option value="Rent">Rent</option>
      <option value="Utilities">Utilities</option>
      <option value="Dining Out">Dining Out</option>
      <option value="Transportation">Transportation</option>
      <option value="Insurance">Insurance</option>
      <option value="Loan Payments">Loan Payments</option>
      <option value="Subscriptions">Subscriptions</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Travel">Travel</option>
      <option value="Personal Care">Personal Care</option>
      <option value="Clothing">Clothing</option>
      <option value="Tax">Tax</option>
        </>):(<>
        <option value="Salary">Salary</option>
        <option value="Parttime">PartTime</option>
        <option value="Freelance">Freelance</option>
        <option value="Interest">Interest</option>
        <option value="Dividends">Dividends</option>
        <option value="Rental Income">Rental Income</option>
        <option value="Gifts">Gifts</option>
        <option value="Investment Income">Investment Income</option>
        <option value="Refunds/Reimbursements">Refunds/Reimbursements</option>
        <option value="Grants">Grants</option>
        <option value="Royalties">Royalties</option>
        <option value="Miscellaneous Income">Miscellaneous Income</option>
          </>
          )}
      </select><br />
      <textarea placeholder='Description' name={`${value}_description`} onChange={handleDescription} value={descriptions} className="px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea><br />
      <input type="date" name={`${value}_date`}
      onChange={handleDate} value={date} required className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
      
      <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 mt-6 rounded-md transition-all duration-200 ease-in-out" type='submit'>{method=="PATCH"?"Update":"Submit"}</button>
      {method=="PATCH"?<button className='bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 mt-2 rounded-md transition-all duration-200 ease-in-out' onClick={handleDelete}>Delete</button>:""} 
   
    </div>
  )
}

export default Forms
