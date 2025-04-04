// components/MovieFilter.tsx
import { useState, useEffect } from 'react';
import type { Movie } from '../../../backend/src/entities/Movie';

interface Props {
  onFilter: (platform: string, genre: number | null) => void;
}

export default function MovieFilter({ onFilter }: Props) {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<{id: number, name: string}[]>([]);

  useEffect(() => {
    // Busca opções de filtro
    fetch('/api/providers').then(res => res.json()).then(setPlatforms);
    fetch('/api/genres').then(res => res.json()).then(setGenres);
  }, []);

  return (
    <div className="filters">
      <select onChange={(e) => onFilter(e.target.value, null)}>
        <option value="">Todas plataformas</option>
        {platforms.map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select onChange={(e) => onFilter('', Number(e.target.value))}>
        <option value="">Todos gêneros</option>
        {genres.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
    </div>
  );
}