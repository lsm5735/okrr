import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

const CATEGORY_LABEL = { notice: '공지사항', free: '자유게시판', qna: 'Q&A' }

export default function BoardDetail() {
  const { category = 'free', id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [post, setPost]           = useState(null)
  const [comments, setComments]   = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading]     = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [id])

  const fetchPost = async () => {
    await supabase.rpc('increment_views', { post_id: parseInt(id) })
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    if (error || !data) { navigate(`/board/${category}`); return }
    setPost(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await supabase.from('posts').delete().eq('id', id)
    navigate(`/board/${category}`)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    setSubmitting(true)
    const nickname = user.user_metadata?.nickname || user.user_metadata?.full_name || user.email.split('@')[0]
    const { error } = await supabase.from('comments').insert({
      post_id: parseInt(id),
      user_id: user.id,
      content: commentText.trim(),
      author_name: nickname,
    })
    if (!error) { setCommentText(''); fetchComments() }
    setSubmitting(false)
  }

  const handleDeleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId)
    fetchComments()
  }

  const fmt = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-sm text-neutral-400 dark:text-dark-muted">불러오는 중...</p>
      </div>
    )
  }

  const isAuthor = user?.id === post.user_id

  return (
    <section className="min-h-[calc(100vh-4rem)] section-x py-16 max-w-4xl mx-auto">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-dark-muted mb-8">
        <Link to="/board/free" className="hover:text-neutral-900 dark:hover:text-okrr-cloud transition-colors uppercase tracking-widest font-semibold">Board</Link>
        <span>/</span>
        <Link to={`/board/${category}`} className="hover:text-neutral-900 dark:hover:text-okrr-cloud transition-colors">{CATEGORY_LABEL[category]}</Link>
      </div>

      {/* Post */}
      <div className="border-t border-neutral-900 dark:border-okrr-cloud">
        <div className="py-6 border-b border-okrr-nimbus/30 dark:border-dark-border">
          <div className="flex items-start gap-2 mb-3">
            {category === 'notice' && (
              <span className="mt-1 flex-shrink-0 text-xs font-bold bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 px-1.5 py-0.5 rounded">공지</span>
            )}
            <h1 className="text-xl font-bold text-neutral-900 dark:text-okrr-cloud">{post.title}</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-neutral-400 dark:text-dark-muted">
              <span>{post.author_name || '익명'}</span>
              <span>{fmt(post.created_at)}</span>
              <span>조회 {post.views}</span>
            </div>
            {isAuthor && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/board/${category}/edit/${post.id}`)}
                  className="text-xs text-neutral-500 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="py-8 min-h-[200px]">
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-okrr-cloud mb-4">
          댓글 {comments.length}
        </h2>

        {comments.length > 0 && (
          <div className="border-t border-okrr-nimbus/30 dark:border-dark-border mb-6">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start justify-between py-4 border-b border-okrr-nimbus/20 dark:border-dark-border">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-okrr-cloud">{c.author_name || '익명'}</span>
                    <span className="text-xs text-neutral-400 dark:text-dark-muted">{fmt(c.created_at)}</span>
                  </div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">{c.content}</p>
                </div>
                {user?.id === c.user_id && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="ml-4 text-xs text-neutral-300 dark:text-dark-muted hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {user ? (
          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요"
              rows={3}
              className="flex-1 border border-okrr-nimbus/50 dark:border-dark-border bg-transparent rounded px-3 py-2.5 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-400 dark:placeholder-dark-muted focus:outline-none focus:border-neutral-900 dark:focus:border-okrr-cloud transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="self-end bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 px-5 py-2.5 text-sm font-bold tracking-widest uppercase rounded hover:bg-neutral-700 dark:hover:bg-okrr-nimbus transition-colors disabled:opacity-40"
            >
              등록
            </button>
          </form>
        ) : (
          <p className="text-sm text-neutral-400 dark:text-dark-muted">
            댓글을 작성하려면{' '}
            <Link to="/login" state={{ from: `/board/${category}/${id}` }} className="underline hover:text-neutral-900 dark:hover:text-okrr-cloud">
              로그인
            </Link>
            이 필요합니다.
          </p>
        )}
      </div>
    </section>
  )
}
