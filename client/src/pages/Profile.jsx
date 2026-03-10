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
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch('/api/auth/signout', {
        method: 'GET',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/users/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
      console.log(error);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
      handleShowListings();
    } catch (error) {
      console.log(error);
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
        <Link
          to={'/create-listing'}
          className="bg-green-800 text-white p-3 rounded-lg uppercase  hover:opacity-95 font-semibold cursor-pointer text-center"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span
          onClick={handleDelete}
          className="text-red-700 cursor-pointer font-bold hover:underline"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="text-red-700 cursor-pointer font-bold hover:underline"
        >
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
      <button
        onClick={handleShowListings}
        className="text-green-700 w-full p-3 rounded-lg hover:opacity-85 uppercase font-semibold cursor-pointer"
      >
        Show Listing
      </button>
      <p>{showListingsError && 'Something went wrong'}</p>
      {userListings.length > 0 &&
        userListings.map((listing) => (
          <div
            className="flex mt-2 border-b border-gray-300 p-3 justify-between items-center"
            key={listing._id}
          >
            <Link
              className="text-sm hover:underline flex-1"
              to={`/listing/${listing._id}`}
            >
              <p className="font-semibold text-slate-600">{listing.name}</p>
            </Link>
            <p className="text-sm text-slate-500 truncate max-w-[20ch]">
              {listing.description}
            </p>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleListingDelete(listing._id)}
                className="w-15 text-white border border-amber-700 bg-amber-700 rounded-sm p-1 hover:opacity-85 pointer-cursor uppercase text-sm"
              >
                Delete
              </button>
              <button className="w-14 border border-green-700 bg-green-700 text-white rounded-sm p-1 hover:opacity-85 pointer-cursor uppercase text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
