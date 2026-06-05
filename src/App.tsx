import { useState } from "react";
import ClassComponent from "./components/ClassComponent";
import FunctionalComponent from "./components/FunctionalComponent";
import UserComponent from "./components/userComponent/UserComponent";
import styles from "./App.module.css";
import AlbumGallery from "./components/AlbumGallery";
import Categories from "./components/Categories";
import UserGallery from "./components/UserGallery";
import {
  Outlet,
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import LocationList from "./components/Locations";
import AlbumsLayout from "./components/AlbumLayout";
import AlbumDetail from "./components/AlbumDetail";
import NotFound from "./components/NotFound";

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

function HomePage() {
  const navigate = useNavigate();
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

  const showLocation = () => {
    navigate("/locations");
    console.log("navigate");
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <h1>My React Learning Journey Tests</h1>
        <h2>Async / Await Example</h2>
        <button onClick={handleLoadUser}>Load User</button>
        {loading && <p>Loading...</p>}
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
        -----------------------------------
      </div>
      <ClassComponent />
      <FunctionalComponent />
      Props & States -Search User
      <input
        style={{
          backgroundColor: "#ffffff",
          padding: "8px",
          margin: "10px",
          borderRadius: "8px",
        }}
        type="text"
        onChange={(e) => searchUser(e.target.value)}
      />
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
      -----------------------------------
      <br />
      Working with Axios -State & Effects
      <AlbumGallery />
      -----------------------------------
      <br />
      Useing Loading , Data and Error handleing Repeatedly for different
      components is not a good idea
      <br /> Solution : Create a reusable component to handle loading , data and
      error states
      <br />
      <br />
      <Categories />
      <UserGallery />
      This is Link
      <Link
        to="/locations"
        className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
      >
        Route to Locations
      </Link>
      <br></br>
      These are NavLink
      <div className="flex gap-3 p-4 border-b">
        <br></br>
        <NavLink
          to="/albums"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl shadow-md transition
            ${isActive ? "bg-purple-600 text-white" : "bg-gray-300 text-black"}`
          }
        >
          Product Gallery
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `px-5 py-2.5 rounded-xl shadow-md transition
            ${isActive ? "bg-purple-600 text-white" : "bg-gray-300 text-black"}`
          }
        >
          User Gallery
        </NavLink>
      </div>
      {/* ✅ اینجا جایی است که صفحات Nested رندر می‌شوند */}
      <div className="p-4">
        <Outlet />
      </div>
      <br></br>
      Here is UseNavigate
      <button
        onClick={showLocation}
        className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
      >
        Navigate to Locations
      </button>
    </>
  );
}
export default function App() {
  return (
    <div className="p-4">
      <Routes>
        {/* here is Nested Routes */}

        <Route path="/" element={<HomePage />}>
          <Route path="/albums" element={<AlbumsLayout />}>
            {/* show AlbumGallery by default */}
            <Route index element={<AlbumGallery />} />
            {/* Show AlbumDetail when Id   . It is Called Dynamic Route*/}
            <Route path="productdetail/:id" element={<AlbumDetail />} />
          </Route>
                  <Route path="/users" element={<UserGallery />} />

        </Route>

        <Route path="/categories" element={<Categories />} />
        <Route path="/locations" element={<LocationList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
