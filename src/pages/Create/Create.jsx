import "./Create.css"
import { useState } from "react"
import Select from "react-select"
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
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


export default function Create() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(null)
  const [whereToWatch, setWhereToWatch] = useState(null)
  const [releaseYear, setReleaseYear] = useState("")
  const [description, setDescription] = useState("")
  const [formError, setFormError] = useState(null)
  const [link, setLink] = useState("")
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
      user: user.uid
    })
    console.log(user)
    setTitle("")
    setCategory(null)
    setWhereToWatch(null)
    setReleaseYear("")
    setDescription("")
    setLink("")
    setFormError(null)
    // check if response has an error 
    if (!response.error) {
      history.push("/")
    }
  }
  return (
    <div>
      <h1>Add Movie To Watch</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Movie Title</span>
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
          <span>Where To watch</span>
          <Select
            required
            options={categories}
            placeholder="Select a category"
            onChange={(e) => setWhereToWatch(e.value)}
          />
        </label>
        <label>
          <span>Category</span>
          <Select
            required
            options={genre}
            placeholder="Select a genre"
            onChange={(e) => setCategory(e.value)}
          />
        </label>
        <label>
          <span>Link</span>
          <input
            value={link}
            type="link"
            onChange={(e) => setLink(e.target.value)}
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
