//Kosei
import { useState, useEffect } from "react";
import placeholder from "../assets/img/user-placeholder.jpg";
import { useNavigate } from "react-router-dom";

export default function UserAvatar({ uid }) {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        image: placeholder,
        name: "User's Name",
        // title: "User's Title"
    });
    const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/users/${uid}.json`;

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
        }
        getUser();
    }, [url]);

    function handleClick() {
        navigate(`/${uid}`);
    }

    return (
        <div
        className="avatar"
        tabIndex="0"
        onClick={handleClick}
        // run handleClick if enter is pressed
        onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick();
            }
          }}
        >
            <img className="avatar-image" src={user.image || placeholder} alt="" />
            <span>
                <h3>@{user.name}</h3>
                {/* <p>{user.title}</p> */}
            </span>
        </div>
    );
}
