import React, { useState } from "react";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  type User,
} from "./firebase";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { FaFacebook, FaGithub } from "react-icons/fa"; // Facebook and GitHub icons
import img from "./assets/img.jpg"; // Import the image

const Auth: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // Toggle between Sign Up and Sign In
  const [error, setError] = useState<string | null>(null); // State to store error messages

  // Sign Up with Email, Password, and Username
  const handleSignUp = async () => {
    setError(null); // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      setUser(userCredential.user);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already in use.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Sign In with Email and Password
  const handleSignIn = async () => {
    setError(null); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        setError("User not found.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // Social Sign-In (Google, Facebook, GitHub)
  const handleSocialSignIn = async (provider: any) => {
    setError(null); // Clear previous errors
    try {
      const userCredential = await signInWithPopup(auth, provider);
      setUser(userCredential.user);
    } catch (error: any) {
      console.error(error);
      setError("Failed to sign in with the selected provider.");
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error(error);
      setError("Failed to log out.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image on the left side */}
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }} // Use the imported image
        ></div>

        {/* Authentication content on the right side */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>

          {/* Display error message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          {!user ? (
            <>
              {isSignUp && ( // Show username field only during Sign-Up
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Sign Up & Sign In Buttons */}
              {isSignUp ? (
                <button
                  onClick={handleSignUp}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Sign In
                </button>
              )}

              {/* Toggle between Sign-Up and Sign-In */}
              <p className="text-center mt-3">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-1 border-t"></div>
                <span className="px-3 text-gray-500">OR</span>
                <div className="flex-1 border-t"></div>
              </div>

              {/* Social Sign-In Buttons with Icons */}
              <button
                onClick={() => handleSocialSignIn(googleProvider)}
                className="w-full flex items-center justify-center bg-white text-gray-700 py-2 mb-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                <FcGoogle className="mr-2" size={20} /> {/* Google Icon */}
                <span>Google</span>
              </button>

              <button
                onClick={() => handleSocialSignIn(facebookProvider)}
                className="w-full flex items-center justify-center bg-blue-700 text-white py-2 mb-2 rounded-lg hover:bg-blue-800 transition"
              >
                <FaFacebook className="mr-2" size={20} /> {/* Facebook Icon */}
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleSocialSignIn(githubProvider)}
                className="w-full flex items-center justify-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
              >
                <FaGithub className="mr-2" size={20} /> {/* GitHub Icon */}
                <span>GitHub</span>
              </button>
            </>
          ) : (
            <>
              <p className="text-center text-lg font-semibold mb-4">
                Welcome, {user.displayName || "User"}!
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;