import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth";
import axios from "../utils/axios";

interface SignInForm {
  email: string;
  password: string;
}

interface SignInProps {
  onSignInSuccess?: () => void;
}

interface LoginResponse {
  access_token: string;
}

export default function SignIn({ onSignInSuccess }: SignInProps): JSX.Element {
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignIn = async (): Promise<void> => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post<LoginResponse>("/login", form);
      setAuthToken(res.data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Sign in failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignInForm) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [field]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" mb={3} textAlign="center" color="primary">
        Welcome Back
      </Typography>
      
      <TextField 
        label="Email Address" 
        type="email"
        fullWidth 
        required
        sx={{ mb: 2 }} 
        value={form.email} 
        onChange={handleInputChange("email")}
        error={Boolean(error && !form.email)}
        disabled={loading}
      />
      
      <TextField 
        label="Password" 
        fullWidth 
        type="password" 
        required
        sx={{ mb: 3 }} 
        value={form.password} 
        onChange={handleInputChange("password")}
        error={Boolean(error && !form.password)}
        disabled={loading}
      />
      
      <Button 
        type="submit"
        variant="contained" 
        fullWidth 
        size="large"
        disabled={loading}
        sx={{ mb: 2, py: 1.5 }}
      >
        {loading ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} color="inherit" />
            Signing In...
          </Box>
        ) : (
          "Sign In"
        )}
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
        Forgot your password? Contact support
      </Typography>
    </Box>
  );
}