export default function CreateListing() {
  return (
    <main className="p-3 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-7">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="p-3 border border-gray-300 rounded-lg"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            placeholder="Description"
            id="description"
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="address"
            id="address"
            className="p-3 border border-gray-300 rounded-lg"
            required
          />
          <div className="flex gap-7 flex-wrap mt-2">
            <div className="flex gap-5">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking lot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
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
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="100000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="100000"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-slate-500 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-slate-400 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="text-green-700 border border-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase font-semibold">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
