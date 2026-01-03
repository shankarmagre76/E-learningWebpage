import NavBar from "../components/NavBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-white shadow-md md:flex">
        
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 border-b px-4 py-4 text-xl font-bold text-blue-600">
          <i className="fas fa-gauge-high"></i>
          Dashboard
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 px-4 py-4 text-gray-700 space-y-4">
          
          {/* Example Links (can be activated later) */}
          <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
            <i className="fas fa-book"></i>
            My Courses
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
            <i className="fas fa-user"></i>
            Profile
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
            <i className="fas fa-gear"></i>
            Settings
          </div>

          {/* Helper Text */}
          <p className="pt-4 text-xs text-gray-400">
            (Sidebar links can be connected to routes later)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <NavBar />
        <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>

    </div>
  );
}
