import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Shopdashboard from "./components/Shopdashboard";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import About from "./components/About";
import Viewstock from "./components/Viewstock";
import Test from "./components/Test"

function App() {
  return (
    <>
     
      <BrowserRouter>
      
        <Routes>
        <Route path="/test" element={<Test />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/shopdashboard" element={<Shopdashboard />} />
          <Route path="/shopdashboard/stock" element={<Viewstock />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
