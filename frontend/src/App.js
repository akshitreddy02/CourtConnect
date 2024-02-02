import React from 'react'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './components/Client';
import Lawyer from './components/Lawyer';
import Judge from './components/Judge';
import Home from './components/Home'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/client' element={<Client />}></Route>
          <Route path='/lawyer' element={<Lawyer />}></Route>
          <Route path='/judge' element={<Judge />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
// checking the fork push
export default App
