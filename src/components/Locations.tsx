import { useFetch } from "../hooks/useFetch";
import { getLocations } from "../api/locations";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../UserContext";

export default function LocationList() {
  const context = useContext(UserContext);
  console.log(context);

  const navigate = useNavigate();
  const fetchLocations = useCallback(() => getLocations(1), []);
  const { data: locations, loading, error } = useFetch(fetchLocations);

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
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Locations</h1>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            User Name : {context?.user?.name}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
          >
            Return
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-5 border border-gray-100"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h2>

                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Lat:</span> {item.latitude}
                  </p>
                  <p>
                    <span className="font-medium">Lng:</span> {item.longitude}
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    ID: {item.id.toString().slice(-6)}
                  </span>

                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
