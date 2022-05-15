import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Notes from './pages/Notes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
