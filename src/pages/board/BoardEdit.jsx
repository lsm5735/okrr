import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const CATEGORY_LABEL = { notice: '공지사항', free: '자유게시판', qna: 'Q&A' }

export default function BoardEdit() {
  const { category = 'free', id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [title, setTitle]     = useState('')
  const [content, setContent] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
      if (error || !data) { navigate(`/board/${category}`); return }
      if (data.user_id !== user?.id) { navigate(`/board/${category}`); return }
      setTitle(data.title)
      setContent(data.content)
      setFetching(false)
    }
    fetchPost()
  }, [id, user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 모두 입력해주세요.'); return }
    setLoading(true)
    setError('')

    const { error: err } = await supabase
      .from('posts')
      .update({ title: title.trim(), content: content.trim(), updated_at: new Date().toISOString() })
      .eq('id', id)

    if (err) { setError('수정 중 오류가 발생했습니다.'); setLoading(false); return }
    navigate(`/board/${category}/${id}`)
  }

  if (fetching) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-sm text-neutral-400 dark:text-dark-muted">불러오는 중...</p>
      </div>
    )
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] section-x py-16 max-w-4xl mx-auto">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase mb-1">
          {CATEGORY_LABEL[category]}
        </p>
        <h1 className="text-3xl font-black tracking-widest uppercase text-neutral-900 dark:text-okrr-cloud">Edit</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          maxLength={100}
          className="w-full border-b border-neutral-900 dark:border-okrr-cloud bg-transparent py-3 text-lg font-semibold text-neutral-900 dark:text-okrr-cloud placeholder-neutral-300 dark:placeholder-dark-muted focus:outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={16}
          className="w-full border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-4 py-3 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors resize-none"
        />

        {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/board/${category}/${id}`)}
            className="px-5 py-2.5 text-sm font-semibold text-neutral-500 dark:text-dark-muted border border-okrr-nimbus/50 dark:border-dark-border rounded hover:bg-black/[.04] dark:hover:bg-white/[.04] transition-colors"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm font-bold tracking-widest uppercase bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 rounded hover:bg-neutral-700 dark:hover:bg-okrr-nimbus transition-colors disabled:opacity-50"
          >
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </section>
  )
}
