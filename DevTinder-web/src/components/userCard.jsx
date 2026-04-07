import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <>
      <style>{`
        .uc-card {
          width: 360px;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          position: relative;
          transition: transform 0.3s ease;
        }
        .uc-card:hover { transform: translateY(-4px); }
        .uc-img-wrap {
          position: relative;
          height: 380px;
          overflow: hidden;
        }
        .uc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .uc-card:hover .uc-img-wrap img { transform: scale(1.04); }
        .uc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
        }
        .uc-img-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(245,158,11,0.15);
          border: 1px solid rgba(245,158,11,0.3);
          color: #f59e0b;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          backdrop-filter: blur(8px);
        }
        .uc-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
        }
        .uc-name {
          font-family: 'Georgia', serif;
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .uc-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .uc-meta-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
        }
        .uc-body {
          padding: 16px 20px 20px;
        }
        .uc-about {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .uc-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .uc-btn {
          height: 46px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .uc-btn-ignore {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .uc-btn-ignore:hover {
          background: rgba(239,68,68,0.12);
          color: #ef4444;
          border-color: rgba(239,68,68,0.25);
        }
        .uc-btn-interest {
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: #000;
        }
        .uc-btn-interest:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(245,158,11,0.35);
        }
        .uc-btn:active { transform: scale(0.97); }
      `}</style>
      <div className="uc-card">
        <div className="uc-img-wrap">
          <img src={photoUrl} alt={`${firstName} ${lastName}`} />
          <div className="uc-img-overlay" />
          {age && gender && (
            <div className="uc-img-badge">{gender} · {age}y</div>
          )}
          <div className="uc-info">
            <div className="uc-name">{firstName} {lastName}</div>
            {age && gender && (
              <div className="uc-meta">
                <span>{age} years old</span>
                <span className="uc-meta-dot" />
                <span>{gender}</span>
              </div>
            )}
          </div>
        </div>
        <div className="uc-body">
          {about && <p className="uc-about">{about}</p>}
          <div className="uc-actions">
            <button className="uc-btn uc-btn-ignore" onClick={() => handleSendRequest("ignored", _id)}>
              ✕ Pass
            </button>
            <button className="uc-btn uc-btn-interest" onClick={() => handleSendRequest("interested", _id)}>
              ♥ Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserCard;