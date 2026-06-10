import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/board'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await signIn(email, password)
        navigate(from, { replace: true })
      } else {
        if (!nickname.trim()) {
          setError('닉네임을 입력해주세요.')
          setLoading(false)
          return
        }
        await signUp(email, password, nickname)
        setMessage('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.')
      }
    } catch (err) {
      const msg = err.message
      if (msg.includes('Invalid login credentials')) setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      else if (msg.includes('User already registered')) setError('이미 가입된 이메일입니다.')
      else if (msg.includes('Password should be')) setError('비밀번호는 6자 이상이어야 합니다.')
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center section-x py-16">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black tracking-widest uppercase text-center mb-8 text-neutral-900 dark:text-okrr-cloud">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </h1>

        {/* Tab */}
        <div className="flex border-b border-okrr-nimbus/40 dark:border-dark-border mb-8">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); setMessage('') }}
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'border-b-2 border-neutral-900 dark:border-okrr-cloud text-neutral-900 dark:text-okrr-cloud'
                : 'text-neutral-400 dark:text-dark-muted hover:text-neutral-700 dark:hover:text-okrr-cloud'
            }`}
          >
            로그인
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

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
          {message && (
            <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
          )}

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
