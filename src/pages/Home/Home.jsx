import "./Home.css";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList";
import { useCollection } from "../../hooks/useCollection";
export default function Home() {
  const { documents, error } = useCollection('movies');
  return (
    <div>
        <div className="btns">
            <Link to="./create"><button className="btn">Add Movies</button></Link>
            <hr/>
        </div>
        <div className="movies">
            {documents && <MovieList movies={documents} />}
            {error && <div className="error">Error: {error.message}</div>}
        </div>


    </div>
  )
}
