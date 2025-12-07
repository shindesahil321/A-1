import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser') || '')
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        navigate('/login')
    }

    return (
        <div className="container">
            <h1>Welcome {loggedInUser || 'User'}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home
