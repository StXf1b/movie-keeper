import "./Movies.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useEffect } from "react";

function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hour(s) and " + rminutes + " minute(s).";
}
export default function Movies() {
  const { id } = useParams();
  const { document } = useDocument('movies', id);
  const [movieImg, setMovieImg] = useState(null);
  const [duration , setDuration] = useState(null);
  const [loading, setLoading] = useState(null);
  const [plot, setPlot] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const title = document && document.title;
  const fetchMovie = async () => {
    
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=d7284030`);
    const data = await response.json();
    console.log(data);
    setMovieImg(data.Poster);
    setDuration(timeConvert(data.Runtime.substring(0, data.Runtime.length - 3)));
    setPlot(data.Plot);
    setReleaseYear(data.Released);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovie();
  }, [title]);

  
  return (
    <div className="main-container">
      {document && (
          <>
          <div className="desc">
            {loading === true ? <p>Loading...</p>: null}
            <h1>{document.title}</h1>
            <h2>Your Description:</h2>
            <p>{document.description}</p>
            <h2>Plot:</h2>
            <p>{plot}</p>
            <h2>Released:</h2>
            <p>{releaseYear}</p>
            <h2>Watch it on:</h2> <h3>{document.whereToWatch}</h3>
            <p>Duration: {duration}</p>
            <a style={{"marginTop": "5px"}} href={document.link}><button className="btn">Watch</button></a>
          </div>
          <span className="img-div">
            <img src={movieImg} alt="Movi Img" className="img" />
          </span>
          </>
          )}
    </div>
  )
}
