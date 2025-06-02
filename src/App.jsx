import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { Toaster } from "react-hot-toast";
import CreateGraph from "./components/CreateGraph";
import NotFound from "./components/NotFound";
import GraphDetails from "./components/GraphDetails";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateGraph />} />
          <Route path="about" element={<About />} />
          <Route path="graph/:id" element={<GraphDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
