import "./Signup.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
export default function Signup() {
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { signup, error, isPending } = useSignup();
    const handleSubmit = async (e) => {
        e.preventDefault();
        signup(email, password, displayName);
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
            {!isPending && <button type="submit" className="btn">Signup</button>}
            {isPending && <button type="submit" className="btn-disabled" disabled>Signing up...</button>}
            {error && <div className="error">{error}</div>}
        </form>
    </div>
  )
}
