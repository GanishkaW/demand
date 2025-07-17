import {
  AppBar,
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import { useState, useEffect, JSX } from "react";
import FoodCard from "../components/FoodCard";
import axios from "../utils/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface Food {
  id: number;
  name: string;
  price: number;
  ingredients: string;
}

interface FoodForm {
  name: string;
  price: string;
  ingredients: string;
}

export default function Dashboard(): JSX.Element {
  const [tab, setTab] = useState<number>(0);
  const [foods, setFoods] = useState<Food[]>([]);
  const [form, setForm] = useState<FoodForm>({ name: "", price: "", ingredients: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  // Dummy data for fallback when backend returns empty
  const dummyFoods: Food[] = [
    {
      id: 1,
      name: "Classic Burger",
      price: 8.99,
      ingredients: "Beef, Lettuce, Tomato, Onion, Bun",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 10.99,
      ingredients: "Mozzarella, Tomato Sauce, Basil",
    },
    {
      id: 3,
      name: "Grilled Chicken Salad",
      price: 7.5,
      ingredients: "Chicken, Lettuce, Tomato, Cucumber, Olive Oil",
    },
    {
      id: 4,
      name: "Spaghetti Bolognese",
      price: 12.0,
      ingredients: "Spaghetti, Ground Beef, Tomato Sauce, Garlic",
    },
    {
      id: 5,
      name: "Fish Tacos",
      price: 9.5,
      ingredients: "Grilled Fish, Cabbage Slaw, Lime Crema, Tortilla",
    },
    {
      id: 6,
      name: "Paneer Wrap",
      price: 6.75,
      ingredients: "Paneer, Onion, Capsicum, Wrap, Spices",
    },
  ];


  const fetchFoods = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get<Food[]>("/foods");

      if (res.data.length === 0) {
        setFoods(dummyFoods);
      } else {
        setFoods(res.data);
      }
    } catch (err: any) {
      setError("Failed to fetch foods");
      console.error(err);
      // Optional fallback in case the fetch fails
      setFoods(dummyFoods);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (): Promise<void> => {
    if (!form.name || !form.price || !form.ingredients) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("/foods", form);
      await fetchFoods();
      setForm({ name: "", price: "", ingredients: "" });
      setSuccess("Food item added successfully!");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError("Failed to add food item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = (): void => {
    logout();
    navigate("/");
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number): void => {
    setTab(newValue);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (field: keyof FoodForm) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [field]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleAdd();
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={2}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="h1" sx={{ mr: 4 }}>
              Food Market Dashboard
            </Typography>
            <Tabs 
              value={tab} 
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="View Foods" />
              <Tab label="Add Food" />
            </Tabs>
          </Box>
          <Button 
            onClick={handleLogout} 
            color="inherit"
            variant="outlined"
            sx={{ borderColor: "white", "&:hover": { borderColor: "white" } }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* View Foods Tab */}
        {tab === 0 && (
          <Box>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
              Food Items ({foods.length})
            </Typography>
            
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress size={40} />
              </Box>
            ) : foods.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No food items found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Add your first food item using the "Add Food" tab
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 3,
                  mt: 3,
                }}
              >
                {foods.map((food: Food) => (
                  <Box key={food.id}>
                    <FoodCard food={food} />
                  </Box>
                ))}
              </Box>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
        {/* Add Food Tab */}
        {tab === 1 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
                Add New Food Item
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Food Name"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  value={form.name}
                  onChange={handleInputChange("name")}
                  disabled={loading}
                  error={Boolean(error && !form.name)}
                />
                
                <TextField
                  label="Price"
                  fullWidth
                  required
                  type="number"
                  sx={{ mb: 2 }}
                  value={form.price}
                  onChange={handleInputChange("price")}
                  disabled={loading}
                  error={Boolean(error && !form.price)}
                  inputProps={{ min: "0", step: "0.01" }}
                />
                
                <TextField
                  label="Ingredients"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                  value={form.ingredients}
                  onChange={handleInputChange("ingredients")}
                  disabled={loading}
                  error={Boolean(error && !form.ingredients)}
                  placeholder="Enter ingredients separated by commas"
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={20} color="inherit" />
                      Adding Food...
                    </Box>
                  ) : (
                    "Add Food Item"
                  )}
                </Button>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {success}
                </Alert>
              )}
            </Paper>
          </Box>
        )}        
      </Container>
    </Box>
  );
}