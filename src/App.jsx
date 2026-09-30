import { useEffect, useState } from 'react'
import './App.css'

const pipeline = [
  ['1', 'Push main', 'Code React được push lên nhánh main'],
  ['2', 'Build', 'GitHub Actions chạy npm ci và npm run build'],
  ['3', 'Sync', 'HTML và assets được chép vào Laravel'],
  ['4', 'Commit', 'Bản build mới được push lên main của backend'],
]

function App() {
  const [api, setApi] = useState({ state: 'loading', message: 'Đang kết nối...' })

  useEffect(() => {
    fetch('/api/status')
      .then((response) => {
        if (!response.ok) throw new Error('API không phản hồi')
        return response.json()
      })
      .then((data) => setApi({ state: 'ok', message: data.message }))
      .catch(() => setApi({ state: 'offline', message: 'Chạy qua Laravel để kiểm tra kết nối API' }))
  }, [])

  return (
    <main>
      <section className="hero">
        <span className="eyebrow">CI/CD DEMO · REACT + LARAVEL</span>
        <h1>Một lần push.<br />Hai ứng dụng đồng bộ.</h1>
        <p className="intro">Frontend được build tự động và phát hành vào Laravel bằng GitHub Actions.</p>
        <div className={`status ${api.state}`}><span className="dot" /><span>Backend API: {api.message}</span></div>
      </section>
      <section className="pipeline" aria-label="Quy trình CI/CD">
        {pipeline.map(([number, title, detail], index) => (
          <article className="step" key={number}>
            <div className="step-head"><span className="number">{number}</span>{index < pipeline.length - 1 && <span className="line" />}</div>
            <h2>{title}</h2><p>{detail}</p>
          </article>
        ))}
      </section>
      <footer><span>Frontend: React + Vite</span><span>Backend: Laravel</span><span>Automation: GitHub Actions 1</span></footer>
    </main>
  )
}

export default App
