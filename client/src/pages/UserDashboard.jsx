import { useAuth } from '../context/AuthContext';
import '../styles/UserDashboard.css'; // Assuming you have a CSS file for styling
import Home from '../pages/Home.jsx';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <main className="dashboard-container">
      <Home/>
    </main>
  );
};

export default UserDashboard;