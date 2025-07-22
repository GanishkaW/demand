import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  store_name: z.string().min(1, "Store name is required"),
  town: z.string().min(1, "Town is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

 const onSubmit = async (data: FormData) => {
  try {
    console.log(data);
    const response = await fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Signup failed");
    }

    // Signup successful → redirect to login
    alert("Signup successful! Please log in.");
    navigate("/login");
  } catch (error: any) {
    console.error("Signup error:", error.message);
    alert("Signup failed: " + error.message);
  }
};


  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700">Sign Up</h2>

        <input
          {...register("first_name")}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}

        <input
          {...register("last_name")}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}

        <input
          {...register("store_name")}
          placeholder="Store Name"
          className="w-full p-2 border rounded"
        />
        {errors.store_name && <p className="text-red-500 text-sm">{errors.store_name.message}</p>}

        <input
          {...register("town")}
          placeholder="Town"
          className="w-full p-2 border rounded"
        />
        {errors.town && <p className="text-red-500 text-sm">{errors.town.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

       <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded text-white hover:from-emerald-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        Sign Up
      </button>

      </form>
    </div>
  );
}
