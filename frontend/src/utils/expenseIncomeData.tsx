import { getService } from "../services/Api/getService";

export const expenseIncomeData = async() => {
  const Incomes=await getService("income");
  const Expenses=await getService("expense");
  const allData=[...Incomes,...Expenses].sort((a,b)=>{
    return (new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
  });
  return allData;
}
