const API_ADDRESS = 'http://127.0.0.1:5000/api';

const request = (path) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADDRESS}${path}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(res => res.ok ? res.json() : reject(new Error()))
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export default function getQueryResults(queryString) {
  return request(`?query=${encodeURIComponent(queryString)}`);
}
