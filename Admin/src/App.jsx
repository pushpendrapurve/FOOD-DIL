import { useState,useEffect } from 'react'
import  Navbar  from './components/Navbar/Navbar.jsx'
import  SideBar  from './components/Sidebar/SideBar.jsx'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login/Login.jsx'

export const backendURL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [count, setCount] = useState(0)
   const Url = import.meta.env.VITE_BACKEND_URL;

     const [token,setToken] = useState(localStorage.getItem('tokenAdmin')?localStorage.getItem('tokenAdmin'):"");

  useEffect(()=>{
     localStorage.setItem('tokenAdmin',token)
  },[token])
  return (
    <>
     <ToastContainer/>
    {token == ""
    ?<Login setToken={setToken}/>
    : <div>
       
        <Navbar setToken={setToken}/>
        <hr />
        <div className="app-content"> 
          <SideBar/>
          <Routes>
            <Route path='/add' element={<Add Url={Url} token={token}/>}/>
            <Route path='/list' element={<List Url={Url} token={token}/>}/>
            <Route path='/orders' element={<Orders Url={Url} token={token}/>}/>
          </Routes>
        </div>
      </div>
    }
     
    </>
  )
}

export default App
