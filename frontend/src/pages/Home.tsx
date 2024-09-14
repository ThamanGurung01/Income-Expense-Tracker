import { useEffect, useState } from 'react'
import { expenseIncomeData } from '../utils/expenseIncomeData'
import LineGraph from '../components/LineGraph';

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
    income_amount: 0,
    expense_amount: 0,
  }]);
  const [Incomes, setIncomes] = useState([{
    income_amount: 0,
    income_category: "",
    income_description: "",
    income_date: "",
  }]);
  const [Expenses, setExpenses] = useState([{
    expense_amount: 0,
    expense_category: "",
    expense_description: "",
    expense_date: "",
  }]);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);
  const handleData = async () => {
    setAllData(await expenseIncomeData("all"));
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
      setTotalIncomes(incomes);
      setTotalExpenses(expenses);
      setTotalSaving(savings);
    })
  }, [AllData]);
  return (
    <div className='sidebar-option'>
      <div className='flex flex-col'>
      <div className=' flex mt-7 flex-col items-center md:text-xl lg:text-2xl md:mt-10 md:flex-row md:justify-center gap-x-10'>
            <span><span className='font-semibold'> Incomes:</span> <span>{totalIncomes}</span></span>
            <span><span className='font-semibold'> Expenses:</span> <span>{totalExpenses}</span></span>
            <span><span className='font-semibold'> Savings:</span> <span>{totalSaving}</span></span>
          </div>
        <div className='flex-grow'>
          <LineGraph lineIncomes={Incomes} lineExpenses={Expenses} />
        </div>
        <div className='flex flex-col items-center text-xl mt-10'>
          <h3 className='font-bold mb-2'>Recently Added</h3>
          {AllData.map((el, i) =>{

            return (i<4)?(<div key={i}>{(i==0)?( 
            <div className='flex text-lg gap-x-2 w-56 sm:w-72 sm:py-3 sm:gap-x-4 sm:text-xl justify-between font-bold'>
              <span>Category</span>
            <span>Amount</span>
            <span>Date</span>
            </div> ):""}
            <div className='flex text-lg gap-x-2 w-56 sm:w-72 sm:py-3 sm:gap-x-4 sm:text-xl justify-between'>
              <span>{el.income_category ? el.income_category : el.expense_category}</span>
              <span>{el.income_amount ? el.income_amount : el.expense_amount}</span>
              <span>{el.income_date ? el.income_date : el.expense_date}</span>
            </div>
            </div>):"";
          } )}
        </div>
        
      </div>
    </div>
  )
}

export default Home