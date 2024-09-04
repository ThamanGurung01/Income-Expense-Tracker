import React from 'react'
import ViewTable from '../components/viewTable'

const View:React.FC = () => {


  return (
    <div className='sidebar-option'>
      <span>View</span>
      <div>
        <ViewTable value="income"/>
      </div>
      <div>
      <ViewTable value="expense"/>
        
      </div>
    </div>
  )
}

export default View