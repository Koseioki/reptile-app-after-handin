import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import UserAvatar from '../components/UserAvatar';
import UserPosts from '../components/UserPosts';

export default function UserProfilePage() {
    const { userId } = useParams();
    const userUrl = `https://reptile-app-ebad6-default-rtdb.firebaseio.com/users/${userId}.json`;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user info from the server
    useEffect(() => {
        async function getUser() {
            setLoading(true);
            setError(null); // Reset any previous error
            try {
                const response = await fetch(userUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch user: ${response.statusText}`);
                }
                const userData = await response.json();
                setUser(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [userId]); // Only depend on `userId`

    // Conditional rendering based on loading, error, and user state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user found.</p>;

    return (
        <section className="page main-content">
            <h1>@{user.name}</h1>

            <div className="avatar">
                <img className="profile-image" src={user.image} alt={user.name} />
                <span>
                    <h2>@{user.name}</h2>
                <p>{user.bio}</p>
                </span>
            </div>

            
            <h2>Recent posts</h2>
            <UserPosts uid={userId} />
        </section>
    );
}
