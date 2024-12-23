import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const routes = (
  <Router>
    <Routes>
      <Route path="/" extact element={<Home />} />
      <Route path="/dashboard" extact element={<Home />} />
      <Route path="/login" extact element={<Login />} />
      <Route path="/signup" extact element={<Signup />} />
    </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>;
};
export default App;
