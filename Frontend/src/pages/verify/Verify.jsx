import React, { useContext,useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext';
import './Verify.css'
import axios from 'axios'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext)
    const naviagate = useNavigate();

    const verifyPayment = async (req,res)=>{
     const response = await axios.post(url+"/api/order/verify",{success,orderId})
     if(response.data.success){
        naviagate("/myorders");
     }else{
        naviagate("/");
     }
    }

    useEffect(() => {
    verifyPayment();
    }, [])
    

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
