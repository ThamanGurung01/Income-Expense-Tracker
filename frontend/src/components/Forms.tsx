import React from 'react'
import { BasicProps } from './components-types'

const post_url=import.meta.env.VITE_BACKEND_URL;
const Forms:React.FC<BasicProps> = ({value,method}) => {
  return (
    <form action={`${post_url+value}`} method={method}>
      <input type="number" name={`${value}_amount`} min={1} required/><br />

      <select name={`${value}_category`} id="" required>
      {value==="expense"?(<><option value="Tax">Tax</option>
        <option value="Rent">Rent</option></>):(<><option value="Salary">Salary</option>
          <option value="Parttime">Parttime</option></>)}
      </select><br />
      <textarea className='' name={`${value}_description`}></textarea><br />
      <input type="date" name={`${value}_date`} required/><br />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Forms