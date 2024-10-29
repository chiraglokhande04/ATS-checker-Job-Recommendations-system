import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import { FaSearch, FaTimes } from "react-icons/fa"; // Icons for search and clear

const SearchBar = ({ placeholder, onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobTitles = [
    "Software Engineer",
    "UI/UX Designer",
    "Data Analyst",
    "Business Intelligence Analyst",
    "Network Security Specialist",
    "Blockchain Developer",
    "Full Stack Engineer",
    "Game Developer",
    "Cloud Architect",
    "IT Project Manager",
    "Data Scientist",
    "ML Engineer",
    "NLP Engineer",
    "Computer Vision Engineer",
    "Big Data Engineer",
    "Cybersecurity Analyst",
    "System Engineer",
    "Cloud Security Specialist",
    "IT Support Technician",
    "Financial Analyst",
    "Accountant",
    "Sales Executive",
    "Marketing Specialist",
    "Operations Manager",
    "Human Resources Manager",
    "Supply Chain Analyst",
    "Product Manager",
    "Customer Support Specialist",
    "Real Estate Analyst",
    "Investment Banker",
    "Supply Chain Manager",
    "Data Privacy Consultant",
    "Quality Assurance Specialist"
  ];

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);

    // Filter job titles based on input
    if (searchValue) {
      const filtered = jobTitles.filter((title) =>
        title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setFilteredOptions([]);
    setError("");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true); // Set loading state
      setError(""); // Reset error state
      try {
        // Send the search query to the backend
        const response = await axios.post("https://mnp-3.vercel.app/recommend", {
          title: query,
        });

        // Process the response
        if (response.data.status === "success") {
          onSearchResults(response.data.recommendations);
        } else {
          onSearchResults([]);
          setError("No recommendations found.");
        }
      } catch (error) {
        console.error("Error fetching job recommendations:", error);
        onSearchResults([]);
        //setError("Error fetching recommendations.");
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleFocus = () => {
    // Show all job titles when input is focused
    setFilteredOptions(jobTitles);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus} // Add focus handler
          placeholder={placeholder || "Search for jobs..."}
          className="w-full py-3 px-5 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 transform hover:scale-105 focus:shadow-lg"
        />
        <button
          type="submit"
          className="h-10 absolute top-1 right-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
          disabled={loading} // Disable while loading
        >
          {loading ? "Searching..." : <FaSearch />}
        </button>
      </form>

      {error && (
        <div className="mt-2 text-red-500 text-sm">{error}</div>
      )}

      {filteredOptions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-auto transition-opacity duration-300 ease-in-out opacity-100">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-indigo-100"
              onClick={() => {
                setQuery(option); // Set query to the selected option
                setFilteredOptions([]); // Clear suggestions after selection
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
