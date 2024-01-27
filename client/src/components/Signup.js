import React, { useState } from 'react'
import { useNavigate } from 'react-router';


const Signup = () => {
    let navigate=useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
   

    const submit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:9000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ name: name, email: email, password: password })
        })
        const json = await response.json()
        console.log(json)
        navigate('/')
    }


    return (
        <div>
            <form onSubmit={submit}>
                <h1 className='my-2' style={{textAlign:'center'}}>Sign Up</h1>
        
                <div className="my-2">
                    <label htmlFor="text" className="form-label">Username</label>
                    <input type="text" className="form-control" id="text" onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
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

export default Signup