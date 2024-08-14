import { BrowserRouter, Route, Routes } from "react-router-dom";
import Page from "./pages/BlogPost";
import Admin from "./pages/Admin";
function App() {
  return (
    <BrowserRouter>
      <div className=" flex min-h-screen justify-center items-center overflow-hidden py-8 bg-grad">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog/:id" element={<Page />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
