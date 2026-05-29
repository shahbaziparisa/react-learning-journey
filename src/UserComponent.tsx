import { useState } from "react";

type UserComponentProps = {
  name: string;
  family?: string; //optional
  dateOfBirth: number;
  major: string;
  specialty: string;
  onLikeChange: (change: number) => void;
  children?: React.ReactNode;
};
const UserComponent = ({
  name,
  family,
  dateOfBirth,
  major,
  specialty,
  onLikeChange,
  children,
}: UserComponentProps) => {
  const age = new Date().getFullYear() - dateOfBirth;
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      onLikeChange(1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      onLikeChange(-1);
      setIsLiked(false);
    }
  };

  return (
    <div
      style={{
        gap: "20px",
        display: "flex",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        alignContent: "start",
        textAlign: "left",
      }}
    >
      <p>
        <strong>Name:</strong> {name || "Unknown"}
      </p>
      <p>
        <strong>Family :</strong> {family || "Unknown"}{" "}
      </p>
      <p>
        <strong>DateOfBirth :</strong> {dateOfBirth || "Not provided"} (Age:{" "}
        {age} years old)
      </p>
      <p>
        <strong>Major :</strong> {major || "Not specified"}{" "}
      </p>
      <p>
        <strong>Specialty :</strong> {specialty || "Not specified"}{" "}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
          paddingTop: "10px",
          borderTop: "1px solid #eee",
        }}
      >
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
      </div>
    </div>
  );
};

export default UserComponent;
