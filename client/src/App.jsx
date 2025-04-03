import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ServicePage from './pages/ServicePage';
import ProjectPage from './pages/ProjectPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/services' element={<ServicePage/>}/>
        <Route path='/projects' element={<ProjectPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
          <Route path="" element={<UserDashboard />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;