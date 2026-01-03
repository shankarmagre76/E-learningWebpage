export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/learn.png"
              alt="E-Learning Logo"
              className="h-10 w-10 object-contain"
            />
            <h2 className="text-xl font-bold text-white">learn-E</h2>
          </div>
          <p className="text-sm leading-relaxed">
            Learn, grow, and build your career with industry-ready courses
            designed by expert instructors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/courses" className="hover:text-blue-400">Courses</a></li>
            <li><a href="/login" className="hover:text-blue-400">Login</a></li>
            <li><a href="/register" className="hover:text-blue-400">Sign Up</a></li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Popular Courses</h3>
          <ul className="space-y-2 text-sm">
            <li>Full-Stack Development</li>
            <li>Data Science</li>
            <li>Machine Learning</li>
            <li>Cyber Security</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
          <p className="text-sm mb-2">
            <i className="fas fa-envelope mr-2 text-blue-400"></i>
            helpandsupport@learne.com
          </p>
          <p className="text-sm mb-4">
            <i className="fas fa-phone mr-2 text-blue-400"></i>
            +91 89658 23568
          </p>

          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">learn-E</span>.  
        All rights reserved.
      </div>

    </footer>
  );
}
