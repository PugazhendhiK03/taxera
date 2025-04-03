import { Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h5" component="p">
          Welcome, Admin {user?.name}!
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          This is the admin panel where you can manage the entire application.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Manage Users
          </Button>
          <Button variant="contained" color="secondary">
            View Analytics
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;