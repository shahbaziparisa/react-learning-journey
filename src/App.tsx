import { useMemo, useState } from "react";
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
import LoadingModal from "./components/Loading";

type User = {
  id: number;
  name: string;
  family?: string;
  dateOfBirth?: number;
  major?: string;
  specialty?: string;
};

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
  const [searchText, setSearchText] = useState("");
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

  //Old Version without UseMemo
  // const searchUser = (char: string) => {
  //   const search = char.toLowerCase();
  //   const newSearched = initialUsers.filter(
  //     (user) =>
  //       user.name.toLowerCase().includes(search) ||
  //       user.family?.toLowerCase().includes(search),
  //   );
  //   console.log(newSearched);
  //   setAllUsers(newSearched);
  // };
  //UseMemo
  const filteredUsers = useMemo(() => {
    console.log("Filtering Users...");

    return initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.family?.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText]);
  const hugeResult = useMemo(() => {
    console.log("Huge Calculation Running...");

    let total = 0;

    for (let i = 0; i < 100000000; i++) {
      total += i;
    }

    return total;
  }, []);

  const showLocation = () => {
    navigate("/locations");
    console.log("navigate");
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <h1>My React Learning Journey Tests</h1>
        <h2>Async / Await Example</h2>
        <button onClick={handleLoadUser}>Load User</button>
        {/* {loading && <LoadingModal open={loading/>} */}
        <LoadingModal open={loading} />
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
      </div>

      <div className={styles.separator}></div>

      <ClassComponent />
      <FunctionalComponent />

      <div className={styles.separator}></div>

      <strong>Props & States - Search User -UseMemo</strong>
      <input
        style={{
          backgroundColor: "#ffffff",
          padding: "8px",
          margin: "10px",
          borderRadius: "8px",
        }}
        type="text"
        // onChange={(e) => searchUser(e.target.value)}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className={styles["all-users-container"]}>
        {filteredUsers.map((user) => (
          <UserComponent
            key={user.id}
            {...user}
            onLikeChange={updateTotalLikes}
            handleDelete={deleteUser}
          >
            {user.id === 1 && (
              <div>
                <button>T</button>
                child
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

      <div className={styles.separator}></div>

      <strong>Working with Axios - State & Effects</strong>
      <AlbumGallery />

      <div className={styles.separator}></div>

      <p>
        Using Loading, Data and Error handling Repeatedly for different
        components is not a good idea
      </p>
      <p>
        <strong>Solution:</strong> Create a reusable component to handle
        loading, data and error states
      </p>

      <Categories />
      <UserGallery />

      <div className={styles.separator}></div>

      <div className={styles.buttonGroup}>
        <span className={styles.buttonLabel}>🔗 This is Link</span>
        <Link to="/locations" className={styles.linkButton}>
          Route to Locations
        </Link>
      </div>

      <div className={styles.buttonGroup}>
        <span className={styles.buttonLabel}>📌 These are NavLinks</span>
        <NavLink
          to="/albums"
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLinkInactive
          }
        >
          🖼️ Product Gallery
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLinkInactive
          }
        >
          👥 User Gallery
        </NavLink>
      </div>

      <div className={styles.buttonGroup}>
        <span className={styles.buttonLabel}>🧭 Here is useNavigate</span>
        <button onClick={showLocation} className={styles.normalButton}>
          Navigate to Locations
        </button>
      </div>

      <div className={styles.outletContainer}>
        <Outlet />
      </div>

      <div className={styles.buttonGroup}>
        <span className={styles.buttonLabel}>
          🔗 This is UseMemo -in First Mount
        </span>
        <p>{hugeResult}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/albums" element={<AlbumsLayout />}>
            <Route index element={<AlbumGallery />} />
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
