import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate =  useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const token = await loginUser({username,password})
            console.log(token)

            localStorage.setItem("token",token)

            navigate("/chat")
        }
        catch(error){
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
                Login to continue
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
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
                type="password"
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
                Login
                </button>

            </form>

        </div>

    </div>
    )
}

export default Login