import { AuthProvider } from "./contexts/AuthContext";
import Login from "./login";
import Register from './register';
import Dashboard from './Dashboard'; // Import the Dashboard component
import { Route, Routes, BrowserRouter} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
