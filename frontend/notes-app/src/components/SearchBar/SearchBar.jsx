/* eslint-disable react/prop-types */
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center rounded-md bg-slate-100 px-4 ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full text-sm bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <X
          className="text-xl taxt-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}

      <Search
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};
export default SearchBar;
