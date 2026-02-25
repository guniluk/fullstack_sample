import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    setFormData({});
  };

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
      <form
        className="flex flex-col gap-4 max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          className="p-3 border border-gray-300 rounded-lg"
          id="username"
          onChange={handleChange}
          value={formData.username || ''}
        />
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
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase font-semibold disabled:opacity-65">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 justify-center mt-5 text-center text-sm text-gray-500">
        <p>Already have an account? </p>
        <Link to={'/sign-in'}>
          <span className="text-blue-500 hover:underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
