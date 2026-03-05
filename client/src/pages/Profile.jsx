// import { useRef } from 'react';

import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  // const fileRef = useRef(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* <input
          type="file"
          accept="image/*"
          id="avatar"
          className="hidden"
          ref={fileRef}
        /> */}
        <img
          src={currentUser.avatar || '/byh.jpg'}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-2 object-cover cursor-pointer"
          // onClick={() => fileRef.current?.click()}
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="New Password"
          className="p-3 border border-gray-300 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="button"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update Profile
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer font-bold hover:underline">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-bold hover:underline">
          Logout
        </span>
      </div>
    </div>
  );
}
