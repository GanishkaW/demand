import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const [activeTab, setActiveTab] = useState("add");
  const [fruitName, setFruitName] = useState("");
  const [price, setPrice] = useState("");
  const [fruits, setFruits] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

 const handleAddFruit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("authToken"); // or use your exact key
    console.log(token)

    const res = await fetch("http://localhost:8000/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": `${token}`, // 👈 pass token here
      },
      body: JSON.stringify({ name: fruitName, price }),
    });

    if (!res.ok) {
      throw new Error("Failed to add fruit");
    }

    setFruitName("");
    setPrice("");
    alert("Fruit added!");
  } catch (err) {
    console.error(err);
    alert("Error adding fruit");
  }
};


  const fetchFruits = async () => {
    try {
      const res = await fetch("http://localhost:8000/foods");
      if (!res.ok) {
        throw new Error("Failed to fetch fruits");
      }
      const data = await res.json();
      setFruits(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchFruits();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 shadow-lg">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Welcome, {user?.firstName}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-orange-600 transition"
        >
          Logout
        </button>
      </nav>

      {/* Tabs */}
      <div className="flex justify-center mt-10 space-x-6">
        <button
          onClick={() => setActiveTab("add")}
          className={`px-6 py-3 rounded-full font-semibold text-lg transition duration-300 ${activeTab === "add"
              ? "bg-gradient-to-r from-emerald-400 to-blue-500 shadow-lg text-white"
              : "bg-gradient-to-r from-emerald-300 to-blue-300 text-white opacity-80 hover:opacity-100"
            }`}
        >
          Add Fruits
        </button>
        <button
          onClick={() => setActiveTab("view")}
         className={`px-6 py-3 rounded-full font-semibold text-lg transition duration-300 ${activeTab === "view"
              ? "bg-gradient-to-r from-emerald-400 to-blue-500 shadow-lg text-white"
              : "bg-gradient-to-r from-emerald-300 to-blue-300 text-white opacity-80 hover:opacity-100"
            }`}
        >
          View Fruits
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {activeTab === "add" && (
          <form
            onSubmit={handleAddFruit}
            className="bg-white/10 rounded-lg p-8 space-y-6 backdrop-blur-md shadow-lg"
          >
            <input
              type="text"
              value={fruitName}
              onChange={(e) => setFruitName(e.target.value)}
              placeholder="Fruit Name"
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price (Rs.)"
              className="w-full p-3 rounded-md bg-white/20 border border-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-white font-semibold hover:from-emerald-400 hover:to-blue-500 transition shadow-lg"
            >
              Add Fruit
            </button>
          </form>
        )}

        {activeTab === "view" && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fruits.length === 0 ? (
              <p className="text-center text-white/70 col-span-full">
                No fruits found.
              </p>
            ) : (
              fruits.map((fruit, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-6 flex flex-col justify-between backdrop-blur-md shadow-lg"
                >
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {fruit.name}
                    </h3>
                    <p className="text-white/80 mb-4">Price: Rs. {fruit.price}</p>
                  </div>
                  <button
                    onClick={() => alert(`Get insights for ${fruit.name}`)}
                    className="self-start bg-gradient-to-r from-pink-500 to-orange-500 px-5 py-2 rounded-full font-semibold text-white hover:from-pink-600 hover:to-orange-600 transition shadow-lg"
                  >
                    Get Insights
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
