import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { ReactionPage } from '@/pages/Reaction';
import { PuzzlePage } from '@/pages/Puzzle';
import { MemoryPage } from '@/pages/Memory';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reaction" element={<ReactionPage />} />
        <Route path="/puzzle" element={<PuzzlePage />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
