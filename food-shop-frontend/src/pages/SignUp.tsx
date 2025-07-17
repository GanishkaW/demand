import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth";
import axios from "../utils/axios";

interface SignUpForm {
  email: string;
  password: string;
  town: string;
}

interface SignUpProps {
  onSignUpSuccess?: () => void;
}

interface LoginResponse {
  access_token: string;
}

export default function SignUp({ onSignUpSuccess }: SignUpProps): JSX.Element {
  const [form, setForm] = useState<SignUpForm>({ email: "", password: "", town: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = async (): Promise<void> => {
    if (!form.email || !form.password || !form.town) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Sign up user
      await axios.post("/signup", form);
      
      // Auto-login after successful signup
      const res = await axios.post<LoginResponse>("/login", { 
        email: form.email, 
        password: form.password 
      });
      
      setAuthToken(res.data.access_token);
      setSuccess(true);
      
      // If we're in the landing page context, switch to sign in
      if (onSignUpSuccess) {
        setTimeout(() => {
          onSignUpSuccess();
        }, 1500);
      } else {
        // If standalone, navigate to dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SignUpForm) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [field]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSignup();
  };

  if (success) {
    return (
      <Box textAlign="center" py={4}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Account created successfully! 
          {onSignUpSuccess ? " Redirecting to sign in..." : " Redirecting to dashboard..."}
        </Alert>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" mb={3} textAlign="center" color="primary">
        Create Your Account
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
        sx={{ mb: 2 }} 
        value={form.password} 
        onChange={handleInputChange("password")}
        error={Boolean(error && !form.password)}
        disabled={loading}
      />
      
      <TextField 
        label="Town" 
        fullWidth 
        required
        sx={{ mb: 3 }} 
        value={form.town} 
        onChange={handleInputChange("town")}
        error={Boolean(error && !form.town)}
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
            Creating Account...
          </Box>
        ) : (
          "Create Account"
        )}
      </Button>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      
      <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Typography>
    </Box>
  );
}