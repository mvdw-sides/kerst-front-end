import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import './styles/App.css';
import axios from 'axios';
import SelectUser from './Pages/select';
import User from './Pages/user';
import Overview from './Pages/overview';
import Auth from './Pages/auth';

export default function App(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUserState] = useState(null);
  const [auth, setAuth] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('pw');
    if (stored) {
      setAuth(stored);
    }
  }, []);

  const req = useMemo(() => {
    return axios.create({
      baseURL: props.base,
      headers: { common: { Authorization: auth } }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const getUsers = useCallback(async () => {
    try {
      const response = await req.get(`/users`);
      setUsers(response.data);
      setMessage(null);
    } catch (e) {
      localStorage.removeItem('pw');
      setAuth(null);
      setMessage(auth ? 'verkeerde wachtwoord' : '');
    }
  }, [req, auth]);

  useEffect(() => {
    if (auth) {
      getUsers();
    }
  }, [auth, getUsers]);

  const setPass = async (pw) => {
    localStorage.setItem('pw', pw);
    setAuth(pw);
  };

  const logout = () => {
    if (window.confirm('Weet je zeker dat je wilt uitloggen?')) {
      localStorage.removeItem('pw');
      setAuth(null);
      setUserState(null);
      setUsers([]);
      setMessage(null);
    }
  };

  const setUser = (selectedUser) => {
    setUserState(selectedUser);
    navigate(`/user/${selectedUser._id}`);
  };

  const required = (field) => {
    if (!field) {
      navigate(`/`);
      return false;
    }
    return true;
  };

  const error = message ? (<h5 style={{color:'red', textAlign: 'center'}}>{message}</h5>) : null;
  const menu = user ? (
    <div className="menu">
      <NavLink to="/overview" className={({isActive}) => isActive ? 'active' : undefined}>Overzicht</NavLink>
      <NavLink to={`/user/${user._id}`} className={({isActive}) => isActive ? 'active' : undefined}>Mijn lijstje</NavLink>
      <NavLink to="/" className={({isActive}) => isActive ? 'active' : undefined}>Andere gebruiker</NavLink>
    </div>
  ) : null;

  return (
    <div className="App">
      <header className="header">
        <h2>📝 <br /> kerst wens lijstjes</h2>
        { menu }
      </header>
      { error }
      { !auth ? <Auth {...props} setPass={setPass}/> : (
        <>
          <Routes>
            <Route path="/" element={<SelectUser {...props} req={req} users={users} setUser={setUser}/>} />
            <Route path="/user/:userId" element={<User {...props} req={req} required={required} users={users} user={user}/>} />
            <Route path="/overview" element={<Overview {...props} req={req} required={required} users={users} user={user}/>} />
          </Routes>
          <div className="logout-container">
            <button className="logout-button" onClick={logout}>
              🚪 Uitloggen
            </button>
          </div>
        </>
      )}
    </div>
  );
}
