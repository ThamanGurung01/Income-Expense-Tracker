
import Forms from '../components/Forms'

const Income = () => {
  return (
    <div className='sidebar-option'>
      <span>Income</span>
      <Forms value={"income"} method={"POST"}/>
    </div>
  )
}

export default Income