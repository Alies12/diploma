import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Programs from './pages/Programs';
import Schedule from './pages/Schedule';
import Reviews from './pages/Reviews';
import Contacts from './pages/Contacts';
import Auth from './pages/Auth';
import PersonalCabinet from './pages/PersonalCabinet';
import News from './pages/News';
import { DataProvider } from './DataContext';
import ProtectedRoute from './components/ProtectedRoute'; // Импортируйте ProtectedRoute

function App() {
  return (
    <Router>
      <DataProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/news" element={<News />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/cabinet"
                element={
                  <ProtectedRoute>
                    <PersonalCabinet />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;