import { Box, Button, Typography, Card, CardContent, Grid, Container } from "@mui/material";
import { JSX, useState } from "react";
import SignIn from "./SignIn"; // Assuming your SignIn component path
import SignUp from "./SignUp"; // Assuming your SignUp component path

type AuthMode = "signin" | "signup";

export default function Landing(): JSX.Element {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  const handleSignUpSuccess = (): void => {
    setAuthMode("signin");
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", py: 4 }}>
      <Grid container spacing={4} alignItems="center" sx={{ minHeight: "90vh" }}>
        {/* Left Side - Content */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ pr: { md: 4 } }}>
            {/* Hero Image */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Fresh vegetables and fruits"
              sx={{
                width: "100%",
                height: { xs: 250, md: 350 },
                objectFit: "cover",
                borderRadius: 2,
                mb: 4,
                boxShadow: 3
              }}
            />
            
            {/* Main Content */}
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: "primary.main",
                fontSize: { xs: "2.5rem", md: "3.5rem" }
              }}
            >
              Welcome to Food Market
            </Typography>
            
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 3, 
                color: "text.secondary",
                fontWeight: 400 
              }}
            >
              Fresh, Quality Food Delivered to Your Door
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                fontSize: "1.1rem",
                lineHeight: 1.6,
                color: "text.primary"
              }}
            >
              Discover the finest selection of fresh produce, organic vegetables, 
              premium meats, and artisanal products. We partner with local farmers 
              and trusted suppliers to bring you the highest quality ingredients 
              for your kitchen.
            </Typography>
            
            {/* Features */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Why Choose Food Market?
              </Typography>
              <Box component="ul" sx={{ pl: 2, "& li": { mb: 1 } }}>
                <Typography component="li" variant="body2">
                  🌱 Fresh, locally-sourced produce
                </Typography>
                <Typography component="li" variant="body2">
                  🚚 Fast and reliable delivery
                </Typography>
                <Typography component="li" variant="body2">
                  💰 Competitive prices and special offers
                </Typography>
                <Typography component="li" variant="body2">
                  📱 Easy online ordering experience
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Authentication Card */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card 
            elevation={8} 
            sx={{ 
              maxWidth: 450,
              mx: "auto",
              borderRadius: 3,
              overflow: "hidden"
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Toggle Buttons */}
              <Box sx={{ mb: 3, display: "flex", borderRadius: 1, overflow: "hidden" }}>
                <Button
                  fullWidth
                  variant={authMode === "signin" ? "contained" : "outlined"}
                  onClick={() => setAuthMode("signin")}
                  sx={{ 
                    borderRadius: 0,
                    borderRight: authMode === "signin" ? "none" : "1px solid",
                    borderRightColor: "primary.main"
                  }}
                >
                  Sign In
                </Button>
                <Button
                  fullWidth
                  variant={authMode === "signup" ? "contained" : "outlined"}
                  onClick={() => setAuthMode("signup")}
                  sx={{ borderRadius: 0 }}
                >
                  Sign Up
                </Button>
              </Box>

              {/* Authentication Components */}
              {authMode === "signin" ? (
                <SignIn />
              ) : (
                <SignUp onSignUpSuccess={handleSignUpSuccess} />
              )}

              {/* Additional Info */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {authMode === "signin" 
                    ? "New to Food Market? Click Sign Up to create an account"
                    : "Already have an account? Click Sign In to login"
                  }
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}