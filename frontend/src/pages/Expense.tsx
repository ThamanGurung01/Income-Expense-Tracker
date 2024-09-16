
import Forms from '../components/Forms'

const Expense = () => {
  return (
    <div className='sidebar-option incomeExpense'>
      <span className='text-4xl font-bold mb-5'>Expense</span>
      <Forms  value={"expense"} method={"POST"}/>
      </div>
  )
}

export default Expense