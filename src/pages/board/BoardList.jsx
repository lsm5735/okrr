import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'

export default function BoardList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const PAGE_SIZE = 15

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [page])

  const fetchPosts = async () => {
    setLoading(true)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, error, count } = await supabase
      .from('posts')
      .select('id, title, author_name, views, created_at, comments(count)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) {
      setPosts(data)
      setTotal(count)
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <section className="min-h-[calc(100vh-4rem)] section-x py-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase mb-1">Community</p>
          <h1 className="text-3xl font-black tracking-widest uppercase text-neutral-900 dark:text-okrr-cloud">Board</h1>
        </div>
        {user && (
          <button
            onClick={() => navigate('/board/write')}
            className="bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 px-5 py-2 text-sm font-bold tracking-widest uppercase rounded hover:bg-neutral-700 dark:hover:bg-okrr-nimbus transition-colors"
          >
            글쓰기
          </button>
        )}
      </div>

      {/* Table */}
      <div className="border-t border-neutral-900 dark:border-okrr-cloud">
        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-4 py-3 border-b border-okrr-nimbus/40 dark:border-dark-border text-xs font-semibold text-neutral-400 dark:text-dark-muted uppercase tracking-widest">
          <span>제목</span>
          <span className="text-center">작성자</span>
          <span className="text-center">날짜</span>
          <span className="text-center">조회</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-neutral-400 dark:text-dark-muted">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center text-sm text-neutral-400 dark:text-dark-muted">첫 번째 글을 작성해보세요.</div>
        ) : (
          posts.map((post) => {
            const commentCount = post.comments?.[0]?.count ?? 0
            return (
              <div
                key={post.id}
                className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr_1fr] gap-1 sm:gap-4 py-3.5 border-b border-okrr-nimbus/20 dark:border-dark-border hover:bg-black/[.02] dark:hover:bg-white/[.02] transition-colors"
              >
                <Link
                  to={`/board/${post.id}`}
                  className="text-sm font-medium text-neutral-900 dark:text-okrr-cloud hover:underline truncate"
                >
                  {post.title}
                  {commentCount > 0 && (
                    <span className="ml-1.5 text-xs text-neutral-400 dark:text-dark-muted">[{commentCount}]</span>
                  )}
                </Link>
                <span className="text-xs text-neutral-500 dark:text-dark-muted sm:text-center truncate">
                  {post.author_name || '익명'}
                </span>
                <span className="text-xs text-neutral-400 dark:text-dark-muted sm:text-center">
                  {formatDate(post.created_at)}
                </span>
                <span className="text-xs text-neutral-400 dark:text-dark-muted sm:text-center">
                  {post.views}
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 text-sm rounded transition-colors ${
                p === page
                  ? 'bg-neutral-900 dark:bg-okrr-cloud text-okrr-cloud dark:text-neutral-900 font-bold'
                  : 'text-neutral-500 dark:text-dark-muted hover:bg-black/[.05] dark:hover:bg-white/[.05]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {!user && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-dark-muted">
          글을 작성하려면{' '}
          <Link to="/login" state={{ from: '/board' }} className="underline hover:text-neutral-900 dark:hover:text-okrr-cloud">
            로그인
          </Link>
          이 필요합니다.
        </p>
      )}
    </section>
  )
}
