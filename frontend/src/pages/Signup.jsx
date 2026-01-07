import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'


export function Signup() {

  const [data, setData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: ""
  })  

  const navigate = useNavigate();

  function handleChange(e) {
      setData({
      ...data,
      [e.target.name]: e.target.value})  
  }

  async function signup() {
    await axios.post("http://localhost:3000/api/v1/user/signup", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data.message) 
        localStorage.setItem("token", JSON.stringify(res.data.token))
        navigate("/dashboard") 
      })
      .catch(err => console.log(err))
  }

  // console.log(data)

  return <div className="bg-[#7f7f7f] min-h-screen flex justify-center">

    <div className="bg-white h-150 w-90 rounded-md m-15">

      <div>
        <div className="flex justify-center text-3xl font-bold mt-5">
          Sign Up
        </div>
        <div className="flex justify-center text-center pl-5 pr-5 mb-5 text-[#7f7f7f] font-semibold text-lg">
          Enter your information to create an account
        </div>
      
        <div className="pl-6 pr-5">
          <div className="font-semibold mb-2">
            First Name
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md pl-3" placeholder="John" name="firstName"
          value = {data.firstName} onChange={handleChange}
          />

          <div className="font-semibold mt-5 mb-2">
            Last Name
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md pl-3" placeholder="Doe" name="lastName"
          value={data.lastName} onChange={handleChange}
          />

          <div className="font-semibold mt-5 mb-2">
            Email
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md pl-3" placeholder="johndoe@gmail.com" name="username" value={data.username} onChange={handleChange}
          
          />

          <div className="font-semibold mt-5 mb-2">
            Password
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md" name="password" value={data.password} onChange={handleChange}/>

          <button className="bg-black text-white w-78 h-10 rounded-md mt-5 mb-3" onClick={signup}>Sign Up</button>

          <div className="flex justify-center font-medium">
            Already have an account? <Link to={"/signin"}>Login</Link>
          </div>


        </div>
      </div>

      

    </div>

  </div>
}