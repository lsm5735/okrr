import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import Videos from './pages/Videos'
import Projects from './pages/Projects'
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

          <Route path="/projects" element={<Projects />} />

          <Route path="/works" element={<Navigate to="/works/all" replace />} />
          <Route path="/works/film" element={<Navigate to="/works/film/all" replace />} />
          <Route path="/works/film/:category" element={<Videos />} />
          <Route path="/works/:category" element={<Works />} />

          {/* 예전 Videos 주소 → Works 하위 Film & Media로 이동 */}
          <Route path="/videos" element={<Navigate to="/works/film/all" replace />} />
          <Route path="/videos/:category" element={<Navigate to="/works/film/all" replace />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
