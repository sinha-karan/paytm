import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'


export function Signin() {

  const navigate = useNavigate()

  const [signInData , setSignInData] = useState({
    username: "",
    password: ""
  })

  function handleChange(e) {
    setSignInData({
      ...signInData,
      [e.target.name] : e.target.value})
  }

  async function signin() {
    await axios.post("http://localhost:3000/api/v1/user/signin", signInData,{
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        alert(res.data.message)
        localStorage.setItem("token", JSON.stringify(res.data.token))
        navigate("/dashboard")
      })
      .catch(err => alert(err.response.data.message))
  }

  return <div className="bg-[#7f7f7f] min-h-screen flex justify-center">

    <div className="bg-white h-110 w-90 rounded-md m-15">

      <div>
        <div className="flex justify-center text-3xl font-bold mt-5">
          Sign In
        </div>
        <div className="flex justify-center text-center pl-5 pr-5 mb-5 text-[#7f7f7f] font-semibold text-lg">
          Enter your credentials to access your account
        </div>
      
        <div className="pl-6 pr-5">

          <div className="font-semibold mt-5 mb-2">
            Email
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md pl-3" placeholder="johndoe@example.com" name="username" value={signInData.username} onChange={handleChange}/>

          <div className="font-semibold mt-5 mb-2">
            Password
          </div>
          <input type="text" className="border border-gray-300 w-78 h-10 rounded-md" name="password" value={signInData.password} onChange={handleChange}/>

          <button className="bg-black text-white w-78 h-10 rounded-md mt-5 mb-3" onClick={signin}>Sign In</button>

          <div className="flex justify-center font-medium">
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </div>

        </div>
      </div>

      

    </div>

  </div>
}