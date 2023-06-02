const baseURL = 'http://localhost:9000/api/search/';

const SearchServices =  {
  getBookings() {
    return fetch(baseURL)
      .then(res => res.json());
  },

  addBooking(searchObj) {
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(searchObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  updateBooking(searchObj) {
    return fetch(baseURL + searchObj._id, {
      method: 'PUT',
      body: JSON.stringify(searchObj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
  },

  deleteBooking(id) {
    return fetch(baseURL + id, {
      method: 'DELETE'
    });
  }
};

export default SearchServices;