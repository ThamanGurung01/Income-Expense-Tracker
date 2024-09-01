import { getService } from "../services/Api/getService";

export const expenseIncomeData = async(what:string) => {
  const Incomes=await getService("income");

  const Expenses=await getService("expense");
  const allData=[...Incomes,...Expenses].sort((a,b)=>{
    return (new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
  });
  if(what==="income"){
    return Incomes;
  }else if(what==="expense"){
    return Expenses;
  }else{
    return allData;
  }
}
