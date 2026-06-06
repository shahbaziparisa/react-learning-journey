import { getCategories } from "../api/categories";
import { useFetch } from "../hooks/useFetch";
import { useCallback, useContext } from "react";
import { UserContext } from "../UserContext";

export default function Categories() {
  const fetchCategories = useCallback(() => getCategories(5), []);
  //categories is change name alias for data, because we know that data is categories, so it is better to change the name of data to categories to make it more readable and understandable.
  const { data: categories, loading, error } = useFetch(fetchCategories);
  const { user } = useContext(UserContext);

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
          <h1 className="text-2xl font-bold mb-6">Categories</h1>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            User Name : {user.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories?.map((c) => (
              <div
                key={c.id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow hover:scale-105 transition"
              >
                <img src={c.image} className="h-40 w-full object-cover" />

                <div className="p-3">
                  <h2 className="text-sm font-bold">{c.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
