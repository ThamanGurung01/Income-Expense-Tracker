
import Forms from '../components/Forms'

const Expense = () => {
  return (
    <div className='sidebar-option'>
      <span>Expense</span>
      <Forms  value={"expense"} method={"POST"}/>
      </div>
  )
}

export default Expense