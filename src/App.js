import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from './action';

function App() {
  const [packages, setPackages] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDestination, setSelectedDestination] = useState("");
  const category = ['Mountain', 'Beach', 'Grasslands'];

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setPackages(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSort = () => {
    const sortedPackages = [...packages].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    setPackages(sortedPackages);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterChange = (event) => {
    setSelectedDestination(event.target.value);
  };
  // console.log(selectedDestination)
  const filteredPackages = selectedDestination
    ? packages.filter(pack => pack.category == selectedDestination)
    : packages;

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="text-center mb-4">Welcome to Travel Agency</h1>
        {packages.length === 0 ? (
          <p className="text-center text-muted">Content is still loading...</p>
        ) : (
          <div className="mt-3">
            <h2 className="text-center mb-5">Explore Our Exciting Packages</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <label className="me-2">Filter by destination:</label>
                <select value={selectedDestination} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {category.map((dest, index) => (
                    <option key={index} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn btn-secondary" onClick={handleSort}>
                Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
              </button>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {filteredPackages.map((pack) => (
                <div key={pack._id} className="col">
                  <div className="card shadow h-100">
                    <img style={{ height : "300px"}} className="card-img-top" src={pack.image} alt={pack.title} />
                    <div className="card-body">
                      <h5 className="card-title">{pack.title}</h5>
                      <p className="card-text text-truncate">{pack.description}</p>
                      <p className="card-text">
                        <strong>Destination:</strong> {pack.destination}
                      </p>
                      <p className="card-text">
                        <strong>Price:</strong> ${pack.price}
                      </p>
                      <div className="d-flex justify-content-between">
                        <Link to={`/packages/${pack._id}`} className="btn btn-outline-primary">
                          Know More
                        </Link>
                        <Link to={`/booking/${pack._id}`} className="btn btn-danger">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
