import { useEffect, useState } from 'react'
import { expenseIncomeData } from '../utils/expenseIncomeData'
import LineGraph from '../components/LineGraph';
import {LayoutDashboard } from "lucide-react";
const Home = () => {
  const [AllData, setAllData] = useState<Array<any>>([]);
  const [Incomes, setIncomes] = useState([]);
  const [Expenses, setExpenses] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);
  const handleData = async () => {
    const data=await expenseIncomeData("all");
    console.log(data);
    setAllData(data);
    setIncomes(await expenseIncomeData("income"));
    setExpenses(await expenseIncomeData("expense"));
  }
  useEffect(() => {
    handleData();
  }, []);

useEffect(() => {
  let incomes = 0;
  let expenses = 0;
  let savings = 0;

  AllData.forEach(el => {
    if (el.expense_amount > 0) {
      expenses += Number(el.expense_amount);
      savings -= Number(el.expense_amount);
    } else if (el.income_amount > 0) {
      incomes += Number(el.income_amount);
      savings += Number(el.income_amount);
    }
  });

  setTotalIncomes(incomes);
  setTotalExpenses(expenses);
  setTotalSaving(savings);
}, [AllData]);
  return (
    <div className='sidebar-option'>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-center font-bold mt-8 md:text-4xl md:mt-14 flex items-center justify-center gap-5'><LayoutDashboard/><span>Dashboard</span></h1>
        <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6 mt-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200">
            <span className="text-sm font-medium text-green-700 mb-1">Incomes</span>
            <span className="text-xl md:text-2xl font-bold text-green-800">${totalIncomes}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-200">
            <span className="text-sm font-medium text-red-700 mb-1">Expenses</span>
            <span className="text-xl md:text-2xl font-bold text-red-800">${totalExpenses}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm font-medium text-blue-700 mb-1">Savings</span>
            <span className="text-xl md:text-2xl font-bold text-blue-800">${totalSaving}</span>
          </div>
        </div>
        </div>
        <div className='flex-grow'>
          <LineGraph key={Incomes.length + Expenses.length} lineIncomes={Incomes} lineExpenses={Expenses} />
        </div>
 <div className="bg-white mx-auto rounded-xl shadow-sm border border-gray-200 overflow-hidden md:w-1/2 mt-10">
 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
   <h3 className="text-lg font-semibold text-gray-800 text-center">Recent Transactions</h3>
 </div>
  <div className="max-h-[9.2rem] overflow-y-auto overflow-x-auto">
   <table className="min-w-full">
    <thead className="sticky top-0 bg-white z-10">
      <tr className="bg-gray-50 border-b border-gray-200">
         <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase tracking-wider">Category</th>
         <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase tracking-wider">Amount</th>
         <th className="px-6 py-3 text-left text-sm font-medium text-gray-100 uppercase tracking-wider">Date</th>
       </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
       {
         AllData.length !== 0 ? (
           AllData.map((el, i) => {
             return (
                   <tr key={i} className="bg-gray-50 transition-colors duration-200">
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                       <div className="flex items-center">
                         <div className={`w-2 h-2 rounded-full mr-3 ${el.income_category ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         {el.income_category ? el.income_category : el.expense_category}
                       </div>
                     </td>
                     <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${el.income_category ? 'text-green-600' : 'text-red-600'}`}>
                       {el.income_category ? '+' : '-'}{el.income_amount ? el.income_amount : el.expense_amount}
                     </td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                       {el.income_date ? el.income_date : el.expense_date}
                     </td>
                   </tr>
             );
           })
         ) : (
           <tr>
             <td className="px-6 py-8 text-center text-gray-500" colSpan={3}>
               <div className="flex flex-col items-center">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                   <span className="text-gray-400 text-xl">📊</span>
                 </div>
                 <span className="text-sm">No transactions found</span>
               </div>
             </td>
           </tr>
         )
       }
     </tbody>
   </table>
 </div>
</div>

      </div>
    </div>
  )
}

export default Home