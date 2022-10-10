import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import Cart from './components/Cart';

function App() {
  return (
    <Router >
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
