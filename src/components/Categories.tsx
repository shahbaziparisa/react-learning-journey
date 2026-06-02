import type { Category } from "../types/category";
import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const categories = await getCategories(5);
        setCategories(categories);
      } catch (err) {
        setError(
          `Failed to fetch categories: ${err instanceof Error ? err.message : "Error"}`,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((c) => (
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
