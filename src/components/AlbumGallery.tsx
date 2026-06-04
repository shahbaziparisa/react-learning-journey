import { useCallback } from "react";
import { getProducts } from "../api/products";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router";

export default function AlbumGallery() {
  // const { data: products, loading, error } = useFetch(() => getProducts(12));
  //It is better to use useCallback to memoize the fetchProducts function, because if we don't use it, the function will be recreated on every render, and it will cause the useEffect in useFetch to run on every render, which is not what we want. We only want to fetch products when the component mounts, not on every render. By using useCallback, we ensure that the fetchProducts function is only created once, and it will not cause unnecessary re-renders or re-fetching of products.
  const fetchProducts = useCallback(() => getProducts(12), []);
  const { data: products, loading, error } = useFetch(fetchProducts);

  //ّI delete this part and move it to custome hook useFetch to make it reusable for other components like categories and etc.
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const data = await getProducts(12);
  //       setProducts(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   load();
  // }, []);

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
        <div className="min-h-screen bg-gray-950 text-white p-6">
          <h1 className="text-2xl font-bold mb-6">Products</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products?.map((p) => (
              <Link
                key={p.id}
                //currennt route is /albums  and we want to go to /albums/:id when we click on the product, so we can use relative routing by just putting the id as the link's to prop
                // to={`${p.id}`}
                to={`productdetail/${p.id}`}
                state={p}
                className="bg-gray-900 rounded-xl p-3 hover:scale-105 transition"
              >
                <img src={p.images?.[0]} className="h-40 w-full object-cover" />
                <h2 className="text-sm font-bold text-white">{p.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
