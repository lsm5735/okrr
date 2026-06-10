import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function BoardWrite() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')

    const nickname = user.user_metadata?.nickname || user.email.split('@')[0]
    const { data, error: err } = await supabase
      .from('posts')
      .insert({ title: title.trim(), content: content.trim(), user_id: user.id, author_name: nickname })
      .select('id')
      .single()

    if (err) {
      setError('글 작성 중 오류가 발생했습니다.')
      setLoading(false)
      return
    }
    navigate(`/board/${data.id}`)
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] section-x py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase mb-1">Community</p>
        <h1 className="text-3xl font-black tracking-widest uppercase text-neutral-900 dark:text-okrr-cloud">Write</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
            maxLength={100}
            className="w-full border-b border-neutral-900 dark:border-okrr-cloud bg-transparent py-3 text-lg font-semibold text-neutral-900 dark:text-okrr-cloud placeholder-neutral-300 dark:placeholder-dark-muted focus:outline-none"
          />
        </div>

        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={16}
            className="w-full border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-4 py-3 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/board')}
            className="px-5 py-2.5 text-sm font-semibold text-neutral-500 dark:text-dark-muted border border-okrr-nimbus/50 dark:border-dark-border rounded hover:bg-black/[.04] dark:hover:bg-white/[.04] transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold tracking-widest uppercase bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 rounded hover:bg-neutral-700 dark:hover:bg-okrr-nimbus transition-colors disabled:opacity-50"
          >
            {loading ? '등록 중...' : '등록'}
          </button>
        </div>
      </form>
    </section>
  )
}
