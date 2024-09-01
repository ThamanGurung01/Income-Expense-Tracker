import React, { useEffect, useState } from 'react'
import { expenseIncomeData } from '../utils/expenseIncomeData'

const Home = () => {
  const [AllData, setAllData] = useState<Array<{
    income_amount?: number,
    income_category?: string,
    income_description?: string,
    income_date?: string,

    expense_amount?: number,
    expense_category?: string,
    expense_description?: string,
    expense_date?: string,

  }>>([{}]);
  const [totalIncomes,setTotalIncomes]=useState<number>(0);
  const [totalExpenses,setTotalExpenses]=useState<number>(0);
  const [totalSaving,setTotalSaving]=useState<number>(0);
        
  const handleData = async () => {
    setAllData(await expenseIncomeData());
  }
  useEffect(() => {
    handleData();
    if(AllData.length!=0){
      AllData.map((el,i)=>{
        
      })
    }
  }, [])
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
      <div>
        totals
      </div>
    </div>
  )
}

export default Home