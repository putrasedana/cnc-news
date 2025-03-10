import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsPage from "./pages/NewsPage";
import SportPage from "./pages/SportPage";
import BusinessPage from "./pages/BusinessPage";
import SciencePage from "./pages/SciencePage";
import TechnologyPage from "./pages/TechnologyPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import HealthPage from "./pages/HealthPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:category/:id" element={<NewsDetailPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/sport" element={<SportPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/entertainment" element={<EntertainmentPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
