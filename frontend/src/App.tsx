import { BrowserRouter, Route, Routes } from "react-router-dom";
import DBTable from "./pages/DatabaseTable";
import Page from "./pages/Page";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <div className=" flex min-h-screen justify-center items-center overflow-hidden py-8 bg-grad">
        <Routes>
          <Route path="/" element={<DBTable />} />
          <Route path="/page/:id" element={<Page />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
