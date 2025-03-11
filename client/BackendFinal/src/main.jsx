import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute.jsx'
import ToDoList from "./components/ToDoList.jsx"
import { Outlet } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <App /> */}

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<App />} />

        <Route path="/admin/" element={<ProtectedRoute />}>
        
          <Route path="gettodos" element={<ToDoList />} />


        </Route>


      </Routes>





    </BrowserRouter>




  </StrictMode >,
)
