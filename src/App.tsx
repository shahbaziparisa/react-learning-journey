import { useState } from "react";
import ClassComponent from "./ClassComponent";
import FunctionalComponent from "./FunctionalComponent";
import UserComponent from "./userComponent/UserComponent";
import styles from "./App.module.css";
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

  const searchUser = (char: string) => {
    const search = char.toLowerCase();
    const newSearched = initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.family?.toLowerCase().includes(search),
    );
    console.log(newSearched);
    setAllUsers(newSearched);
  };

  return (
    <>
      <div className={styles.mainContainer}>
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
      Props & States -Search User
      <input type="text" onChange={(e) => searchUser(e.target.value)} />
      <div className={styles["all-users-container"]}>
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
