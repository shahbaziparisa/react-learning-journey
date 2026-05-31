import { useState } from "react";
import { useEffect } from "react";
import "./userComponent.css";

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
  const age = dateOfBirth ? new Date().getFullYear() - dateOfBirth : "Unknown";
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

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

  const handleDeleteClick = () => {
    setIsFlashing(true);
    setTimeout(() => {
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

  return (
    <div className="maindiv">
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
          {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <span>👍 {likes} likes</span>
        <div>{children}</div>
        <button
          style={{
            backgroundColor: isFlashing ? "#838383ff" : "#f7f7f7ff",
            color: "white",
            border: "none",
            padding: "5px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            opacity: isFlashing ? 0 : 1,
            transform: isFlashing ? "scale(0.9)" : "scale(1)",
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

export default UserComponent;
