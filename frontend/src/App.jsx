import './App.css'
import LogIn from './components/LogIn/LogIn'
import SignUp from './components/SignUp/SignUp'
import Header from './components/Header/Header'
import MailEditor from './components/MailEditor/MailEditor'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div style={{background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",}}>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/editor" element={<MailEditor />} />
      </Routes>
    </div>
  )
}

export default App
