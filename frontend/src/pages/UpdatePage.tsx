
import { useParams } from 'react-router-dom';
import Forms from '../components/Forms';
const UpdatePage = () => {
  const param=useParams();
  return (
    <div className='flex flex-col'>
        <div>UpdatePage</div>
        <Forms value={param.value} id={param.id} method="PATCH"/>
    </div>
  )
}

export default UpdatePage