
import Login from "./login";
import Register from './register';
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login}/>
          <Route exact path="/register" Component={Register}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
