import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) return (
    <>
      <style>{`
        .rq-empty {
          min-height: calc(100vh - 116px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .rq-empty-icon { font-size: 48px; opacity: 0.3; }
        .rq-empty h2 { font-family: 'Georgia', serif; font-size: 20px; color: rgba(255,255,255,0.5); }
        .rq-empty p { font-size: 14px; color: rgba(255,255,255,0.3); }
      `}</style>
      <div className="rq-empty">
        <div className="rq-empty-icon">📨</div>
        <h2>No pending requests</h2>
        <p>You're all caught up</p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .rq-page {
          min-height: calc(100vh - 116px);
          padding: 3rem 2rem 5rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .rq-header {
          margin-bottom: 2rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .rq-header h1 {
          font-family: 'Georgia', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
        }
        .rq-header h1 span { color: #f59e0b; }
        .rq-count {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .rq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .rq-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          transition: border-color 0.2s;
        }
        .rq-card:hover { border-color: rgba(255,255,255,0.12); }
        .rq-avatar {
          width: 56px; height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .rq-info { flex: 1; min-width: 0; }
        .rq-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          font-family: 'Georgia', serif;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rq-meta {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 4px;
        }
        .rq-about {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rq-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .rq-btn {
          height: 36px;
          padding: 0 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
          font-family: inherit;
        }
        .rq-btn-reject {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.2);
          color: rgba(239,68,68,0.7);
        }
        .rq-btn-reject:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.4);
          color: #ef4444;
        }
        .rq-btn-accept {
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.2);
          color: rgba(34,197,94,0.7);
        }
        .rq-btn-accept:hover {
          background: rgba(34,197,94,0.15);
          border-color: rgba(34,197,94,0.4);
          color: #22c55e;
        }
        .rq-btn:active { transform: scale(0.96); }
      `}</style>
      <div className="rq-page">
        <div className="rq-header">
          <h1><span>Requests</span> Received</h1>
          <span className="rq-count">{requests.length} pending</span>
        </div>
        <div className="rq-list">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
            return (
              <div key={_id} className="rq-card">
                <img alt="photo" className="rq-avatar" src={photoUrl} />
                <div className="rq-info">
                  <div className="rq-name">{firstName} {lastName}</div>
                  {age && gender && <div className="rq-meta">{age} · {gender}</div>}
                  {about && <div className="rq-about">{about}</div>}
                </div>
                <div className="rq-actions">
                  <button className="rq-btn rq-btn-reject" onClick={() => reviewRequest("rejected", request._id)}>
                    ✕ Reject
                  </button>
                  <button className="rq-btn rq-btn-accept" onClick={() => reviewRequest("accepted", request._id)}>
                    ✓ Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Requests;