import './App.css';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from './pages/Search';
import SideBar from './components/SideBar';
import Premium from './pages/Premium';
import Admin from './pages/Admin';
import Playlist from "./pages/Playlist";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "./reducers/playlist-reducer";

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={"row bg"}>
          <div className={"col-2 pe-0"}>
            <SideBar />
          </div>
          <div className={"col p-0 m-0"}>
            <NavBar />
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/playlist/:username/:id" element={<Playlist />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
