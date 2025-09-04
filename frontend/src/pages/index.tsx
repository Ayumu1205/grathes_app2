
export default function Home() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(/hero.jpg)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">GraPlan</h1>
            <p className="mb-5">
              「GradNote」は、大学生の最後の関門となる卒業論文・修士論文の執筆管理をサポートします！
            </p>
            <button className="btn btn-primary">執筆をはじめる！</button>
          </div>
        </div>
      </div>
    </>
  )
}
