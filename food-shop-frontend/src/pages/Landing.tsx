import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3">Welcome to Food Market</Typography>
      <Button onClick={() => navigate("/signin")} variant="contained" sx={{ m: 2 }}>
        Sign In
      </Button>
      <Button onClick={() => navigate("/signup")} variant="outlined">
        Sign Up
      </Button>
    </Box>
  );
}
