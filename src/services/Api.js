import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = 'https://jsonfakery.com/movies/paginated';

const MovieContext = createContext();
let p = 1;
export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);


    const fetchMovies = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}?page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            return data.data;
        } catch (error) {
            setError(error);
            console.error('Error fetching movies:', error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initializeMovies = async () => {
            const initialMovies = await fetchMovies(1);
            setMovies(initialMovies);
        };
        initializeMovies();
    }, []);


    const loadMoreMovies = async () => {
        const nextPage = page + 1;
        const newMovies = await fetchMovies(nextPage);
        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage(nextPage);
        p = nextPage;
    };

    return (
        <MovieContext.Provider value={{ movies, loading, error, loadMoreMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export const fetchMaxMovies = async () => {
    let allMovies = [];
    for (let i = 1; i <= 20; i++) {
        try {
            const response = await fetch(`${BASE_URL}?page=${i}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            allMovies.push(...data.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
    return allMovies;
};




    export const useMovies = () => useContext(MovieContext);