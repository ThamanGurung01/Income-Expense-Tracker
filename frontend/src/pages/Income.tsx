
import Forms from '../components/Forms'

const Income = () => {
  return (
    <div className='sidebar-option incomeExpense'>
      <span className='text-4xl text-white font-bold mb-5'>Income</span>
      <Forms value={"income"} method={"POST"}/>
    </div>
  )
}

export default Income