import "./userComponent.css";
import React from "react";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useInsertionEffect,
} from "react";
type UserComponentProps = {
  id: number;
  name: string;
  family?: string; //optional
  dateOfBirth?: number;
  major?: string;
  specialty?: string;
  onLikeChange: (change: number) => void;
  children?: React.ReactNode;
  handleDelete: (id: number) => void;
};
const UserComponent = ({
  id,
  name,
  family,
  dateOfBirth,
  major,
  specialty,
  onLikeChange,
  children,
  handleDelete,
}: UserComponentProps) => {
  console.log("**Render UserComponent---------");
  const age = dateOfBirth ? new Date().getFullYear() - dateOfBirth : "Unknown";
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const likeStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #eee",
  };
  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      onLikeChange(1);
      setIsLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      onLikeChange(-1);
      setIsLiked(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.classList.add("flash");
    setIsDeleting(true);
    setTimeout(() => {
      btn.classList.remove("flash");
      handleDelete(id);
    }, 300);
  };

  useEffect(() => {
    console.log(`User ${name} mounted`);
    console.log("%c MOUNT", "color:green;font-size:16px");

    return () => {
      console.log(`User ${name} unmounted`);
      console.log("%c UNMOUNT", "color:red;font-size:16px");
    };
  }, []);

  useEffect(() => {
    console.log(`Liked status changed: ${isLiked}`);
  }, [isLiked]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log(`${name}: Escape pressed`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    console.log("Event Listener Added");

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("Event Listener Removed");
    };
  }, [name]);
  useInsertionEffect(() => {
    console.log(
      "%c useInsertionEffect",
      "background:#8b5cf6;color:white;padding:4px 8px;border-radius:4px",
    );

    if (cardRef.current) {
      cardRef.current.style.backgroundColor = "#ede9fe";
    }
  }, []);
  useLayoutEffect(() => {
    console.log(
      "%c useLayoutEffect",
      "background:#3b82f6;color:white;padding:4px 8px;border-radius:4px",
    );

    if (cardRef.current) {
      cardRef.current.style.border = "3px solid #3b82f6";
    }
  }, []);
  useEffect(() => {
    console.log(
      "%c useEffect",
      "background:#22c55e;color:white;padding:4px 8px;border-radius:4px",
    );

    if (cardRef.current) {
      cardRef.current.style.boxShadow = "0 0 20px rgba(34,197,94,.6)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="maindiv"
      style={{
        opacity: isDeleting ? 0 : 1,
        transform: isDeleting ? "scale(0.9)" : "scale(1)",
        transition: "all 0.5s ease",
      }}
    >
      <p>
        <strong>Name:</strong> {name || "Unknown"}
      </p>
      <p>
        <strong>Family :</strong> {family || "Unknown"}{" "}
      </p>
      <p>
        <strong>Birth :</strong> {dateOfBirth ?? "Not provided"} (Age: {age})
      </p>
      <p>
        <strong>Major :</strong> {major || "Not specified"}{" "}
      </p>
      <p>
        <strong>Specialty :</strong> {specialty || "Not specified"}{" "}
      </p>
      <div style={likeStyle}>
        <button
          onClick={handleLike}
          style={{
            backgroundColor: isLiked ? "#ff4444" : "#ccc",
            color: "white",
            border: "none",
            padding: "5px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isLiked ? "❤️ " : "🤍 "}
        </button>
        <span>👍 {likes} likes</span>
        <div>{children}</div>
        <button
          className="delete-btn"
          style={{
            color: "white",
            border: "none",
            padding: "5px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={handleDeleteClick}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

// export default UserComponent;
// Memoized version
export default React.memo(UserComponent);
