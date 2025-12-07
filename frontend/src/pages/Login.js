import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const canvasRef = useRef(null)

    useEffect(() => {
        // resize canvas if present
        const canvas = canvasRef.current
        if (!canvas) return
        function onResize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        onResize()
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const apiBase = process.env.REACT_APP_API_BASE || '';
            const url = `${apiBase}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                // trigger confetti celebration before redirecting
                launchConfetti()
                // give a short moment for celebration, then redirect
                setTimeout(() => {
                    navigate('/home')
                }, 1200)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container'>
            <canvas
                ref={canvasRef}
                style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
            />
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Does't have an account ?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

// Simple canvas confetti function (shared lightweight implementation)
function launchConfetti() {
    try {
        const canvas = document.querySelector('canvas')
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
                p.vy += 0.05
                p.rot += p.vr
                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate((p.rot * Math.PI) / 180)
                ctx.fillStyle = p.color
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
                ctx.restore()
            })
            if (Date.now() - start < 3500) raf = requestAnimationFrame(draw)
            else ctx.clearRect(0, 0, w, h)
        }

        draw()
        setTimeout(() => {
            cancelAnimationFrame(raf)
            if (ctx) ctx.clearRect(0, 0, w, h)
        }, 4000)
    } catch (err) {
        // fail silently
        console.error('Confetti error', err)
    }
}

export default Login
