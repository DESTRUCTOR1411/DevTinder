import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  if (feed.length <= 0) return (
    <>
      <style>{`
        .feed-empty {
          min-height: calc(100vh - 116px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-align: center;
          padding: 2rem;
        }
        .feed-empty-icon { font-size: 56px; }
        .feed-empty h2 {
          font-family: 'Georgia', serif;
          font-size: 22px;
          color: rgba(255,255,255,0.6);
        }
        .feed-empty p {
          font-size: 14px;
          color: rgba(255,255,255,0.3);
          max-width: 260px;
        }
      `}</style>
      <div className="feed-empty">
        <div className="feed-empty-icon">🎉</div>
        <h2>You've seen everyone!</h2>
        <p>Check back later for new developers to connect with</p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .feed-page {
          min-height: calc(100vh - 116px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem 6rem;
          gap: 1.5rem;
        }
        .feed-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .feed-hint {
          font-size: 13px;
          color: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .feed-hint span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>
      <div className="feed-page">
        <span className="feed-label">Discover developers</span>
        {feed && <UserCard user={feed[0]} />}
        <div className="feed-hint">
          <span>✕ Pass</span>
          <span>·</span>
          <span>♥ Connect</span>
        </div>
      </div>
    </>
  );
};
export default Feed;