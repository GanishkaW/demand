import {
  AppBar,
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import FoodCard from "../components/FoodCard";
import axios from "../utils/axios";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", ingredients: "" });
  const navigate = useNavigate();

  const fetchFoods = async () => {
    const res = await axios.get("/foods");
    setFoods(res.data);
  };

  const handleAdd = async () => {
    await axios.post("/foods", form);
    fetchFoods();
    setForm({ name: "", price: "", ingredients: "" });
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Box>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", px: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Add Food" />
          <Tab label="View Foods" />
        </Tabs>
        <Button onClick={() => { logout(); navigate("/signin"); }} color="inherit">
          Logout
        </Button>
      </AppBar>

      {tab === 0 && (
        <Box maxWidth={400} mx="auto" mt={5}>
          <TextField label="Name" fullWidth sx={{ mb: 2 }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <TextField label="Price" fullWidth sx={{ mb: 2 }} value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <TextField label="Ingredients" fullWidth sx={{ mb: 2 }} value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })} />
          <Button variant="contained" fullWidth onClick={handleAdd}>Add</Button>
        </Box>
      )}

      {tab === 1 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            p: 3,
            justifyContent: "center",
          }}
        >
          {foods.map((food: any) => (
            <Box
              key={food.id}
              sx={{
                flex: "1 1 calc(50% - 16px)",
                minWidth: 300,
              }}
            >
              <FoodCard food={food} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
