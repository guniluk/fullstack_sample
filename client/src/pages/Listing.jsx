import { useEffect, useState } from 'react';
import { FaBath, FaBed, FaChair, FaParking } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const Listing = () => {
  const params = useParams();
  const { listingId } = params;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          <p className="text-slate-800 font-bold text-lg  bg-blue-100 ">
            Address: {listing.address}
          </p>
          <p className="text-slate-800 font-sans">
            <span className="font-bold">Description : </span>
            {listing.description}
          </p>
          <p>
            <span className="font-bold">Type: </span>For {listing.type}
          </p>
          {listing.offer && (
            <p className="border-b border-amber-700 pb-2 font-bold text-red-500 block">
              <span className="font-bold">Price: $</span>

              {(+listing.regularPrice - +listing.discountPrice).toLocaleString(
                'en-US',
              )}
              {listing.type === 'rent' ? ' / month (discounted)' : ''}
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
        </div>
      )}
    </main>
  );
};

export default Listing;
