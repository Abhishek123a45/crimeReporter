import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('district');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, searchType });
    console.log(searchTerm, searchType);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-12 pr-4 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
          required
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <button
            type="button"
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="flex items-center justify-between w-full py-3 px-4 text-gray-700 bg-gray-100 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ease-in-out"
          >
            {searchType === 'district' ? 'District' : 'State'}
            <ChevronDown size={20} className={`ml-2 transition-transform duration-300 ${isSelectOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isSelectOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setSearchType('district')
                  setIsSelectOpen(false)
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              >
                District
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchType('state')
                  setIsSelectOpen(false)
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              >
                State
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="py-3 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out shadow-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;