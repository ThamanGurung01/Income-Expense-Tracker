
import Forms from '../components/Forms'

const Expense = () => {
  return (
    <div className='sidebar-option'>
      <Forms value={"expense"} method={"POST"}/>
      </div>
  )
}

export default Expense