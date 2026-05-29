import { useState } from "react";
import ClassComponent from "./ClassComponent";
import FunctionalComponent from "./FunctionalComponent";
import UserComponent from "./UserComponent";
// Async / Await Example
type User = {
  id: number;
  name: string;
  family?: string;
  dateOfBirth?: number;
  major?: string;
  specialty?: string;
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
  const initialUsers: User[] = [
    {
      id: 1,
      name: "Parisa",
      family: "Shahbazi",
      dateOfBirth: 1999,
      major: "Software",
      specialty: "Front-end",
    },
    {
      id: 2,
      name: "Esmael",
      family: "Hoseini",
      dateOfBirth: 1997,
      major: "Software",
      specialty: "Back-end Python",
    },
    {
      id: 3,
      name: "Alex",
      family: "JK",
      dateOfBirth: 1980,
      major: "Hardware",
      specialty: "Repair Parts",
    },
    {
      id: 4,
      name: "Louise",
      family: "Lang",
      dateOfBirth: 1989,
      major: "Fashion",
      specialty: "Style",
    },
  ];
  const [alluser, setAllUsers] = useState<User[]>(initialUsers);

  const updateTotalLikes = (change: number): void => {
    setTotalLikes((prev) => prev + change);
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
  const deleteUser = (id: number) => {
    setAllUsers(alluser.filter((user) => user.id !== id));
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
      Props & States
      <div
        style={{
          backgroundColor: "#34384fff",
          padding: "20px",
          display: "flex",
          gap: "20px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {alluser.map((user) => (
          <UserComponent
            key={user.id}
            {...user}
            onLikeChange={updateTotalLikes}
            handleDelete={deleteUser}
          >
            {user.id === 1 && (
              <div>
                <button>Test</button>
                children
              </div>
            )}
          </UserComponent>
        ))}
        <div
          style={{
            backgroundColor: "#484f74ff",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          💖 Total Likes : {totalLikes}
        </div>
      </div>
    </>
  );
}
