//Consuelo and Connor
import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import UserPosts from "../components/UserPosts";
import { auth } from "../firebase-config";
import UserAvatar from "../components/UserAvatar";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState(""); // Added state for bio
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        // Set states with values from userData (data from Firebase)
        setName(userData.name);
        setEmail(auth.currentUser?.email);
        setTitle(userData.title || "");
        setBio(userData.bio || ""); // Set bio state
        setImage(userData.image);
      }
    }
    getUser();
  }, [url]);

  async function handleSubmit(event) {
    event.preventDefault();

    const userToUpdate = {
      name,
      mail: email,
      title,
      bio, // Include bio in the user object
      image,
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(userToUpdate),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User updated: ", data);
        // Optionally, display a success message to the user
      } else {
        console.error("Failed to update user");
        // Optionally, handle the error
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally, handle the error
    }
  }

  function handleSignOut() {
    signOut(auth); // Sign out from Firebase Auth
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // Image file size must be below 0.5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // Reset errorMessage state
    } else {
      // If not below 0.5MB, display an error message
      setErrorMessage("The image file is too big!");
    }
  }

  return (
    <section className="page" id="main-content">
      <div className="container">
        <h1>Profile</h1>
        <UserAvatar uid={auth.currentUser?.uid} />

        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Type name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Type email"
            disabled
          />

          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            placeholder="Type your title"
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            placeholder="Tell us about yourself"
            rows="4"
          />

          <label htmlFor="image">Image</label>
          <img
            id="image"
            className="image-preview"
            src={
              image
                ? image
                : "https://placehold.co/600x400?text=Click+here+to+select+an+image"
            }
            alt="Choose"
            onError={(e) =>
              (e.target.src =
                "https://placehold.co/600x400?text=Error+loading+image")
            }
            onClick={() => fileInputRef.current.click()}
          />
          <input
            id="image-file"
            type="file"
            className="file-input hide"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
          <div className="btns">
            <button type="submit">Save User</button>
          </div>
        </form>
        <div className="btns">
          <button className="btn-cancel" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
      <h2>Posts</h2>
      <UserPosts uid={auth.currentUser?.uid} />
    </section>
  );
}
