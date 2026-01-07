import React from "react"
import { X } from 'lucide-react';
import { useState } from "react";
import axios from "axios";

export default function Modal({data ,onClose}) {

  const token = JSON.parse(localStorage.getItem("token"))

  const [transferMoney, setTransferMoney] = useState({
    to:`${data.id}`,
    amount: 0
  });

  function handleData(e) {
    setTransferMoney({
      ...transferMoney,
      amount: e.target.value
    })
  }

  // console.log(transferMoney)

  async function transfer() {
      axios.post("http://localhost:3000/api/v1/account/transfer", transferMoney,{
        headers: {
          'authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        alert(res.data.message)
        window.location.reload()
      })
      .catch(err => alert(err))
  }

  

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center">
      <div className="w-full h-full max-h-100 max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
        <button onClick={onClose} className="text-black place-self-end">
          <X />
        </button>
      <div className="font-bold text-3xl mb-10">
        Send Money
      </div>
      <div className="">
        {data.name}
      </div>
      <div>
        Amount (in Rs)
      </div>
      <input type="text" placeholder="Enter Amount" className="border border-gray-300 w-78 h-10 rounded-md pl-3" value={transferMoney.amount} onChange={handleData}/>
      
      <button onClick={transfer} className="border bg-green-600 w-78 h-10 rounded-md pl-3 text-white">
        Initiate Transfer
      </button> 
      </div>
    </div>
  )
}