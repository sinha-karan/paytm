import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"

function App() {

  return (
    <div>
        <Routes>
          <Route path="/signup" element = {<Signup></Signup>}></Route>
          <Route path="/signin" element = {<Signin></Signin>}></Route>
          <Route path="/dashboard" element = {<Dashboard></Dashboard>}></Route>
          {/* <Route path="/send" element = {<SendMoney></SendMoney>}></Route> */}
        </Routes>
    </div>
  )
}

export default App
