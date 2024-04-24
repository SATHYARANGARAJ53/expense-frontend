import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header'
import UserList from './components/Userlist';
import {v4 as uuidv4} from 'uuid'; 
import Cards from './Cards';
import Table from './Table';
import axios from 'axios'


function App() {
  // const [expenses, setExpenses] = useState([
  //   {id:uuidv4(),date: "2024-03-17"  ,category:"Income",amount:500},
  //   {id:uuidv4(),date: "2023-06-19" ,category:"Rent",amount:2500},
  //   {id:uuidv4(),date: "2021-03-17"  ,category:"Rent",amount:5000},
  //   {id:uuidv4(),date: "2022-06-05" ,category:"Income",amount:250}
  // ]);

  //axios 

  const [expense,setexpenses] =useState(null);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response =await axios.get("https://expense-backend-50gb.onrender.com/api")
        setexpenses(response.data)
      }
      catch(error){
        console.error(error)
      }
     
    }
    fetchdata()
  },[])
  console.log(expense);


//cards
  // const [category, setCategory] = useState([]);
  // expense && expense?.map((item)=>{
  //   category.includes(item.category)?" " : category.push(item.category)
    
  // })
  // console.log(category)

  
  return (
    <>
     <Header/>
     {/* <Cards category={category} setCategory={setCategory}/> */}
     <UserList expenses={expense} setExpenses={setexpenses}/>
     
    </>
  )
}

export default App;


/*
const[content,setContent]=useState("Start")
  const handleChange=()=>{
    setContent(content==="Start"?"Stop":"Start");
  }
<button 
     onClick={()=> handleChange()}
     className={content==="Start"?"success":"failure"}>
      {content}</button>*/