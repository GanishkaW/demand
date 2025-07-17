import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

interface Props {
  food: {
    id: number;
    name: string;
    price: string;
    ingredients: string;
  };
}

export default function FoodCard({ food }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{food.name}</Typography>
        <Typography>Rs. {food.price}</Typography>
        <Typography variant="body2" color="text.secondary">
          {food.ingredients}
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <Button variant="outlined">Calc 1</Button>
          <Button variant="outlined">Calc 2</Button>
          <Button variant="outlined">Calc 3</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
