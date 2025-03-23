import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RecipesScreen from "./screens/RecipesScreen";
import SourcesScreen from "./screens/SourcesScreen";
import RecipeEditScreen from "./screens/RecipeEditScreen";
import SourceEditScreen from "./screens/SourceEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/recipes" element={<RecipesScreen />} />
            <Route path="/recipes/:id/edit" element={<RecipeEditScreen />} />
            <Route path="/recipes/create" element={<RecipeEditScreen />} />
            <Route path="/sources" element={<SourcesScreen />} />
            <Route path="/sources/:id/edit" element={<SourceEditScreen />} />
            <Route path="/sources/create" element={<SourceEditScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
