import "./MovieList.css";
import { Link } from "react-router-dom";
import React from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

export default function MovieList( { movies } ) {
    const { user } = useAuthContext();
  return (
    <div className="movie-list">
        {movies.length === 0 && <p>No movies yet!</p>}
        {movies.map(movie => (
            movie.user === user.uid ? (
            <div className="link" key={movie.id}>
                <Link to={`/movies/${movie.id}`}>
                    <h4>{movie.title}</h4>
                    <p>Release year: {movie.releaseYear}</p>
                    <p>Category: {movie.category}</p>
                    <p>Where to watch: {movie.whereToWatch}</p>
                    <p>Description: {movie.description.substring(0, 50)}...</p>
                </Link>
                <a href={movie.link}><button className="btn">Watch it</button></a>
            </div>
            ) : null
        ))}
    </div>
  )
}
