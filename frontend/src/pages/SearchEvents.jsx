const [minPrice, setMinPrice] = useState("");
const [maxPrice, setMaxPrice] = useState("");
const [seatsLeft, setSeatsLeft] = useState("");
const [organizer, setOrganizer] = useState("");
const clearFilters = () => {
  setKeyword("");
  setCategory("");
  setStartDate("");
  setEndDate("");
  setResults([]);
};

{/* Filters */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

  {/* Category */}
  <select
    className="border p-3 rounded"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Category</option>
    <option value="music">Music</option>
    <option value="workshop">Workshop</option>
    <option value="sports">Sports</option>
    <option value="party">Party</option>
  </select>

  {/* Start Date */}
  <input
    type="date"
    className="border p-3 rounded"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />

  {/* End Date */}
  <input
    type="date"
    className="border p-3 rounded"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />

  {/* MIN PRICE */}
  <input
    type="number"
    placeholder="Min Price"
    className="border p-3 rounded"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
  />

  {/* MAX PRICE */}
  <input
    type="number"
    placeholder="Max Price"
    className="border p-3 rounded"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
  />

  {/* SEATS LEFT */}
  <input
    type="number"
    placeholder="Minimum Seats Left"
    className="border p-3 rounded"
    value={seatsLeft}
    onChange={(e) => setSeatsLeft(e.target.value)}
  />

  {/* ORGANIZER NAME */}
  <input
    type="text"
    placeholder="Organizer Name"
    className="border p-3 rounded"
    value={organizer}
    onChange={(e) => setOrganizer(e.target.value)}
  />

</div>

