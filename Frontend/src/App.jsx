import "./App.css";
import Table from "./pages/Table";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./utils/Dashboard";
import NavBar from "./utils/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Dashboard />}>
              <Route index element={<WelcomePage />}></Route>
              <Route exact path="welcome" element={<WelcomePage />}></Route>
              <Route exact path="table" element={<Table />}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
