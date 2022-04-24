import "./All.css";
import PublicMovieList from "../../components/PublicMovieList";
import { useCollection } from "../../hooks/useCollection";
export default function All() {
    const { documents } = useCollection('movies');
  return (
    <div>
        <h1>All Movies</h1>
        <hr/>
        <div className="movies">
            {documents && <PublicMovieList movies={documents} />}
        </div>


    </div>
  )
}
