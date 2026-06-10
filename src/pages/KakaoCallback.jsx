import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const REST_API_KEY = '2aa437aa7e2387b873cb814075ebf2c3'
const REDIRECT_URI = 'https://lsm5735.github.io/04/'

export default function KakaoCallback() {
  const [status, setStatus] = useState('카카오 로그인 처리 중...')
  const navigate = useNavigate()

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code')
    if (!code) { navigate('/login'); return }
    handleCallback(code)
  }, [])

  const handleCallback = async (code) => {
    try {
      // 1. 코드 → 액세스 토큰 교환
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
      const tokenData = await tokenRes.json()
      if (!tokenData.access_token) throw new Error('토큰 발급 실패')

      // 2. 사용자 정보 조회
      const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      })
      const userData = await userRes.json()
      const kakaoId  = userData.id
      const nickname = userData.kakao_account?.profile?.nickname
        || userData.properties?.nickname
        || '카카오사용자'

      // 3. Supabase 로그인/가입
      const fakeEmail = `kakao${kakaoId}@kakaouser.com`
      const fakePw    = btoa(`okrr_${kakaoId}_2026`).slice(0, 32)

      let { data, error } = await supabase.auth.signInWithPassword({ email: fakeEmail, password: fakePw })

      if (error) {
        const signup = await supabase.auth.signUp({
          email: fakeEmail,
          password: fakePw,
          options: { data: { nickname, provider: 'kakao' } },
        })
        data  = signup.data
        error = signup.error
      }

      if (error || !data.session) throw new Error(error?.message || '세션 없음')
      navigate('/board/free', { replace: true })

    } catch (err) {
      setStatus(`오류: ${err.message}`)
      setTimeout(() => navigate('/login'), 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-neutral-500 dark:text-dark-muted">{status}</p>
    </div>
  )
}
