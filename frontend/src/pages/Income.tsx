
import Forms from '../components/Forms'

const Income = () => {
  return (
    <div className='sidebar-option income'>
      <span className='text-4xl font-bold mb-5'>Income</span>
      <Forms value={"income"} method={"POST"}/>
    </div>
  )
}

export default Income