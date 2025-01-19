import Slider from "../../components/Slider/Slider";
import { useMovies } from "../../services/Api";
import SingleSlider from "../../components/SingleSlider/SingleSlider"
import "./home.css"
const Home = () =>{
    const { movies, loading, error } = useMovies();
    let bestMovies = [...movies].sort((a, b) => parseInt(b.vote_average) - parseInt(a.vote_average));
    let newMovies = [...movies].sort((a, b) => 
        parseInt(b.release_date.slice(-4)) - parseInt(a.release_date.slice(-4))
    );
    return (
        <div className="home">
            <Slider/>
            <SingleSlider movies = {bestMovies} title = "Best Rated Movies"/>
            <SingleSlider movies = {newMovies} title = "Latest Movies"/>
        </div>    
    )
}
export default Home;