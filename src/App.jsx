import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
import Login from './pages/Login'
import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'
import BoardWrite from './pages/board/BoardWrite'
import BoardEdit from './pages/board/BoardEdit'
import { useAuth } from './context/AuthContext'
import { supabase } from './lib/supabase'

function KakaoHandler() {
  const navigate = useNavigate()
  useEffect(() => {
    const token = sessionStorage.getItem('kakao_token')
    if (!token) return
    sessionStorage.removeItem('kakao_token')
    ;(async () => {
      try {
        const res  = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const info     = await res.json()
        const kakaoId  = info.id
        const nickname = info.kakao_account?.profile?.nickname || info.properties?.nickname || '카카오사용자'
        const email    = `kakao${kakaoId}@kakaouser.com`
        const pw       = btoa(`okrr_${kakaoId}_2026`).slice(0, 32)

        let { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
        if (error) {
          const s = await supabase.auth.signUp({ email, password: pw, options: { data: { nickname, provider: 'kakao' } } })
          data = s.data; error = s.error
        }
        if (!error && data.session) navigate('/board/free', { replace: true })
      } catch { /* 실패 시 홈 유지 */ }
    })()
  }, [])
  return null
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <div className="min-w-[320px]">
      <KakaoHandler />
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
          <Route path="/login" element={<Login />} />

          <Route path="/board" element={<Navigate to="/board/free" replace />} />
          <Route path="/board/:category" element={<BoardList />} />
          <Route path="/board/:category/write" element={<PrivateRoute><BoardWrite /></PrivateRoute>} />
          <Route path="/board/:category/edit/:id" element={<PrivateRoute><BoardEdit /></PrivateRoute>} />
          <Route path="/board/:category/:id" element={<BoardDetail />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
