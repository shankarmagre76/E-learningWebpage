// client\src\layouts\MainLayout.jsx

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50 px-4 py-6 md:px-10">{children}</main>
      <Footer />
    </div>
  );
}
