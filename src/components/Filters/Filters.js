import './Filters.css'
import { fetchMaxMovies } from '../../services/Api';

export const searchMovie = async (input) => {
    if (!input) return [];
    const allMovies = await fetchMaxMovies();
    return allMovies.filter(movie => 
        movie.original_title.toLowerCase().includes(input.toLowerCase()) ||
        (movie.overview && movie.overview.toLowerCase().includes(input.toLowerCase()))
    );
};
