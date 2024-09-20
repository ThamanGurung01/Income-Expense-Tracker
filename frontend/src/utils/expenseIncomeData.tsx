
import { getService } from "../services/Api/getService";

export const expenseIncomeData = async(what:string) => {
  let Incomes=await getService("income");

  let Expenses=await getService("expense");
  console.log(Expenses.error);
if(!(Incomes.error)||!(Expenses.error)){
  if(Incomes.error){
    Incomes=[{}];
  }
  if(Expenses.error){
    Expenses=[{}];
  }
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
}else{
  return [];
}

}
