import React, { useState } from 'react';
import axios from 'axios';
function SearchByTerm() {
  const [search, setSearch] = useState(false);
  const [val, setVal] = useState({ name: '', description: '', type: '', modDate: '' });

  const onSearchChange = (e) => {
    e.preventDefault();
    const json = { category: val.name, info: val.description };
    setSearch(json);
    // Send the JSON object to the server
    sendSearchRequest(json);
    setSearch(!search);
  };

  const onChange = (e) =>
    setVal((val) => {
      val[e.target.id] = e.target.value;
      return val;
    });

  // Function to send the search request to the server
  const sendSearchRequest = (data) => {
    // Make an AJAX request or use Axios to send the data to the server
    // Example using Axios:
      console.log(data)
    axios.post('http://localhost:5000/api/search', data)
      .then((response) => {
        // Handle the response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.log(error);
      });
  };

  return (
    <form className="text-center ">
      <div className="mb-3">
        <input
          style={{ backgroundColor: '#f8f9fa' }}
          type="text"
          className="form-control"
          placeholder="insert an attack name"
          id="name"
          onChange={onChange}
        />
      </div>

      <a
        data-toggle="collapse"
        href="#collapseExample"
        data-bs-toggle="collapse"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
        className="advanced"
      >
        Advanced Search <i className="fa fa-angle-down"></i>
      </a>

      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <div className="row">
            <div className="col-md-4">
              <input
                id="description"
                type="text"
                placeholder="description"
                className="form-control"
                onChange={onChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="type"
                className="form-control"
                placeholder="type"
                onChange={onChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                id="modDate"
                className="form-control"
                placeholder="modification date"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', marginTop: '2% ' }}>
        <button onClick={onSearchChange} type="submit" className="btn btn-secondary btn-lg">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchByTerm;
