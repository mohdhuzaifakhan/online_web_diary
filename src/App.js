import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Entry from './Entry'
import Error404 from './Error404';
import MyVideo from './Pages/MyVideo'
import MyPhotos from './Pages/MyPhotos'
import MyNotes from './Pages/MyNotes'
import MyDocuments from './Pages/MyDocuments'
import Profile from "./Pages/Profile"



function App() {
  
  return (
      <BrowserRouter>
        <Routes>         
            <Route exact path="/" element={<Entry/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route path="/notes" element={<MyNotes/>}/>
            <Route exact path="/home" element={<Home/>} />
            <Route path="/videos" element={<MyVideo/>}/>
            <Route path="/photos" element={<MyPhotos/>}/>
            <Route path="/documents" element={<MyDocuments/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;