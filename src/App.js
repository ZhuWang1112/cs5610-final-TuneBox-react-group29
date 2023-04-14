import './App.css';
import React, { useEffect } from "react";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import NavBar from './components/NavBar';
import Home from './pages/homePage/Home';
import Register from './pages/Register';
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SideBar from "./components/SideBar";
import Premium from "./pages/Premium";
import Admin from "./pages/Admin";
import Playlist from "./pages/Playlist";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import AllHotArtist from "./pages/homePage/AllHotArtist";
import AllHotAlbum from "./pages/homePage/AllHotAlbum";
import LikeSongDetail from "./components/LikeSongs/LikeSongDetail";
import axios from "axios";

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
              <Route path="/profile/:uid" element={<Profile />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/playlist/:id" element={<Playlist />} />
              <Route path="/hot/artist/all" element={<AllHotArtist />} />
              <Route path="/hot/album/all" element={<AllHotAlbum />} />
              <Route path="/song/:uid" element={<LikeSongDetail />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
