import React from 'react'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './components/Client';
import Lawyer from './components/Lawyer';
import Judge from './components/Judge';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/client' element={<Client />}></Route>
          <Route path='/lawyer' element={<Lawyer />}></Route>
          <Route path='/judge' element={<Judge />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
