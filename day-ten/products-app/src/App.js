import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Product from './components/Product';
import Products from './components/Products';

{/* <Routes>
        <Route path='/products' element={<Products />}/>
      </Routes> */}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:id' element={<Product/>}/>
      </Routes>
    </Router>
  );
}

export default App;
