import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections){
    console.log("inside");
    return null;
  };

  if (connections.length === 0) return (
    <>
      <style>{`
        .cn-empty {
          min-height: calc(100vh - 116px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: rgba(255,255,255,0.3);
        }
        .cn-empty-icon { font-size: 48px; opacity: 0.3; }
        .cn-empty h2 { font-family: 'Georgia', serif; font-size: 20px; color: rgba(255,255,255,0.5); }
        .cn-empty p { font-size: 14px; }
      `}</style>
      <div className="cn-empty">
        <div className="cn-empty-icon">🔗</div>
        <h2>No connections yet</h2>
        <p>Start swiping to meet developers</p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .cn-page {
          min-height: calc(100vh - 116px);
          padding: 3rem 2rem 5rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .cn-header {
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .cn-header h1 {
          font-family: 'Georgia', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .cn-header h1 span { color: #f59e0b; }
        .cn-count {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .cn-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .cn-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .cn-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateX(4px);
        }
        .cn-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(245,158,11,0.25);
          flex-shrink: 0;
        }
        .cn-info { flex: 1; min-width: 0; }
        .cn-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          font-family: 'Georgia', serif;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cn-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 4px;
        }
        .cn-about {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cn-chat-btn {
          flex-shrink: 0;
          height: 36px;
          padding: 0 18px;
          border-radius: 10px;
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.25);
          color: #f59e0b;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: inherit;
        }
        .cn-chat-btn:hover {
          background: rgba(245,158,11,0.18);
          border-color: rgba(245,158,11,0.45);
          color: #fbbf24;
        }
      `}</style>
      <div className="cn-page">
        <div className="cn-header">
          <h1>Your <span>Connections</span></h1>
          <span className="cn-count">{connections.length} people</span>
        </div>
        <div className="cn-list">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            return (
              <div key={_id} className="cn-card">
                <img alt="photo" className="cn-avatar" src={photoUrl} />
                <div className="cn-info">
                  <div className="cn-name">{firstName} {lastName}</div>
                  {age && gender && <div className="cn-meta">{age} · {gender}</div>}
                  {about && <div className="cn-about">{about}</div>}
                </div>
                <Link to={"/chat/" + _id}>
                  <button className="cn-chat-btn">
                    ↗ Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Connections;