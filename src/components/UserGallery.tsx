import { useCallback, useContext } from "react";
import { getUserGallery } from "../api/userGallery";
import { useFetch } from "../hooks/useFetch";
import { UserContext } from "../UserContext";

export default function UserGallery() {
  const fetchUserGallery = useCallback(() => getUserGallery(4), []);
  const { data: userGallery, loading, error } = useFetch(fetchUserGallery);
  const context = useContext(UserContext);

  return (
    <>
      {loading && (
        <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
          Loading products...
        </div>
      )}
      {error && (
        <div className="min-h-screen flex items-center justify-center text-red-400 bg-gray-950">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className=" bg-gray-950 text-white p-6">
          <h1 className="text-2xl font-bold mb-6">User Gallery</h1>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            User Name : {context?.user?.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userGallery?.map((u) => (
              <div
                key={u.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:scale-105 transition"
              >
                <img src={u.avatar} className="h-40 w-full object-cover" />

                <div className="p-3">
                  <h2 className="text-sm font-bold">{u.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
