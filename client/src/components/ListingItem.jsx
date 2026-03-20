import { Link } from 'react-router-dom';
import {
  MdBathroom,
  MdBed,
  MdChair,
  MdLocalParking,
  MdLocationOn,
} from 'react-icons/md';
const ListingItem = ({ listing }) => {
  return (
    <div className="shadow-medium hover:shadow-lg transition-shadow border-2 border-slate-300 rounded-xl p-2 mt-1.5 bg-white overflow-hidden w-full sm:w-100 ">
      <Link to={`/listing/${listing._id}`}>
        <img
          src="house.jpg"
          alt="house"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <p className="text-xl font-bold mt-2 truncate w-full">
          Name: {listing.name}{' '}
        </p>

        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-gray-700 truncate w-full">
            Address: {listing.address}
          </p>
        </div>
        <p className="text-gray-700 truncate w-full">
          Description: {listing.description}{' '}
        </p>
        <p>Type: {listing.type} </p>
        <p className="text-lg text-slate-800 font-bold">
          Price:{' $'}
          {(listing.regularPrice - listing.discountPrice).toLocaleString()}{' '}
          <span className="text-sm text-slate-600">
            {listing.offer === true
              ? `(Discounted: ${listing.discountPrice.toLocaleString()})`
              : '(No discount)'}{' '}
            {listing.type === 'rent' ? '/month' : ''}
          </span>
        </p>
        <div className="flex gap-3 items-center wrap-normal text-xs justify-center">
          <div className="flex gap-1 items-center">
            <MdBed className="text-red-700 w-5 h-5" />
            {listing.bedrooms} {listing.bedrooms > 1 ? 'beds' : 'bed'}
          </div>
          <div className="flex gap-1 items-center">
            <MdBathroom className="text-red-700 w-5 h-5" />
            {listing.bathrooms} {listing.bathrooms > 1 ? 'baths' : 'bath'}
          </div>
          <div className="flex gap-1 items-center">
            <MdChair className="w-5 h-5 text-red-700" />
            {listing.furnished === true ? 'Furnished' : 'Not furnished'}
          </div>
          <div className="flex gap-1 items-center">
            <MdLocalParking className="w-5 h-5 text-red-700" />{' '}
            {listing.parking === true ? 'Parking' : 'No parking'}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
