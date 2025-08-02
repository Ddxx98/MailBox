import './App.css'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />
    </Routes>
  )
}

export default App
