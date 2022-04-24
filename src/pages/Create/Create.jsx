import "./Create.css"
import { useState } from "react"
import Select from "react-select"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import Info from "../../assets/info.svg"
const categories = [
  { value: 'Netflix', label: 'Netflix' },
  { value: 'Disney+', label: 'Disney+' },
  { value: 'Youtube', label: 'Youtube Movie' },
  { value: 'Online', label: 'Online' },
]
const genre = [
  { value: 'Horror', label: 'Horror' },
  { value: 'Action', label: 'Action' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Comedy', label: 'Comedy' },
]
const state = [
  { value: 'Public', label: 'Public' },
  { value: 'Private', label: 'Private' },
]



export default function Create() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(null)
  const [whereToWatch, setWhereToWatch] = useState(null)
  const [releaseYear, setReleaseYear] = useState("")
  const [description, setDescription] = useState("")
  const [formError, setFormError] = useState(null)
  const [link, setLink] = useState("")
  const [visibility, setVisibility] = useState("")
  const [isShown, setIsShown] = useState(false)
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('movies')
  const history = useHistory()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.length < 3) {
      setFormError("Title must be at least 3 characters")
      return
    }
    if (releaseYear.length < 4) {
      setFormError("Release year must be at least 4 characters")
      return
    }
    if (description.length < 10) {
      setFormError("Description must be at least 10 characters")
      return
    }
    await addDocument({
      title,
      category,
      whereToWatch,
      releaseYear,
      description,
      link,
      user: user.uid,
      visibility,
      userName: user.displayName,
      userPhoto: user.photoURL,
    })
    // check if response has an error 
    if (!response.error) {
      history.push("/")
    }
  }
  return (
    <div>
      <h1>Add Movie To Watch</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Movie Title(Exact Title)</span>
          <input
          required
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Release Year</span>
          <input
          required
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
            required
            options={categories}
            placeholder="Select a category"
            onChange={(e) => setWhereToWatch(e.value)}
          />
        </label>
        <label>
          <span>Gener</span>
          <Select
            required
            options={genre}
            placeholder="Select a gener"
            onChange={(e) => setCategory(e.value)}
          />
        </label>
        <label>
          {isShown && <div className="vis"><img src={Info} alt="Info" /><p>This sets the visibility of the movie.<br/> If you set it to true other users can see it.</p></div>}
          <span>Visibility<img onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} className="info" src={Info} alt="info" /></span>
          <Select
            required
            options={state}
            placeholder="Select a visibility"
            onChange={(e) => setVisibility(e.value)}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
          required
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="btn">Add Movie</button>
      </form>
      {formError && <div className="error">{formError}</div>}
    </div>
  )
}
