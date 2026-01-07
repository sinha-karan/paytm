import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

export function Dashboard() {

  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"))

  const [allUser, setAllUser] = useState([]);
  const [filterUser, setFilterUser] = useState("")
  const [userAmount, setUserAmount] = useState();
  const [showModal, setShowModal] = useState(false)
  const [sendData, setSendData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filterUser}`,{
        headers: {
          'authorization': `Bearer ${token}`
        }
    })
      .then(res => {
        // console.log(res.data.users)
        setAllUser(res.data.users)
      })
      .catch(err => console.log(err))
  },[filterUser])

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/account/balance",{
      headers: {
        'authorization': `Bearer ${token}`
      }
    }).then(res => {
        // console.log(res.data.balance)
        setUserAmount(res.data.balance)
      })
      .catch(err => console.log(err))
  }, [])

  return (
  <div className="ml-5 mr-5 h-screen">
    <div className="flex justify-between text-center pt-5">
      <div className="font-bold text-2xl">
        Payments App
      </div>
      <div className="font-semibold text-lg">
        Hello, User
        <button className="bg-gray-600 hover:bg-black ml-3 rounded text-lg p-2 text-white cursor-pointer" onClick={() => {
          localStorage.removeItem('token')
          navigate("/signin")
        }}>
          LOGOUT
        </button>
      </div>
    </div>

    <hr className="h-px my-5 bg-neutral-quaternary border-0 bg-gray-300"></hr>

    <div className="font-bold text-xl">
      Your Balance Rs.{userAmount}
    </div>

    <div className="font-bold text-xl mt-5 mb-3">
      Users
    </div>
    <input type="text" className="border border-gray-300 w-full h-10 rounded-md pl-3" placeholder="Search users..." value={filterUser} onChange={e => setFilterUser(e.target.value)}/>

    {allUser.map((user) => {
      return <div className="flex justify-between items-center">
          <div className="flex items-center my-3">
            <div className="rounded-full w-8 h-8 bg-gray-400 flex items-center justify-center text-xl">
              {user.firstName[0]}
            </div>
            <div className="pr-2 pl-2 font-semibold text-lg">
              {user.firstName}
            </div>
            <div className="font-semibold text-lg"> 
              {user.lastName}
            </div>
          </div>
          <div>
            <button onClick={() => { setSendData({
             id: user._id,
             name: user.firstName
            })
              setShowModal(true)}} type="button" className="bg-black hover:bg-gray-600 text-white font-semibold text-sm py-2 px-4 rounded cursor-pointer">Send Money</button>
          </div>
        </div>
    })}   
    {showModal && <Modal data={sendData} onClose = {() => {setShowModal(false)}}></Modal>}
  </div>
  )
}