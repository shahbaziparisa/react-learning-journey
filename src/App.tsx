import { useState } from "react";
import ClassComponent from "./ClassComponent";
import FunctionalComponent from "./FunctionalComponent";
import User from "./UserComponent";
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
     <ClassComponent/>
      <FunctionalComponent/>
      <div style={{
        display:"flex",gap:'20px',alignContent:"center",justifyContent:"center"}}>
      <UserComponent name="Parisa" family="Shahbazi" dateOfBirth={1999} major={"Software"} specialty={"Front-end"}/>
      <UserComponent name="Esmael" family="Hoseini" dateOfBirth={1997} major={"Software"} specialty={"Back-end Python"}/>
      <UserComponent name="Alex" family="JK" dateOfBirth={1980} major={"Hardware"} specialty={"Repair Parts"}/>
      <UserComponent name="Louise" family={"Lang"} dateOfBirth={1989} major={"Fashion"} specialty={"Style"}/>
      </div>
    </>
   
  );
}