import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Redux Blog App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-lg hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/post" className="text-lg hover:text-gray-300">Post</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
