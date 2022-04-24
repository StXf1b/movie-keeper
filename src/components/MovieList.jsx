import "./MovieList.css";
import { Link } from "react-router-dom";
import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
export default function MovieList( { movies } ) {
    const { user } = useAuthContext();
    const { deleteDocument } = useFirestore('movies');
  return (
    <div className="movie-list">
        {movies.length === 0 && <p>No movies yet!</p>}
        {movies.map(movie => (
            movie.user === user.uid ? (
            <div className="link" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                    <h4>{movie.title}</h4>
                    <p>Visibility: {movie.visibility}</p>
                    <p>Release year: {movie.releaseYear}</p>
                    <p>Category: {movie.category}</p>
                    <p>Where to watch: {movie.whereToWatch}</p>
                    <p>Description: {movie.description.substring(0, 50)}...</p>
                </Link>
                <a href={movie.link}><button className="btn-green">Watch</button></a>
                <Link to={`settings/${movie.id}`}><button style={{"marginLeft": "10px"}} className="btn-settings">Settings</button></Link>
                <button style={{"marginLeft": "10px"}} onClick={() => deleteDocument(movie.id)} className="btn">Delete</button>
            </div>
            ) : null
        ))}
    </div>
  )
}
