import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
        .dt-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .dt-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .dt-logo:hover { opacity: 0.8; }
        .dt-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }
        .dt-logo-text {
          font-family: 'Georgia', serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .dt-logo-text span { color: #f59e0b; }
        .dt-nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .dt-welcome {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          font-family: 'Georgia', serif;
          font-style: italic;
        }
        .dt-welcome strong {
          color: rgba(255,255,255,0.75);
          font-style: normal;
          font-weight: 500;
        }
        .dt-avatar-wrap {
          position: relative;
        }
        .dt-avatar-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 2px solid rgba(245,158,11,0.4);
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.2s, transform 0.2s;
          background: none;
          padding: 0;
        }
        .dt-avatar-btn:hover {
          border-color: #f59e0b;
          transform: scale(1.05);
        }
        .dt-avatar-btn img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .dt-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 200px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.2s, transform 0.2s, visibility 0.2s;
        }
        .dt-avatar-wrap:focus-within .dt-dropdown,
        .dt-avatar-wrap:hover .dt-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dt-dropdown a, .dt-dropdown button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-align: left;
          font-family: inherit;
        }
        .dt-dropdown a:hover, .dt-dropdown button:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        .dt-dropdown .dt-badge {
          margin-left: auto;
          font-size: 10px;
          background: #f59e0b;
          color: #000;
          padding: 1px 6px;
          border-radius: 10px;
          font-weight: 600;
        }
        .dt-sep {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 4px 0;
        }
        .dt-logout { color: rgba(239,68,68,0.7) !important; }
        .dt-logout:hover { color: #ef4444 !important; background: rgba(239,68,68,0.08) !important; }
      `}</style>
      <nav className="dt-navbar">
        <Link to="/" className="dt-logo">
          <div className="dt-logo-icon">⚡</div>
          <span className="dt-logo-text">Dev<span>Tinder</span></span>
        </Link>

        {user && (
          <div className="dt-nav-right">
            <span className="dt-welcome">hey, <strong>{user.firstName}</strong></span>
            <div className="dt-avatar-wrap" tabIndex={0}>
              <button className="dt-avatar-btn">
                <img alt="user photo" src={user.photoUrl} />
              </button>
              <div className="dt-dropdown">
                <Link to="/profile">
                  Profile <span className="dt-badge">New</span>
                </Link>
                <Link to="/connections">Connections</Link>
                <Link to="/requests">Requests</Link>
                <Link to="/premium">Premium</Link>
                <div className="dt-sep" />
                <button className="dt-logout" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
export default NavBar;