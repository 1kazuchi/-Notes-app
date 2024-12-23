import { useNavigate } from "react-router-dom";
import ProfileInfo from "../Card/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  const handleSearch = () => {
    
  };
  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex bg-white items-center justify-between px-6 py-2 shadow">
      {" "}
      <h2 className="text-xl font-medium text-black py-2">Notes </h2>

      <SearchBar value={searchQuery}
      onChange={({target}) => {setSearchQuery(target.value)}}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}/>

      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};
export default Navbar;
