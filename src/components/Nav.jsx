import { NavLink } from "react-router-dom";
import home from "../images/home.svg"
import discover from "../images/discover.svg"
import post from "../images/post.svg"
import info from "../images/info.svg"
import profile from "../images/profile.svg"

export default function Nav() {
    return (
        <nav>
                        

            <NavLink to="/"><div className="nav-dual-coding"><img src={home} />Home</div></NavLink>
            <NavLink to="/create"><img src={discover} /> Discover</NavLink>
            <NavLink to="/profile"><img src={post} />Post</NavLink>
            <NavLink to="/profile"><img src={info} />Info</NavLink>
            <NavLink to="/profile"><img src={profile} />Profile</NavLink>
        </nav>
    );
}
