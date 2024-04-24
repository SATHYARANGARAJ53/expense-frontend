import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import About from './About.jsx';
import App from './App.jsx'
import Table from './Table.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<App />}> </Route>  
        <Route path="/about" element={<About/>}> </Route>
        <Route path="/:id" element={<Table/>}/> 
      </Routes>
    </BrowserRouter>
    
   </React.StrictMode>,
)
