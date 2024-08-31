import React from 'react'

const Forms = () => {
  return (
    <form action="" method=''>
      <input type="number" min={1} /><br />

      <select name="" id="">
        <option value="Tax">Tax</option>
        <option value="Rent">Rent</option>

      </select><br />
      <textarea className='' name="" id=""></textarea><br />
      <input type="date"/><br />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Forms