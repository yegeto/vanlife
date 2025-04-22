import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./Components/Header";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";

function App() {
  return (
    <>
      {/* Navigation Links */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetail />} />
      </Routes>
    </>
  );
}

export default App;
