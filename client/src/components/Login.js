import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login =  () => {
  let navigate=useNavigate()
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const submit = async(e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:9000/login', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
    const json = await response.json()
    console.log(json)
    navigate('/')
  
  }

  



  return (
    <div>
      <form onSubmit={submit}>
        <h1 className='my-2' style={{ textAlign: 'center' }}>Login</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit' className='btn btn-primary'>submit</button>

      </form>

    </div>
  )
}

export default Login