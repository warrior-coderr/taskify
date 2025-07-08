import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import { onUserChange } from './firebaseService';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const unsub = onUserChange(u => {
      setUser(u);
      setLoading(false);

      if (!u) {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg animate-pulse">
        Loading...
      </p>
    );
  }

  if (!user && showWelcome) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-800 text-white text-center px-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-pulse">
            Welcome to Taskifyy 💼
          </h1>
          <p className="text-lg sm:text-xl font-medium">
            Please login or sign up to continue
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}
