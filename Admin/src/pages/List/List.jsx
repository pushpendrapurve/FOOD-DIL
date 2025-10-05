import React,{useState,useEffect} from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const List = ({Url,token}) => {

  const [list, setList] = useState([])
  const fetchData = async()=>{
  const response = await axios.get(`${Url}/api/food/list`);
  if(response.data.success){
    setList(response.data.data)
  }
  else{
    toast.error(response.data.message)
  }
  }

  const removeFood = async(foodId) =>{
   const response = await axios.post(`${Url}/api/food/remove`,{id:foodId},{headers:{token}});
   if(response.data.success){
    toast.success(response.data.message)
    await fetchData();
   }else{
    console.log(response.data.message)
    toast.error("error")
   }
  }
 
  useEffect(() => {
    fetchData();
  }, [])
  
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>(
          <div key={index} className="list-table-format">
            <img src={`${Url}/images/`+item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
