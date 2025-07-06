import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Stats from './pages/Stats';
import Profile from './pages/Profile';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}