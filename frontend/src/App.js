
import './App.css';
import LandingPage from './components/LandingPage';
import FileUpload from './components/FileUpload';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Track from './components/Track.js';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/track' element={<Track/>}/>
          <Route path='/upload' element={<FileUpload/>}/>
          <Route path='/backend_data' element={<Menu/>}></Route>
          
        </Routes>
      </BrowserRouter>
      </header>
      
    </div>
  );
}

export default App;
