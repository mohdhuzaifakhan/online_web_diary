
import './App.css';
import Login from './Login';
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
            <Route exact path="/notes" element={<MyNotes/>}/>
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/videos" element={<MyVideo/>}/>
            <Route exact path="/photos" element={<MyPhotos/>}/>
            <Route exact path="/documents" element={<MyDocuments/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route path="/*" element={<Error404/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
