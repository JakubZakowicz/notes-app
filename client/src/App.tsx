import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import PrivateRoute from './components/PrivateRoute';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';

function App() {
  return (
    <div className="before:bg-main-background before:absolute before:inset-0 before:opacity-60 before:-z-10">
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Notes />} />
            <Route path="/notes/create" element={<AddNote />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
