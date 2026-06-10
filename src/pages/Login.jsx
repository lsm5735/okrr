import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [mode, setMode]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError]       = useState('')
  const [message, setMessage]   = useState('')
  const [loading, setLoading]   = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from || '/board/free'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
        navigate(from, { replace: true })
      } else {
        if (!nickname.trim()) { setError('닉네임을 입력해주세요.'); setLoading(false); return }
        await signUp(email, password, nickname)
        setMessage('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.')
      }
    } catch (err) {
      const msg = err.message
      if (msg.includes('Invalid login credentials')) setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      else if (msg.includes('User already registered'))  setError('이미 가입된 이메일입니다.')
      else if (msg.includes('Password should be'))       setError('비밀번호는 6자 이상이어야 합니다.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleKakao = async () => {
    setError('')
    try {
      const Kakao = window.Kakao
      if (!Kakao) { setError('카카오 SDK 로딩 실패'); return }
      if (!Kakao.isInitialized()) {
        Kakao.init('5a37f4dbb140908763aee8aff7536bac')
      }

      Kakao.Auth.login({
        scope: 'profile_nickname,profile_image',
        success: async (authObj) => {
          try {
            // 카카오 사용자 정보 조회
            Kakao.API.request({
              url: '/v2/user/me',
              success: async (res) => {
                const kakaoId   = res.id
                const nickname  = res.kakao_account?.profile?.nickname || '카카오사용자'
                // 카카오 ID 기반 Supabase 계정 생성/로그인
                const fakeEmail = `kakao_${kakaoId}@okrr.kakao`
                const fakePw    = btoa(`okrr_kakao_${kakaoId}_2026`).slice(0, 32)

                let result = await supabase.auth.signInWithPassword({
                  email: fakeEmail,
                  password: fakePw,
                })

                if (result.error) {
                  // 첫 로그인 — 계정 생성
                  result = await supabase.auth.signUp({
                    email: fakeEmail,
                    password: fakePw,
                    options: { data: { nickname, provider: 'kakao' } },
                  })
                }

                if (result.error) {
                  setError('카카오 로그인 처리 중 오류가 발생했습니다.')
                } else {
                  navigate(from, { replace: true })
                }
              },
              fail: () => setError('카카오 사용자 정보를 가져올 수 없습니다.'),
            })
          } catch {
            setError('카카오 로그인 처리 중 오류가 발생했습니다.')
          }
        },
        fail: (err) => {
          if (err?.error !== 'access_denied') {
            setError('카카오 로그인에 실패했습니다.')
          }
        },
      })
    } catch {
      setError('카카오 로그인을 시작할 수 없습니다.')
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center section-x py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black tracking-widest uppercase text-center mb-8 text-neutral-900 dark:text-okrr-cloud">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </h1>

        {/* Kakao login */}
        <button
          type="button"
          onClick={handleKakao}
          className="w-full flex items-center justify-center gap-3 bg-[#FEE500] hover:bg-[#F6DC00] text-[#191919] font-bold text-sm py-3 rounded transition-colors mb-6"
        >
          {/* Kakao mark */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9 0.5C4.306 0.5 0.5 3.468 0.5 7.125c0 2.36 1.558 4.432 3.91 5.607L3.37 15.9a.3.3 0 0 0 .437.332L7.99 13.64c.33.04.667.06 1.01.06 4.694 0 8.5-2.968 8.5-6.625C17.5 3.468 13.694.5 9 .5z" fill="#191919"/>
          </svg>
          카카오로 로그인
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-okrr-nimbus/40 dark:bg-dark-border" />
          <span className="text-xs text-neutral-400 dark:text-dark-muted">또는</span>
          <div className="flex-1 h-px bg-okrr-nimbus/40 dark:bg-dark-border" />
        </div>

        {/* Tab */}
        <div className="flex border-b border-okrr-nimbus/40 dark:border-dark-border mb-6">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setMessage('') }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-neutral-900 dark:border-okrr-cloud text-neutral-900 dark:text-okrr-cloud'
                : 'text-neutral-400 dark:text-dark-muted hover:text-neutral-700 dark:hover:text-okrr-cloud'
            }`}
          >
            이메일 로그인
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); setMessage('') }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              mode === 'signup'
                ? 'border-b-2 border-neutral-900 dark:border-okrr-cloud text-neutral-900 dark:text-okrr-cloud'
                : 'text-neutral-400 dark:text-dark-muted hover:text-neutral-700 dark:hover:text-okrr-cloud'
            }`}
          >
            회원가입
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-neutral-500 dark:text-dark-muted mb-1.5">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="사용할 닉네임"
                className="w-full border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-3 py-2.5 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-500 dark:text-dark-muted mb-1.5">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-3 py-2.5 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-500 dark:text-dark-muted mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상"
              className="w-full border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-3 py-2.5 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors"
              required
            />
          </div>

          {error   && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 py-2.5 text-sm font-bold tracking-widest uppercase rounded hover:bg-neutral-700 dark:hover:bg-okrr-nimbus transition-colors disabled:opacity-50"
          >
            {loading ? '처리 중...' : mode === 'login' ? '로그인' : '가입하기'}
          </button>
        </form>
      </div>
    </section>
  )
}
