import "./PublicMovieList.css";
import { Link } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Avatar from "../components/Avatar";

export default function PublicMovieList( { movies } ) {



  return (
    <div className="movie-list public-movie">
        {movies.length === 0 && <p>No movies yet!</p>}
        {movies.map(movie => (
            movie.visibility === "Public" ? (
            <div className="link" key={movie.id}>
                <Link className="link-movie" to="/"><span className="span-movie"><Avatar user={movie.userName} src={movie.userPhoto}/></span></Link>
                <Link to={`/movies/${movie.id}`}>
                    <h4>{movie.title}</h4>
                    <p>Created by: {movie.userName}</p>
                    <p>Created: {formatDistanceToNow(movie.createdAt.toDate(), { addSuffix: true })}</p>
                    <p>Release year: {movie.releaseYear}</p>
                    <p>Category: {movie.category}</p>
                    <p>Where to watch: {movie.whereToWatch}</p>
                    <p>Description: {movie.description.substring(0, 50)}...</p>
                </Link>
                <Link style={{"marginRight": "15px"}} to={`/movies/${movie.id}`}><button className="btn">Read More</button></Link>
                <a href={movie.link}><button className="btn-green">Watch</button></a>
            </div>
            ) : null
        ))}
    </div>
  )
}
