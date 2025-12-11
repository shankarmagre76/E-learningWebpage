import NavBar from "../components/NavBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden w-64 flex-col bg-white shadow-md md:flex">
        <div className="border-b px-4 py-4 text-xl font-bold text-blue-600">
          Dashboard
        </div>
        <div className="flex-1 px-4 py-4 text-gray-700">
          {/* You can add sidebar links later */}
          <p className="text-sm text-gray-500">
            (Sidebar links can go here – My Courses, Profile, etc.)
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <NavBar />
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
