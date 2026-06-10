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

const REST_API_KEY = '2aa437aa7e2387b873cb814075ebf2c3'
const REDIRECT_URI = 'https://lsm5735.github.io/04/'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return children
}

function KakaoHandler() {
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (!code) return

    // URL 즉시 정리 (뒤로가기 방지)
    window.history.replaceState({}, '', window.location.pathname)

    ;(async () => {
      try {
        // 1. 코드 → 토큰
        const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code,
          }),
        })
        const { access_token } = await tokenRes.json()
        if (!access_token) return navigate('/login')

        // 2. 사용자 정보
        const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        const userData = await userRes.json()
        const kakaoId  = userData.id
        const nickname = userData.kakao_account?.profile?.nickname
          || userData.properties?.nickname || '카카오사용자'

        // 3. Supabase 로그인/가입
        const email = `kakao${kakaoId}@kakaouser.com`
        const pw    = btoa(`okrr_${kakaoId}_2026`).slice(0, 32)

        let { data, error } = await supabase.auth.signInWithPassword({ email, password: pw })
        if (error) {
          const signup = await supabase.auth.signUp({
            email, password: pw,
            options: { data: { nickname, provider: 'kakao' } },
          })
          data  = signup.data
          error = signup.error
        }

        if (!error && data.session) {
          navigate('/board/free', { replace: true })
        } else {
          navigate('/login')
        }
      } catch {
        navigate('/login')
      }
    })()
  }, [])

  return null
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
