import { useEffect, useState } from 'react';
import {
  FaBath,
  FaBed,
  FaChair,
  FaLocationArrow,
  FaParking,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Contact from '../components/Contact';

const Listing = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { listingId } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchListing();
  }, [listingId]);
  // console.log(listing);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl text-red-700">
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div className="p-3 max-w-4xl mx-auto flex flex-col gap-2">
          <h1 className="text-3xl font-semibold my-7 text-center">
            {listing.name}
          </h1>
          <img
            src="/house.jpg"
            alt="House"
            className="w-full mb-5 h-75 object-cover"
          />

          <p className="text-slate-800 font-sans mb-3">
            <span className="font-bold">Description : </span>
            {listing.description}
          </p>
          <p className="flex gap-2 align-center text-slate-500 text-1xl">
            <FaLocationArrow className="text-sm text-slate-500"></FaLocationArrow>
            Address: {listing.address}
          </p>
          <p className="flex gap-5 mb-3">
            <span className="text-white font-sans bg-red-900 p-2 rounded-lg w-50 text-center">
              For {listing.type}
            </span>
            <span className="text-white font-sans bg-green-800 p-2 rounded-lg w-50 text-center">
              {listing.discountPrice > 0
                ? `$${listing.discountPrice.toLocaleString('en-US')} Discount`
                : 'No Discount'}
            </span>
          </p>
          {listing.offer && (
            <p className="border-b border-amber-700 pb-2 font-bold text-red-500 block">
              <span className="font-bold">Price: $</span>

              {(+listing.regularPrice - +listing.discountPrice).toLocaleString(
                'en-US',
              )}
              {listing.type === 'rent' ? ' / month' : ''}
            </p>
          )}
          {!listing.offer && (
            <p className="border-b border-amber-700 pb-2 font-bold text-red-500 ">
              Price: ${(+listing.regularPrice).toLocaleString('en-US')}
              {listing.type === 'rent' ? ' / month' : ''}
            </p>
          )}
          <ul className="flex flex-wrap gap-3 sm:gap-16 whitespace-nowrap text-green-900 text-sm font-bold items-center justify-center mt-5">
            <li className="flex gap-1 items-center">
              <FaBed className="text-2xl"></FaBed>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </li>
            <li className="flex gap-1 items-center">
              <FaBath className="text-2xl"></FaBath>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </li>
            <li className="flex gap-1 items-center">
              <FaParking className="text-2xl"></FaParking>
              {listing.parking ? 'Parking OK' : 'No Parking'}
            </li>
            <li className="flex gap-1 items-center">
              <FaChair className="text-2xl"></FaChair>
              {listing.furnished ? 'Furnished' : 'Not furnished'}
            </li>
          </ul>
          {currentUser && currentUser._id !== listing.userRef && !contact && (
            <button
              onClick={() => setContact(true)}
              className="w-full bg-slate-800 text-white text-1xl font-bold p-3 rounded-2xl hover:opacity-90 cursor-pointer mt-3"
            >
              Contact Landlord
            </button>
          )}
          {contact && <Contact listing={listing} />}
        </div>
      )}
    </main>
  );
};

export default Listing;
