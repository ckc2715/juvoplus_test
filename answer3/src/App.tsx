import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthForm } from "./pages/AuthForm";
import { ProductSearch } from "./pages/ProductSearch";
import { PrivateRoute } from "./routes/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <ProductSearch />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Router>
  );
}

export default App;
