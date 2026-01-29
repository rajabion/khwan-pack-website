import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import QuoteReview from './pages/QuoteReview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="quote-review" element={<QuoteReview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
