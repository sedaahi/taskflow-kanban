import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import BoardPage from "./pages/BoardPage";
import AllTasksPage from "./pages/AllTasksPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<BoardPage />} />
        <Route path="/tasks" element={<AllTasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;