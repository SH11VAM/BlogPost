import conf from "./config/config";
import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authservice from "./appwrite/auth";
import { login, logout } from "./store/authslice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (authservice.getcurrentUser) {
      authservice.getcurrentUser().then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      });
    }

    setLoading(false);
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-slate-300 flex flex-wrap content-between ">
      <div className=" w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <h1>...... loading</h1>
  );
}

export default App;
