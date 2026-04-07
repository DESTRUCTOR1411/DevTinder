import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <style>{`
        .ep-page {
          min-height: calc(100vh - 116px);
          padding: 3rem 2rem 5rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .ep-form-wrap {
          width: 420px;
          flex-shrink: 0;
        }
        .ep-heading {
          margin-bottom: 2rem;
        }
        .ep-heading h1 {
          font-family: 'Georgia', serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 6px;
        }
        .ep-heading p {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
        }
        .ep-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem;
        }
        .ep-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .ep-field {
          margin-bottom: 1rem;
        }
        .ep-field label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 7px;
        }
        .ep-field input,
        .ep-field textarea,
        .ep-field select {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .ep-field input::placeholder,
        .ep-field textarea::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .ep-field input:focus,
        .ep-field textarea:focus,
        .ep-field select:focus {
          border-color: rgba(245,158,11,0.4);
          background: rgba(245,158,11,0.04);
        }
        .ep-field textarea {
          resize: none;
          height: 80px;
          line-height: 1.6;
        }
        .ep-field select option {
          background: #111;
          color: #fff;
        }
        .ep-sep {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 1.25rem 0;
        }
        .ep-error {
          font-size: 13px;
          color: #ef4444;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 1rem;
        }
        .ep-save-btn {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: #000;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .ep-save-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(245,158,11,0.4);
        }
        .ep-save-btn:active { transform: scale(0.98); }
        .ep-preview-wrap {
          padding-top: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .ep-preview-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .ep-toast {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          background: #111;
          border: 1px solid rgba(34,197,94,0.3);
          border-radius: 12px;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          z-index: 100;
          animation: slideUp 0.3s ease;
          white-space: nowrap;
        }
        .ep-toast-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      <div className="ep-page">
        <div className="ep-form-wrap">
          <div className="ep-heading">
            <h1>Edit Profile</h1>
            <p>Update your details and how others see you</p>
          </div>

          <div className="ep-card">
            <div className="ep-row">
              <div className="ep-field">
                <label>First Name</label>
                <input type="text" value={firstName} placeholder="Jane" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="ep-field">
                <label>Last Name</label>
                <input type="text" value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="ep-field">
              <label>Photo URL</label>
              <input type="text" value={photoUrl} placeholder="https://..." onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>

            <div className="ep-row">
              <div className="ep-field">
                <label>Age</label>
                <input type="text" value={age} placeholder="25" onChange={(e) => setAge(e.target.value)} />
              </div>
              <div className="ep-field">
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="ep-field">
              <label>About</label>
              <textarea value={about} placeholder="Tell people about yourself..." onChange={(e) => setAbout(e.target.value)} />
            </div>

            <div className="ep-sep" />

            {error && <p className="ep-error">{error}</p>}

            <button className="ep-save-btn" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

        <div className="ep-preview-wrap">
          <span className="ep-preview-label">Live Preview</span>
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {showToast && (
        <div className="ep-toast">
          <div className="ep-toast-dot" />
          Profile saved successfully
        </div>
      )}
    </>
  );
};
export default EditProfile;