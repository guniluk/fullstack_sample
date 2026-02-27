import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // setError(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      setFormData({});
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form
        className="flex flex-col gap-4 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="email"
          className="p-3 border border-gray-300 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email || ''}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border border-gray-300 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password || ''}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase font-semibold disabled:opacity-65"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-5 text-center text-sm text-gray-500">
        <p>Dont have an account? </p>
        <Link to={'/sign-up'}>
          <span className="text-blue-500 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5 max-w-md mx-auto">
          {error}
        </div>
      )}
    </div>
  );
}
