import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PredictionPage from "./pages/PredictionPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/predict" element={<PredictionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
