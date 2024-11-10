// Kosei: deactivatable banner
// if you click the cross button, the user logged in will get "advanced" : "true"
// and will not see this banner for good

import cross from '../images/cross.svg'
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase-config";
import { useEffect } from 'react';

export default function NewReptileOwnerPopup() {
    const url = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}.json`;
    const navigate = useNavigate();

    useEffect(() => {
    async function getUser() {
        const response = await fetch(url);
        const userData = await response.json();
        console.log(userData);


        if (userData) {
            if (!userData.advanced) {
                document.querySelector('.popup').style.display = 'flex';
            }
        }
    }
    getUser();}, [url]);

    async function handleDelete() {
        document.querySelector('.popup').style.display = 'none';
        // console.log('clicked');
        // Kosei add "advanced" : "true" to the user object
        const userToUpdate = {
            advanced: "true"
        };
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(userToUpdate),
          });

          

    }

    function handleClick () {
        navigate(`/info`);
    }

    return (
        <aside className="popup drop-shadow">
            <span onClick={handleClick}>
                <h2>New reptile owner?</h2>
                <p>
                    Check out the step-by-step guide to get your journey started!
                </p>
            </span>
            <span onClick={handleDelete}>
                <img src={cross} alt="" />
            </span>
        </aside>
    );
}