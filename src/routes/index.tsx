import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../screens";
import {TasksDetailsPage} from  "../screens";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/task/:id" element={<TasksDetailsPage/>} /> {/* Route for book details */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
