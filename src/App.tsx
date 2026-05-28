import { useState } from "react";
import ClassComponent from "./ClassComponent";
import FunctionalComponent from "./FunctionalComponent";
import UserComponent from "./UserComponent";
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
  const [totalLikes, setTotalLikes] = useState(0);

  const updateTotalLikes = (change) => {
    setTotalLikes(totalLikes + change);
  };

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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          padding: "20px",
          gap: "30px",
        }}
      >
        <h2>Async / Await Example</h2>

        <button onClick={handleLoadUser}>Load User</button>

        {loading && <p>Loading...</p>}

        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
      </div>
      <ClassComponent />
      <FunctionalComponent />
      <div
        style={{
          backgroundColor: "#a9deeeff",
          padding: "20px",
          display: "flex",
          gap: "20px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        Props & States
        <UserComponent
          name="Parisa"
          family="Shahbazi"
          dateOfBirth={1999}
          major={"Software"}
          specialty={"Front-end"}
          onLikeChange={updateTotalLikes}
        />
        <UserComponent
          name="Esmael"
          family="Hoseini"
          dateOfBirth={1997}
          major={"Software"}
          specialty={"Back-end Python"}
          onLikeChange={updateTotalLikes}
        />
        <UserComponent
          name="Alex"
          family="JK"
          dateOfBirth={1980}
          major={"Hardware"}
          specialty={"Repair Parts"}
          onLikeChange={updateTotalLikes}
        />
        <UserComponent
          name="Louise"
          family={"Lang"}
          dateOfBirth={1989}
          major={"Fashion"}
          specialty={"Style"}
          onLikeChange={updateTotalLikes}
        />
        <div
          style={{
            backgroundColor: "#4c8cafff",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          💖 Total Likes in All Users: {totalLikes}
        </div>
      </div>
    </>
  );
}
