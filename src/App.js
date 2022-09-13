import './App.css';
import {Route, Routes} from 'react-router'
import { useState,useEffect } from 'react';
import Home from './pages/Home';
import Runs from './pages/Runs';
import RunDetail from './pages/RunDetails';
import Nav from './componenets/Nav';
import Box from './pages/Box';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Social from './pages/Social';
function App() {
  const [user,setUser] = useState()
  const setLocal = (userInfo) =>{
    localStorage.setItem('name',userInfo.name)
    localStorage.setItem('id',userInfo.id)
  }
  const checkLocal = ()=>{
    if(localStorage.getItem('id')){
      setUser({'id':localStorage.getItem('id'),'name':localStorage.getItem('name')})
    }
  }
  useEffect(()=>{
    checkLocal()
  },[])
  return (
    <div className="App">
      <Nav user={user} setUser={setUser}/>
      <main>
        <Routes>
          <Route path = '/' element={<Home user={user} />} />
          <Route path = '/runs/:gameId/' element = {<Runs user={user} />} />
          <Route path = 'runs/:gameId/run/:runId' element = {<RunDetail user={user} />} />
          <Route path = '/box/:runId' element = {<Box />} />
          <Route path = '/login' element = {<LogIn  setUser={setUser} setLocal={setLocal}/>} />
          <Route path = '/signup' element = {<SignUp />} />
          <Route path = '/social' element = {<Social />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
