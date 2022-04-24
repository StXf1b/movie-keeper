import "./Settings.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useVisibility } from "../../hooks/useVisibility";
import { useDocument } from "../../hooks/useDocument";
import { ToastContainer, toast } from 'react-toastify';
import { useUpdateTitle } from "../../hooks/useUpdateTitle";
import { useUpdateGener } from "../../hooks/useUpdateGener";
import { useUpdateYear } from "../../hooks/useUpdateYear";
import { useUpdateLink } from "../../hooks/useUpdateLink";
import { useUpdateWhere } from "../../hooks/useUpdateWhere";
import { useUpdateDesc } from "../../hooks/useUpdateDesc";
import Private from "../../assets/private.png";
import Public from "../../assets/public.png";
import Select from "react-select";
const genre = [
    { value: 'Horror', label: 'Horror' },
    { value: 'Action', label: 'Action' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Comedy', label: 'Comedy' },
]
const categories = [
    { value: 'Netflix', label: 'Netflix' },
    { value: 'Disney+', label: 'Disney+' },
    { value: 'Youtube', label: 'Youtube Movie' },
    { value: 'Online', label: 'Online' },
  ]


export default function Settings() {
    const { id } = useParams();
    const { editVisibility } = useVisibility(id);
    const { document } = useDocument("movies", id);
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(null)
    const [whereToWatch, setWhereToWatch] = useState(null)
    const [releaseYear, setReleaseYear] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    // edits
    const { editTitle } = useUpdateTitle(id);
    const { editGener } = useUpdateGener(id);
    const { editYear } = useUpdateYear(id);
    const { editLink } = useUpdateLink(id);
    const { editWhere } = useUpdateWhere(id);
    const { editDesc } = useUpdateDesc(id);


    const privateHandle = () => {
        editVisibility("Private")
        toast.error("The movie post is now private!", {
            icon: <img src={Private} alt="Public Icon" />
        })
    }
    const publicHandle = () => {
        editVisibility("Public")
        toast.success("The movie post is now public!", {
            icon: <img src={Public} alt="Public Icon" />
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title) {
            if(title.length < 3) {
                toast.error("Title must be at least 3 characters")
                return;
            }
            else {
            toast.success("Title updated!")
            editTitle(title)
            setTitle("")
            }
        }
        if (category) {
            toast.success("Gener updated!")
            editGener(category)
            setCategory(null)
        }
        if (whereToWatch) {
            toast.success("Where to watch updated!")
            editWhere(whereToWatch)
            setWhereToWatch(null)
        }
        if (releaseYear) {
            if (releaseYear.length < 4 || releaseYear.length > 4) {
                toast.error("Release year must be 4 digits")
                return;
            } else {
                toast.success("Release year updated!")
                editYear(releaseYear)
                setReleaseYear("")
            }
        }
        if (description) {
            if (description.length < 10) {
                toast.error("Description must be at least 10 characters")
                return;
            }else {
                toast.success("Description updated!")
                editDesc(description)
                setDescription("")
            }
        }
        if (link) {
            editLink(link)
            setLink("")
        }
      }

    
  return (
    <div>
        <h1>Settings for {document && document.title}</h1>
        <hr/>
        <div className="settings-vis">
            <h2>Set the visibility for the movie post</h2><br/>
            <button className="btn" onClick={privateHandle}>Private</button>
            <button onClick={publicHandle} style={{"margin": "0 10px 10px 10px"}} className="btn-green">Public</button>
        </div>
        <hr/>
        <form onSubmit={handleSubmit}>
        <label>
          <span>Movie Title(Exact Title)</span>
          <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Release Year</span>
          <input
          type="number"
          maxLength="4"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          />
        </label>
        <label>
          <span>Link For The Movie Or Trailer</span>
          <input
            value={link}
            type="link"
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <label>
          <span>Where To Watch</span>
          <Select
            options={categories}
            placeholder="Select a category"
            onChange={(e) => setWhereToWatch(e.value)}
          />
        </label>
        <label>
          <span>Gener</span>
          <Select
            options={genre}
            placeholder="Select a gener"
            onChange={(e) => setCategory(e.value)}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="btn">Save Changes</button>
      </form>

        <ToastContainer limit={10} />
    </div>
  )
}
