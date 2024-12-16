import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { fetchDaybyId } from "../action";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Details = () => {
  const [data, setData] = useState();
  const ID = useParams();

  useEffect(() => {
    const fetchDataWithId = async () => {
      try {
        const data = await fetchDaybyId(ID.id);
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataWithId();
  }, []);

  return (
    <>
      <Header />
      <main className="container py-4">
        {data ? (
          <>
            <h1 className="text-center mb-4">Package Details</h1>
            <div className="row mb-5">
              <div className="col-md-6">
                <img
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                  src={data.image}
                  alt={data.title}
                />
              </div>
              <div className="col-md-6">
                <h4 className="mb-3">{data.title}</h4>
                <p className="text-muted mb-4">{data.destination}</p>
                <p>{data.description}</p>

                <p className="mt-4 mb-2">Available Dates:</p>
                <ul className="list-group">
                  {data.availableDates.map((date) => (
                    <li className="list-group-item" key={date}>
                      {new Date(date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>

                <p className="mt-4">
                  <strong>${data.price}</strong>{" "}
                  <i>(per night per person)</i>
                </p>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link
                to={`/booking/${ID.id}`}
                className="btn btn-primary btn-lg me-3"
              >
                Book Now
              </Link>
              <Link to="/" className="btn btn-secondary btn-lg">
                Go Back
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Details;
