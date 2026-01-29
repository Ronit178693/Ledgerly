import React from "react"
import { Routes, Route} from "react-router-dom";
import Signup from "./Pages/Landing/auth/Signup/Signup.jsx";
import Login from "./Pages/Landing/auth/Login/Login.jsx";
import Income from "./Pages/Income/Income.jsx";
import Expenses from "./Pages/Expenses/Expenses.jsx";
import Landing  from "./Pages/Landing/Landing.jsx";
import DashboardComponents from "./Pages/Home/DashboardComponents.jsx";
import FeatureComponents from "./Pages/Home/FeatureComponents.jsx";


function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<DashboardComponents/>}>
          <Route index element={<FeatureComponents/>}/>
          <Route path='income' element = {<Income/>}/>
          <Route path='expense' element = {<Expenses/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App










