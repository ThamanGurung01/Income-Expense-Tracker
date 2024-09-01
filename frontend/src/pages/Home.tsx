import React, { useEffect, useState } from 'react'
import { expenseIncomeData } from '../utils/expenseIncomeData'

const Home = () => {
  const [AllData, setAllData] = useState<Array<{
    income_amount: number,
    income_category?: string,
    income_description?: string,
    income_date?: string,

    expense_amount: number,
    expense_category?: string,
    expense_description?: string,
    expense_date?: string,

  }>>([{
    income_amount:0,
    expense_amount:0,
  }]);
  const [totalIncomes,setTotalIncomes]=useState<number>(0);
  const [totalExpenses,setTotalExpenses]=useState<number>(0);
  const [totalSaving,setTotalSaving]=useState<number>(0);
        
  const handleData = async () => {
    setAllData(await expenseIncomeData());
  }
  useEffect(() => {
    handleData();
  }, []);

  useEffect(()=>{
    let incomes=0;
    let expenses=0;
    let savings=0;

    AllData.forEach(el=>{
      if(el.expense_amount>0){
        expenses+=Number(el.expense_amount);
        savings-=Number(el.expense_amount);
      }else if(el.income_amount>0){
        incomes+=Number(el.income_amount);
        savings+=Number(el.income_amount);
      }
      setTotalIncomes(incomes);
      setTotalExpenses(expenses);
      setTotalSaving(savings);
    })
  },[AllData]);
  return (
    <div className='sidebar-option'>
      <span>Home</span>
      <div className='flex justify-around'>
        <div>
          chart
        </div>
        <div>
          {AllData.map((el, i) => <div className='flex gap-x-4' key={i}>
            <span>{el.income_amount ? el.income_amount : el.expense_amount}</span>
            <span>{el.income_category ? el.income_category : el.expense_category}</span>
            {/* <span>{el.income_description ? el.income_description : el.expense_description}</span> */}
            <span>{el.income_date ? el.income_date : el.expense_date}</span>
            </div>)}
        </div>
      </div>
      <br />
      <div>
        <span>totals</span><br />
        <span>totalIncomes:{totalIncomes}</span><br />
        <span>totalExpenses:{totalExpenses}</span><br />
        <span>totalSaving:{totalSaving}</span><br />
      </div>
    </div>
  )
}

export default Home