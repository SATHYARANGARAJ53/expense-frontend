import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Table from '../Table';
import axios from 'axios'
// import { Link } from 'react-router-dom';

const UserList = (props) => {    //{expenses,setExpenses}

    //use state
    const { expenses, setExpenses } = props;
    
     const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState();
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState()

    // const handleDate = (e) => {
    //     setDate(e.target.value);   // element that triggered the event.
    // };


    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };

    //sum
    let sum = 0;
    expenses && expenses?.map((exp) => {    // map checker
        sum += parseInt(exp.amount);
    });


    //create new expense

    const handleAddExpense = async(e) => {
        e.preventDefault();
        if (!isEdit) {                                    // add
            /*const newexpense = {
                id:uuidv4(),
                date: new Date().toISOString().slice(0, 10),  //date:`${new Date().getDate()}/${new Date().getMonth()+1/${new Date().getFullYear()}}`
                category: category,
                amount: parseInt(amount)
            };
            setExpenses([...expenses, newexpense]);  //spread operator*/
            toast.success("New User Added Successfully")
            //toast.failure("New User not Added Successfully")
            // setDate("");
            const response=await axios.post('https://expense-backend-50gb.onrender.com/api',{
                category:category,
                amount:amount
            })
            setExpenses([...expenses, response.data]); 
            setCategory("");
            setAmount("");
        }
        else {                                         //update
            const response=await axios.put(`https://expense-backend-50gb.onrender.com/api/${Editid}`,{category,amount })
            console.log({response})
            const updateArray = expenses.map((item) => {
                return item._id === Editid ? { ...item,date, category, amount:parseInt(amount) } : item  // ...item,date,
            })
            setExpenses(updateArray)
            toast.info("New User Updated Successfully")
            setisEdit(false)
            setEditid("")
            setDate("");
            setCategory("");
            setAmount("");
        }
    };

    
    //delete
    const handleDelete = async(id) => {
        const response=await axios.delete(`https://expense-backend-50gb.onrender.com/api/${id}`)
        const deletedArray = expenses&&expenses?.filter((user) => user._id != id)
        setExpenses(deletedArray)
    }
 

     //update
     const handleUpdate = (user) => {
        setEditid(user._id)
        setisEdit(true)
        setDate(user.date)
        setCategory(user.category)
        setAmount(user.amount)
    }




    //display
    return (
        
        <div style={{ display: 'flex' }}>
        {/* //  <Link to="/about">Link</Link>
        //  <a href="/about">atag</a> */}
            <div style={{ flex: 50, padding: "50px" }}>
                <form onSubmit={(e) => handleAddExpense(e)}>
                    <h3> Enter your Expenses Here...</h3><br></br>
                {/* //  <input type="text" placeholder="Date" value={date} onChange={handleDate} style={{ border: "2px solid black" }} /><br></br><br></br>
                //  <input type="text" placeholder="Category" value={categotry} onChange={handleCategory} style={{ border: "2px solid black" }} /><br></br><br></br> */}
                    <select value={category} onChange={handleCategory} style={{ border: "2px solid black" }}>
                        <option>Select the Category</option>
                        <option >Income</option>
                        <option >Loan</option>
                        <option >Rent</option>
                        <option >Shopping</option>
                        <option >Grocery</option>
                        <option >Outing</option>
                        <option >Movie</option>
                        <option >Petrol</option>
                    </select><br></br> <br></br>
                    <input type="number" placeholder="Amount" value={amount} onChange={handleAmount} style={{ border: "2px solid black" }} required /><br></br><br></br>
                    <button type="submit">{isEdit ? "UPDATE" : "ADD"}</button>
                </form>
            </div>
            <div style={{ flex: 50, padding: "50px" }}>
                <h3> List of Expenses..</h3>

                <table className="table" style={{ border: "2px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "2px solid black" }}>Date</th>
                            <th style={{ border: "2px solid black" }}>Category</th>
                            <th style={{ border: "2px solid black" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses && expenses?.map((user) => (
                            <tr style={{ border: "2px solid black" }}>
                                <td style={{ border: "2px solid black" }}>{user.date}</td>
                                <td style={{ border: "2px solid black" }}>{user.category}</td>
                                <td style={{ border: "2px solid black" }}>{user.amount}</td>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                                <button onClick={() => handleUpdate(user)}>Update</button>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ border: "2px solid black" }}>Total</td>
                            <td style={{ border: "2px solid black" }}>Rs.{sum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            </div>

    );
};

export default UserList;




/*
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
// import { Link } from 'react-router-dom';

const UserList = (props) => {    //{expenses,setExpenses}

    //use state
    const { expenses, setExpenses } = props;
    // const [date, setDate] = useState();
    const [category, setCategory] = useState();
    const [amount, setAmount] = useState();
    const [isEdit, setisEdit] = useState(false)
    const [Editid, setEditid] = useState()

    // const handleDate = (e) => {
    //     setDate(e.target.value);   // element that triggered the event.
    // };

    //delete
    const handleDelete = (index) => {
        let deletedArray = expenses.filter((user, i) => index != i)
        setExpenses(deletedArray)
    }

    //update
    const handleUpdate = (user) => {
        setEditid(user.id)
        setisEdit(true)
        // setDate(user.date)
        setCategory(user.category)
        setAmount(user.amount)
    }

    //sum
    let sum = 0;
    expenses.map((exp) => {
        sum += parseInt(exp.amount)
    })


    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.value);
    };


    //create
    const handleAddExpense = (e) => {
        e.preventDefault();
        if (!isEdit) {
            const newexpense = {
                id: uuidv4(),
                date: new Date().toISOString().slice(0, 10),  //date:`${new Date().getDate()}/${new Date().getMonth()+1/${new Date().getFullYear()}}`
                category: category,
                amount: parseInt(amount)
            };
            setExpenses([...expenses, newexpense]);  //spread operator
            toast.success("New User Added Successfully")
            //toast.failure("New User not Added Successfully")
            // setDate("");
            setCategory("");
            setAmount("");
        }
        else {
            const updateArray = expenses.map((item) => {
                return item.id === Editid ? { ...item, category, amount } : item  // ...item,date,
            })
            setExpenses(updateArray)
            toast.info("New User Updated Successfully")
            setisEdit(false)
            setEditid("")
            // setDate("");
            setCategory("");
            setAmount("");
        }
    };




    //display
    return (

        <div style={{ display: 'flex' }}>
            //  <Link to="/about">Link</Link> 
            //  <a href="/about">atag</a> 
            <div style={{ flex: 50, padding: "50px" }}>
                <form onSubmit={(e) => handleAddExpense(e)}>
                    //  <input type="text" placeholder="Date" value={date} onChange={handleDate} style={{ border: "2px solid black" }}/><br></br><br></br> 
                    //  <input type="text" placeholder="Category" value={categotry} onChange={handleCategory} style={{ border: "2px solid black" }}/><br></br><br></br> 
                    <select value={category} onChange={handleCategory} style={{ border: "2px solid black" }}>
                        <option>Select the Category</option>
                        <option >Income</option>
                        <option >Loan</option>
                        <option >Rent</option>
                    </select><br></br> <br></br>
                    <input type="number" placeholder="Amount" value={amount} onChange={handleAmount} style={{ border: "2px solid black" }} required /><br></br><br></br>
                    <button type="submit">{isEdit ? "UPDATE" : "ADD"}</button>
                </form>
            </div>
            <div style={{ flex: 50, padding: "50px" }}>

                <table className="table" style={{ border: "2px", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "2px solid black" }}>Date</th>
                            <th style={{ border: "2px solid black" }}>Category</th>
                            <th style={{ border: "2px solid black" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((user, index) => (
                            <tr key={index} style={{ border: "2px solid black" }}>
                                <td style={{ border: "2px solid black" }}>{user.date}</td>
                                <td style={{ border: "2px solid black" }}>{user.category}</td>
                                <td style={{ border: "2px solid black" }}>{user.amount}</td>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                                <button onClick={() => handleUpdate(user)}>Update</button>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ border: "2px solid black" }}>Total</td>
                            <td style={{ border: "2px solid black" }}>Rs.{sum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserList;*/
