
import { useParams } from 'react-router-dom';
import Forms from '../components/Forms';
const UpdatePage = () => {
  const param=useParams();
  return (
    <div className='sidebar-option update'>
        <span className='text-4xl font-bold mb-5'>Update Form</span>
        <Forms value={param.value} id={param.id} method="PATCH"/>
    </div>
  )
}

export default UpdatePage