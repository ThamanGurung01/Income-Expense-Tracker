
import Forms from '../components/Forms'

const Income = () => {
  return (
    <div className='sidebar-option income'>
      <span>Income</span>
      <Forms value={"income"} method={"POST"}/>
    </div>
  )
}

export default Income