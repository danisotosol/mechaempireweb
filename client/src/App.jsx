import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'

function App() {
    return (
        <div>
            <nav className="p-4 bg-gray-200">
                <Link to="/" className="mr-4">Home</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
