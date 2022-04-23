import "./Signup.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
export default function Signup() {
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { signup, error, isPending } = useSignup();
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail);
    }
    
    const handleFileChange = (e) => {
        setThumbnail(null);
        let slected = e.target.files[0];
        if(!slected) {
            setThumbnailError('Please select a file');
            return;
        }
        if(!slected.type.includes('image')) {
            setThumbnailError('Please select a image file');
            return;
        }
        if(!slected.size > 1000000) {
            setThumbnailError('Image size should be less than 1MB');
            return;
        }
        setThumbnailError(null);
        setThumbnail(slected);
        console.log("Thumbnail updated")
    }
  return (
    <div className="signup">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} >
            <label>
                <span>Display Name:</span>
                <input
                type="text"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <label>
                <span>Email:</span>
                <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
            <span>Profile Picture:</span>
            <input
            required
            type="file"
            onChange={handleFileChange}
            />
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
            {!isPending && <button type="submit" className="btn">Signup</button>}
            {isPending && <button type="submit" className="btn-disabled" disabled>Signing up...</button>}
            {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}
