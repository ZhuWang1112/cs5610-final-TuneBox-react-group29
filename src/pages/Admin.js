import React from 'react'
import AdminNav from "../components/AdminComponents/AdminNav";
import {Route, Routes} from "react-router";
import AdminDashboard from "../components/AdminComponents/AdminDashBoard";
import AdminUsers from "../components/AdminComponents/AdminUsers";
import AdminPlaylists from "../components/AdminComponents/AdminPlaylists";

const Admin = () => {
  return (
      <div>
          <AdminNav/>
              <Routes>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/playlists" element={<AdminPlaylists />} />
              </Routes>
      </div>
  );
}


export default Admin