import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { getProductById } from "../api/getProductbyId";
import { useCallback } from "react";

export default function AlbumDetail() {
  const { id } = useParams();
  const fetchProduct = useCallback(() => {
    if (!id) throw new Error("No ID");
    return getProductById(Number(id));
  }, [id]);
  const { data: product, loading, error } = useFetch(fetchProduct);

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-400 p-4">{error}</div>;
  if (!product) return null;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded text-white">
      <h2 className="text-xl font-bold">Album Detail - {id}</h2>
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <p className="text-green-400 mb-4">${product.price}</p>

        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full max-w-md rounded-xl mb-4"
          />
        )}

        <p className="text-gray-300">{product.description}</p>
      </div>
    </div>
  );
}
