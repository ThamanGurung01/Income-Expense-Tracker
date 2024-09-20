import { useEffect, useState } from 'react'
import { expenseIncomeData } from '../utils/expenseIncomeData'
import LineGraph from '../components/LineGraph';

const Home = () => {
  const [AllData, setAllData] = useState<Array<any>>([]);
  const [Incomes, setIncomes] = useState([]);
  const [Expenses, setExpenses] = useState([]);
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
    console.log(AllData);
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
        <h1 className='text-2xl text-center font-bold mt-8 md:text-4xl text-white md:mt-10' >Dashboard</h1>
        <div className=' flex mt-4 flex-col text-gray-100 items-center md:text-xl lg:text-2xl md:mt-7 md:flex-row md:justify-center gap-x-10 md:gap-x-20'>
          <span><span className='font-semibold'> Incomes:</span> <span>{totalIncomes}</span></span>
          <span><span className='font-semibold'> Expenses:</span> <span>{totalExpenses}</span></span>
          <span><span className='font-semibold'> Savings:</span> <span>{totalSaving}</span></span>
        </div>
        <div className='flex-grow'>
          <LineGraph lineIncomes={Incomes} lineExpenses={Expenses} />
        </div>
        <div className='flex w-full flex-col items-center text-xl mt-10'>
          <h3 className='font-bold mb-2'>Recently Added</h3>
          <table className='table-auto tableStyle border-collapse border border-red-600'>
            <thead>
            <tr>
              <th className='tableElementBorder tableStyleRow'>Category</th>
              <th className='tableElementBorder tableStyleRow'>Amount</th>
              <th className='tableElementBorder tableStyleRow'>Date</th>
            </tr>
            </thead>
            <tbody>
            {
              AllData.length!==0?
              (AllData.map((el, i) => {
                return (
                  (i < 3) ? (
                    (el.income_category)?
                    (<tr key={i}>
                      <td className='tableElementBorder tableStyleRow'>{el.income_category ? el.income_category : el.expense_category}</td>
                      <td className='tableElementBorder tableStyleRow'>{el.income_amount ? el.income_amount : el.expense_amount}</td>
                      <td className='tableElementBorder tableStyleRow'>{el.income_date ? el.income_date : el.expense_date}</td>
                    </tr>):""
                    ):""
                );
              })):
            ( <tr><td className='tableElementBorder text-center' colSpan={4}>No data found</td></tr> )
            }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  )
}

export default Home