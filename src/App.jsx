import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Videos from './pages/Videos'
import Artists from './pages/Artists'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="min-w-[320px]">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<Navigate to="/about/intro" replace />} />
          <Route path="/about/:tab" element={<About />} />

          <Route path="/works" element={<Navigate to="/works/all" replace />} />
          <Route path="/works/:category" element={<Works />} />

          <Route path="/videos" element={<Navigate to="/videos/all" replace />} />
          <Route path="/videos/:category" element={<Videos />} />

          <Route path="/artists" element={<Artists />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
