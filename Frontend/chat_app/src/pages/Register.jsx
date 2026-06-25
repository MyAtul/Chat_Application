import React, { useState } from 'react'
import { registerUser } from '../services/userService'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate =  useNavigate()

    const handleRegister = async (e)=>{
        e.preventDefault()

        try{
            await registerUser({username,password})
            navigate("/login")
        }catch(error){
            console.log(error)
        }
    }

  return (
     <div className="min-h-screen flex items-center justify-center bg-black px-4">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 text-black">

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">
                Chat Application
                </h1>

                <p className="text-gray-500 mt-2">
                Register
                </p>
            </div>

            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-4"
            >

                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(elem) =>
                    setUsername(elem.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(elem) =>
                    setPassword(elem.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                Register
                </button>

            </form>

            <div className='flex gap-2 justify-center items-center'>
                Already Register ?
                <Link to='/login'
                    className='text-blue-500'
                >
                Login
                </Link>
            </div>

        </div>

    </div>
  )
}

export default Register