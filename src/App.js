 
import Home from './components/Home';
import './App.css';
import { Route, Routes, BrowserRouter, Link  } from 'react-router-dom';
import { OpEdit } from './components/OpEdit';
import NotFoundPage from './components/NotFoundPage';
import { OpCreate } from './components/OpCreate';
import TopBar from './TopBar';


function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <TopBar/> 
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/operation/edit/:id' element={<OpEdit/>} />
      <Route path='/operation/create' element={<OpCreate/>} />
      <Route path='*' element={<NotFoundPage/>} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
