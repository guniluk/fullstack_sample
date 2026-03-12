import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    try {
      const fetchLandlord = async () => {
        const res = await fetch(`/api/users/${listing.userRef}`);
        const data = await res.json();
        console.log(data);
        setLandlord(data);
      };
      fetchLandlord();
    } catch (error) {
      console.log(error);
    }
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p className="mt-5">
            Contact <span className="font-semibold">{landlord.username}</span>{' '}
            for{' '}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="Input your message here..."
            className="w-full border border-gray-500 p-3 rounded-lg"
            autoFocus
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
            className=" bg-slate-800 text-white text-1xl font-bold p-3 rounded-2xl hover:opacity-90 cursor-pointer mt-3 text-center uppercase mx-auto"
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
