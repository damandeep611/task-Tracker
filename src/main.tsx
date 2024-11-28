import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router";

import Navigation from "./components/customUI/Navigation.tsx";
import Landing from "./pages/LandingPage.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<App />} />
        </Routes>
      </main>
    </Router>
  </StrictMode>
);
