export default function Artists() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
          Our Artists
        </p>
        <h1 className="mb-6 text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
          협력 작가
        </h1>
        <div className="mt-12 flex flex-col items-center gap-6 py-20 text-center rounded-3xl bg-white dark:bg-dark-surface border border-okrr-nimbus/30 dark:border-dark-border">
          <p className="text-6xl font-black text-neutral-900 dark:text-okrr-cloud md:text-8xl">
            100+
          </p>
          <p className="text-lg font-semibold text-neutral-500 dark:text-dark-muted">
            함께하는 협력 작가
          </p>
          <p className="max-w-md text-sm leading-7 text-neutral-400 dark:text-dark-muted">
            신진 아티스트부터 유명 작가까지, 국내외 다양한 장르의<br />
            100명 이상의 협력 작가와 함께합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-xl">
            {['회화', '조각', '설치미술', '미디어아트', '서예', '팝아트', '스트리트아트', '공공미술', '사진'].map((g) => (
              <span
                key={g}
                className="tag bg-okrr-nimbus/30 dark:bg-dark-bg text-neutral-600 dark:text-dark-muted border border-okrr-nimbus/40 dark:border-dark-border"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
