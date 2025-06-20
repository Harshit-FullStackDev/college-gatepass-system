import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await api.post("/auth/login", form);
    const token = res.data.token;
    const payload = JSON.parse(atob(token.split(".")[1]));

    login(token, { email: payload.sub, role: payload.role });

    // 🚀 Role-based navigation
    if (payload.role === "STUDENT") {
      navigate("/student");
    } else if (payload.role === "WARDEN") {
      navigate("/warden");
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
        backgroundImage: "linear-gradient(to right, #d4fc79, #96e6a1)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Container fluid className="p-0">
        <Row className="g-0" style={{ minHeight: "100vh" }}>
          {/* Left Panel */}
          <Col
            md="6"
            className="d-flex flex-column justify-content-center align-items-center text-white text-center"
            style={{
              backgroundImage: "linear-gradient(135deg, #42d392 0%, #647eff 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "3rem",
            }}
          >
            <div>
              <h2 className="mb-3">Welcome Back!</h2>
              <p className="mb-4">
                To keep connected, login with your credentials
              </p>
              <Link to="/register">
                <Button outline color="light" className="px-5 py-2">
                  Register
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right Panel */}
          <Col
            md="6"
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
              padding: "3rem",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <h3 className="mb-4 text-center">Login</h3>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  block
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Form>

              <p className="mt-4 text-center text-muted">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
