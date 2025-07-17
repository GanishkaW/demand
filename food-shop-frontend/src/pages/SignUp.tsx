import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../utils/auth";
import axios from "../utils/axios";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", town: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("/signup", form);
      const res = await axios.post("/login", { email: form.email, password: form.password });
      setAuthToken(res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <TextField label="Email" fullWidth sx={{ mb: 2 }} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" fullWidth type="password" sx={{ mb: 2 }} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <TextField label="Town" fullWidth sx={{ mb: 2 }} value={form.town} onChange={e => setForm({ ...form, town: e.target.value })} />
      <Button variant="contained" fullWidth onClick={handleSignup}>Sign Up</Button>
      {error && <Typography color="error" mt={1}>{error}</Typography>}
    </Box>
  );
}
