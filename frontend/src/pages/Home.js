import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('')
    const navigate = useNavigate()
    const canvasRef = useRef(null)

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || '')
    }, [])

    useEffect(() => {
        // Run confetti once when user is present
        if (loggedInUser) launchConfetti()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    // Simple canvas confetti — no external deps
    function launchConfetti() {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const w = (canvas.width = window.innerWidth)
        const h = (canvas.height = window.innerHeight)
        const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93']
        const particles = []
        const count = Math.floor(Math.min(120, w / 8))

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * -h,
                w: 6 + Math.random() * 10,
                h: 6 + Math.random() * 10,
                vx: -2 + Math.random() * 4,
                vy: 2 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                vr: -5 + Math.random() * 10
            })
        }

        let raf
        const start = Date.now()

        function draw() {
            ctx.clearRect(0, 0, w, h)
            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy
                p.vy += 0.05 // gravity
                p.rot += p.vr
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate((p.rot * Math.PI) / 180)
                ctx.fillStyle = p.color
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
                ctx.restore()
            })
            // stop after ~3.5s
            if (Date.now() - start < 3500) raf = requestAnimationFrame(draw)
            else ctx.clearRect(0, 0, w, h)
        }

        draw()
        // cleanup after 4s
        setTimeout(() => {
            cancelAnimationFrame(raf)
            if (ctx) ctx.clearRect(0, 0, w, h)
        }, 4000)
    }

    return (
        <div className="container">
            <canvas
                ref={canvasRef}
                style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
            />
            <h1>Welcome {loggedInUser || 'User'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
