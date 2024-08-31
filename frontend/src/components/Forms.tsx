import React from 'react'

const Forms = () => {
  return (
    <form action="" method=''>
      <input type="number" min={1} required/><br />

      <select name="" id="" required>
        <option value="Tax">Tax</option>
        <option value="Rent">Rent</option>

      </select><br />
      <textarea className='' name="" id="" required></textarea><br />
      <input type="date" required/><br />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Forms