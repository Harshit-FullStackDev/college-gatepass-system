import {
  Form, FormGroup, Input, Button, Card, CardBody
} from 'reactstrap';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa';
import api from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required.';
    if (!form.email.includes('@')) return 'Email must be valid.';
    if (!form.password || form.password.length < 8) return 'Password must be at least 8 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return toast.error(error);

    try {
      setLoading(true);
      await api.post('/auth/register', form);
      toast.success('Registered successfully!');
      setTimeout(() => {
        setForm({ name: '', email: '', password: '', role: 'STUDENT' });
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #d4fc79, #96e6a1)',
    }}>
      <ToastContainer />
      <Card style={{
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        maxWidth: '960px',
        height: '90%',
        border: 'none',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        borderRadius: '20px'
      }}>
        {/* Left Panel */}
        <div style={{
          width: '40%',
          background: '#20c997',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}>
          <h2 className="mb-3">Welcome Back!</h2>
          <p className="text-center">To keep connected with us<br />login with your personal info</p>
          <Link to="/login">
            <Button outline color="light" className="mt-4 px-4">
              SIGN IN
            </Button>
          </Link>
        </div>

        {/* Right Panel */}
        <CardBody className="w-100" style={{ padding: '3rem' }}>
          <h3 className="text-center text-success mb-4">Create Account</h3>
          <div className="d-flex justify-content-center mb-3 gap-3">
            <Button color="light"><FaFacebook /></Button>
            <Button color="light"><FaGoogle /></Button>
            <Button color="light"><FaLinkedin /></Button>
          </div>
          <p className="text-center text-muted small mb-4">or use your email for registration:</p>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <div className="d-flex align-items-center bg-light rounded px-3">
                <FaUser className="me-2 text-muted" />
                <Input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-0 bg-transparent"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="d-flex align-items-center bg-light rounded px-3">
                <FaEnvelope className="me-2 text-muted" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-0 bg-transparent"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div className="d-flex align-items-center bg-light rounded px-3">
                <FaLock className="me-2 text-muted" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="border-0 bg-transparent"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Input
                type="select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="STUDENT">STUDENT</option>
              </Input>
            </FormGroup>

            <Button
              color="success"
              block
              className="mt-3"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'SIGN UP'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
