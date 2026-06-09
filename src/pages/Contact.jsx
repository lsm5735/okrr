import { useState } from 'react'
import { company } from '../data/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:${company.contact.email}?subject=${encodeURIComponent(form.subject || '문의합니다')}&body=${encodeURIComponent(
      `이름: ${form.name}\n이메일: ${form.email}\n\n${form.message}`,
    )}`
    window.open(mailto)
    setSent(true)
  }

  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
          Get in Touch
        </p>
        <h1 className="mb-4 text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
          Contact
        </h1>
        <p className="mb-16 max-w-xl text-base leading-8 text-neutral-500 dark:text-dark-muted">
          프로젝트 협업, 전시 기획, 아트 컨설팅 등 다양한 문의를 환영합니다.
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div className="card-base p-8 flex flex-col gap-5">
              {[
                { label: 'Email', value: company.contact.email, href: `mailto:${company.contact.email}` },
                { label: 'Tel', value: company.contact.tel, href: `tel:${company.contact.tel.replace(/\s/g, '')}` },
              ].map((c) => (
                <div key={c.label}>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-dark-muted">
                    {c.label}
                  </p>
                  <a
                    href={c.href}
                    className="text-lg font-semibold text-neutral-900 dark:text-okrr-cloud hover:opacity-70 transition"
                  >
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-okrr-rose/20 dark:bg-dark-surface border border-okrr-rose/30 dark:border-dark-border p-8">
              <p className="mb-2 text-sm font-bold text-neutral-900 dark:text-okrr-cloud">
                Okrr Art Agency
              </p>
              <p className="text-sm leading-7 text-neutral-500 dark:text-dark-muted">
                문화예술 프로젝트 기획 및 컨설팅<br />
                전시 기획 · 아티스트 에이전시 · 아트 컨설팅
              </p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="card-base p-10 flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-5xl">✉</span>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-okrr-cloud">
                문의가 접수되었습니다
              </h3>
              <p className="text-sm text-neutral-500 dark:text-dark-muted">
                이메일 클라이언트가 열렸습니다. 빠른 시일 내에 답변 드리겠습니다.
              </p>
              <button
                type="button"
                className="btn-outline mt-4"
                onClick={() => setSent(false)}
              >
                다시 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-base p-8 flex flex-col gap-5">
              {[
                { name: 'name', label: '이름', type: 'text', placeholder: '성함을 입력해 주세요', required: true },
                { name: 'email', label: '이메일', type: 'email', placeholder: 'email@example.com', required: true },
                { name: 'subject', label: '제목', type: 'text', placeholder: '문의 제목', required: false },
              ].map((f) => (
                <div key={f.name}>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-dark-muted">
                    {f.label} {f.required && <span className="text-okrr-rose">*</span>}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required={f.required}
                    className="w-full rounded-xl border border-okrr-nimbus/40 dark:border-dark-border bg-transparent px-4 py-3 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-300 dark:placeholder-dark-muted focus:border-neutral-400 dark:focus:border-dark-muted focus:outline-none transition"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-dark-muted">
                  문의 내용 <span className="text-okrr-rose">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="문의 내용을 입력해 주세요"
                  className="w-full rounded-xl border border-okrr-nimbus/40 dark:border-dark-border bg-transparent px-4 py-3 text-sm text-neutral-900 dark:text-okrr-cloud placeholder-neutral-300 dark:placeholder-dark-muted focus:border-neutral-400 dark:focus:border-dark-muted focus:outline-none resize-none transition"
                />
              </div>
              <button type="submit" className="btn-primary justify-center w-full py-4 mt-2">
                문의하기 →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
