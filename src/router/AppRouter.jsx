import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Movie-App" element={<Main />} />
        <Route path="/Movie-App/login" element={<Login />} />
        <Route path="/Movie-App/register" element={<Register />} />
        <Route path="/Movie-App/favorites" element={<Favorites />} />

        <Route path="/Movie-App/favorites" element={<PrivateRouter />}>
          <Route path="" element={<Favorites />} />
        </Route>
        <Route path="/Movie-App/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
