import { useState } from "react";
// Async / Await Example
type User = {
  id: number;
  name: string;
};

// Fake async function
function fetchUser(): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Parisa",
      });
    }, 2000);
  });
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoadUser = async () => {
    try {
      setLoading(true);

      console.log("Loading started...");

      // wait for promise result
      const data = await fetchUser();

      console.log("User loaded:", data);

      setUser(data);

    } catch (error) {
      console.log("Error:", error);

    } finally {
      setLoading(false);

      console.log("Loading finished");
    }
  };

  return (
    <div
      style={{
        display:"flex",
        flexDirection:"column",
        fontFamily: "sans-serif",
        padding: "40px",
        gap:"30px",
      }}
    >
      <h2>Async / Await Example</h2>

      <button onClick={handleLoadUser}>
        Load User
      </button>

      {loading && <p>Loading...</p>}

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
        </div>
      )}
    </div>
  );
}