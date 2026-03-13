import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 50,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent',
    offer: false,
    imageUrls: [],
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        // console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, [params.id]);

  // console.log(files);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 4) {
      let justName = [];
      for (let i = 0; i < files.length; i++) {
        justName.push(files[i].name);
      }
      // console.log(justName);
      setFormData((prev) => ({ ...prev, imageUrls: justName }));
      setImageError(false);
    } else {
      console.log('file length must be between 1 and 3');
      setImageError(true);
    }
  };
  // console.log(formData);
  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData((prev) => ({ ...prev, type: e.target.id }));
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (+formData.regularPrice < +formData.discountPrice) {
        setError('Regular price must be greater than discount price');
        return;
      }
      setLoading(true);
      const submissionData = { ...formData, userRef: currentUser._id };
      if (!submissionData.offer) submissionData.discountPrice = 0;

      const res = await fetch(`/api/listing/update/${params.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();
      // console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-7">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            onChange={handleChange}
            value={formData.name}
            className="p-3 border border-gray-300 rounded-lg"
            maxLength="62"
            minLength="5"
            required
          />
          <textarea
            placeholder="Description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <div className="flex gap-7 flex-wrap mt-2">
            <div className="flex gap-5">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={formData.type === 'sale'}
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                onChange={handleChange}
                checked={formData.type === 'rent'}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking lot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bedrooms}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center ">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="100000"
                  required
                  onChange={handleChange}
                  value={formData.discountPrice}
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Discount Price</p>
                  <span className="text-sm">($/Month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex  flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-slate-500 ml-2">
              The first image will be the cover(max 3)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-slate-400 rounded w-full"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="text-green-700 border border-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed"
            >
              Upload
            </button>
          </div>
          {imageError && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5 max-w-md mx-auto text-sm">
              File length must be between 1 and 3
            </div>
          )}
          {formData.imageUrls &&
            formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imageName) => (
              <div key={imageName}>{imageName.split('.')[0]}</div>
            ))}

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase font-semibold"
          >
            {loading ? 'Loading' : 'Update Listing'}
          </button>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5 max-w-md mx-auto">
              {error}
            </div>
          )}
        </div>
      </form>
    </main>
  );
}
