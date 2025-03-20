// front-end\src\components\Layout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";

const user = {
  name: "Melissa",
  avatar: "/avatar.png",
};

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <Header user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
