import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  // console.log(rentListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-7 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-sm sm:text-xl">
          Young Estate is the only place to find your dream home just like easy
          and gorgeous. please enjoy seeing these home and contact us.
        </div>
        <Link
          to={'/search'}
          className="text-blue-800 text-xl lg:text-3xl text-bold hover:underline"
        >
          Let's get started!!!
        </Link>
      </div>
      {/* {listing list for offer, rent and sale} */}
      <div className="max-w-9xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-slate-600 font-semibold text-2xl">
                Recent offers
              </h2>
              <Link
                to={'/search?offer=true'}
                className="text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mx-auto">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}{' '}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-9xl mx-auto p-3 flex flex-col gap-8 my-10">
        {rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-slate-600 font-semibold text-2xl">
                Recent places for rent
              </h2>
              <Link
                to={'/search?type=rent'}
                className="text-blue-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mx-auto">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}{' '}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-9xl mx-auto p-3 flex flex-col gap-8 my-10">
        {saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-slate-600 font-semibold text-2xl">
                Recent places for sale
              </h2>
              <Link
                to={'/search?type=sale'}
                className="text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mx-auto">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}{' '}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
