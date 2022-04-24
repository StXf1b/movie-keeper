// styles
import "./Avatar.css"
export default function Avatar({ src, user }) {
  return (
    <>
    <div className="avatar">
        <img src={src} alt="User Img" ></img>
    </div>
    <span className="username">{user}</span>
    </>
  )
}
