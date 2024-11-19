//Consuelo, Connor and Kosei

import { NavLink } from "react-router-dom";
import home from "../images/home.svg";
import discover from "../images/discover.svg";
import post from "../images/post.svg";
import info from "../images/info.svg";
import profile from "../images/profile.svg";

export default function Nav() {
  return (
    <>
      <a className="skip-button" href="#main-content">
        Skip to Content
      </a>
      <nav>
        <NavLink to="/">
          <div className="nav-dual-coding">
            <img src={home} alt="" />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to="/discover">
          <div className="nav-dual-coding">
            <img src={discover} alt="" />
            <span>Discover</span>
          </div>
        </NavLink>
        <NavLink to="/create">
          <div className="nav-dual-coding">
            <img src={post} alt="" />
            <span>Post</span>
          </div>
        </NavLink>
        <NavLink to="/info">
          <div className="nav-dual-coding">
            <img src={info} alt="" />
            <span>Info</span>
          </div>
        </NavLink>
        <NavLink to="/profile">
          <div className="nav-dual-coding">
            <img src={profile} alt="" />
            <span>Profile</span>
          </div>
        </NavLink>
      </nav>
    </>
  );
}
