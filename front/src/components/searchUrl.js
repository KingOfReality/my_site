import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./cardOfObject"; // Import the Card component

function SearchComponent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("name"); // Default category
  const [attackData, setAttackData] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false); // State to track if the search button is clicked

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        category: selectedCategory,
        input: searchTerm,
      };

      const response = await fetch('http://localhost:5000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const filteredAttacks = await response.json();
        setAttackData(filteredAttacks); // Update the attack data state with the filtered attacks
        setIsSearchClicked(true); // Set the search clicked state to true
      } else {
        console.log('Failed to send the JSON payload to the server');
      }

      navigate(`/option?term=${searchTerm}&category=${selectedCategory}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter your search term"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="name">Name</option>
            <option value="id">ID</option>
            <option value="x_mitre_detection">X-Mitre Detection</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {isSearchClicked && (
        <div className="mt-4">
          {attackData.map((attack) => (
            <Card
              title={attack.name}
              platforms={attack.x_mitre_platforms || []}
              phases={attack.kill_chain_phases || []}
              attack_id={attack.id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
