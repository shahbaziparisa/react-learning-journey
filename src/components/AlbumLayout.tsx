import { Outlet, NavLink } from "react-router";

export default function AlbumsLayout() {
  console.log("**Render AlbumsLayout");

  return (
    <div>
      <br></br>
      Working on Nested Routes-Dynamic Routing-UseParams- UseLocation
      <br></br>
      --------------------------------------------
      <br></br>
      <h1 className="text-2xl font-bold mb-4">Albums</h1>
      <div className="flex gap-3 mb-4">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "bg-purple-600 text-white px-4 py-2 rounded"
              : "bg-gray-300 text-black px-4 py-2 rounded"
          }
        >
          All Albums
        </NavLink>
      </div>
      {/* Here is for showing Childrens(Routes) AlbumGallery or AlbumDetail */}
      <Outlet />
    </div>
  );
}
