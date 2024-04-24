import React from 'react'
import { useState ,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import {useParams} from 'react-router-dom'

//modal
const Modal = ({ isOpen, onClose, expense, onUpdate }) => {
    if (!isOpen || !expense) {
        return null;
      }
    const [amount, setAmount] = useState(expense.amount);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    

    const handleSubmit = () => {
        onUpdate({ ...expense, amount: amount });
        toast.success("Expense get Updated")
        onClose();
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>
                        &times;
                    </span>
                    <h2>Edit Expense</h2>
                    <label>Amount:</label>
                    <input type="text" value={amount} onChange={handleAmountChange} />
                    <button onClick={handleSubmit}>Update</button>
                    
                </div>
            </div>
        )
    );
};


const Table = (props) => {

    // const [expenses, setExpenses] = useState([
    //     { id: uuidv4(), date: "2024-03-17", category: "Income", amount: 500 },
    //     { id: uuidv4(), date: "2023-06-19", category: "Rent", amount: 2500 },
    //     { id: uuidv4(), date: "2021-03-17", category: "Rent", amount: 5000 },
    //     { id: uuidv4(), date: "2022-06-05", category: "Income", amount: 250 }
    // ]);

     const {expenses, setExpenses} = props

    const [isEdit, setisEdit] = useState(false);
    const [editExpense, setEditExpense] = useState(null);

    //delete
    const handleDelete = (index) => {
        let deletedArray = expenses.filter((user, i) => index != i)
        setExpenses(deletedArray)
    }

    //update

    const handleUpdate = (expense) => {
        setExpenses(
            expenses.map((item) => (item.id === expense.id ? { ...item, amount: expense.amount } : item))
        );
        setisEdit(false);
        setEditExpense(null);
    };

    //Modal
    const openModal = (user) => {
        setisEdit(true);
        setEditExpense(user);
    };

    const closeModal = () => {
        setisEdit(false);
        setEditExpense(null);
    };

   

    //filter
    const {id}=useParams();
    const filterexpense=expenses.filter(user=>user.category===id)
    useEffect(() => {
    }, [id,filterexpense]);

    
    //sum
    let sum = 0;
    expenses && expenses?.map((exp) => {    // map checker
        sum += parseInt(exp.amount);
    });




//display
    return (
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table className="table" style={{ border: "2px", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "3px solid black" }}>Date</th>
                        <th style={{ border: "3px solid black" }}>Category</th>
                        <th style={{ border: "3px solid black" }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filterexpense.map((user,index) => (
                        <tr key={index} style={{ border: "2px solid black" }}>
                            <td style={{ border: "2px solid black" }}>{user.date}</td>
                            <td style={{ border: "2px solid black" }}>{user.category}</td>
                            <td style={{ border: "2px solid black" }}>{user.amount}</td>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                            <button onClick={() => openModal(user)}>Update</button>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ border: "2px solid black" }}>Total</td>
                        <td style={{ border: "2px solid black" }}>Rs.{sum}</td>
                    </tr>
                </tbody>
            </table>
            <Modal isOpen={isEdit} onClose={closeModal} expense={editExpense} onUpdate={handleUpdate} />
        </div>
    )
}

export default Table