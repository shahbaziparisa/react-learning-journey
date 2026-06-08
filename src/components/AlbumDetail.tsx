import { useLocation, useParams } from "react-router";

export default function AlbumDetail() {
  console.log("**Render AlbumDetail");

  //UseParams is carrying the parameters in routes and we can call it like this :
  const { id } = useParams();
  //UseLocation can carry one state and more contains objects
  const stateLoacation = useLocation();
  console.log("stateLocation", stateLoacation.state);
  const product = stateLoacation.state;
  console.log("product>>>", product);

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded text-white">
      <h2 className="text-xl font-bold">Product id - {id}</h2>
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

        <p className="text-green-400 mb-4">${product.price}</p>
        <div className="flex gap-2 overflow-x-auto py-2">
          {product?.images?.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              alt={`${product?.title}-${i}`}
              className="h-34 w-34 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>

        <p className="text-gray-300">{product.description}</p>
      </div>
    </div>
  );
}
