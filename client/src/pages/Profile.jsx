// import { useRef } from 'react';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFormData({});
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
    // console.log(formData);
  };
  // console.log(formData);

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 uppercase font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading' : 'User update'}
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer font-bold hover:underline"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-bold hover:underline">
          Logout
        </span>
      </div>
      <div>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5 max-w-md mx-auto">
            {error}
          </div>
        )}{' '}
      </div>
      <div>
        {updateSuccess && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-5 max-w-md mx-auto">
            User updated successfully
          </div>
        )}
      </div>
    </div>
  );
}
