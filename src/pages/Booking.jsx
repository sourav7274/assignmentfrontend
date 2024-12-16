import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { saveBookings, fetchDaybyId } from "../action";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

const Booking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phnNumber, setNumber] = useState("");
  const [totalPassengers, setTotalPassengers] = useState("");
  const [splReq, setSplReq] = useState("");
  const [dis, setDis] = useState(false);
  const [packageDetails, setPackageDetails] = useState({ title: "", description: "", destination: "", price: 0 });

  const ID = useParams();

  useEffect(() => {
    const fetchDataWithId = async () => {
      try {
        const data = await fetchDaybyId(ID.id);
        if (data) {
          setPackageDetails({
            title: data.title,
            description: data.description,
            destination: data.destination,
            price: data.price,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataWithId();
  }, [ID.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalPrice = totalPassengers * packageDetails.price;

    const data = {
      custName: name,
      email: email,
      phoneNum: phnNumber,
      travelerNum: totalPassengers,
      specialReq: splReq,
      packageName: packageDetails.title,
      packageDesc: packageDetails.description,
      packageDest: packageDetails.destination,
      packagePrice: packageDetails.price,
      totalPrice: totalPrice,
    };

    // Call the saveBookings function to save the booking (assuming it returns a promise)
    saveBookings(data).then(() => {
      setDis(true);
      generateInvoice(data); // Call the function to generate PDF
    });
  };

  const generateInvoice = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 16);
    doc.setFontSize(12);

    doc.text(`Customer Name: ${data.custName}`, 14, 30);
    doc.text(`Email: ${data.email}`, 14, 40);
    doc.text(`Phone: ${data.phoneNum}`, 14, 50);
    doc.text(`Total Passengers: ${data.travelerNum}`, 14, 60);
    doc.text(`Special Requests: ${data.specialReq}`, 14, 70);

    doc.text(`\nPackage Details:`, 14, 90);
    doc.text(`Package Name: ${data.packageName}`, 14, 100);
    doc.text(`Description: ${data.packageDesc}`, 14, 110);
    doc.text(`Destination: ${data.packageDest}`, 14, 120);
    doc.text(`Price per Passenger: $${data.packagePrice}`, 14, 130);
    doc.text(`Total Price: $${data.totalPrice}`, 14, 140);

    doc.save(`invoice_${data.custName}.pdf`);
  };

  return (
    <>
      <Header />
      <main className="container py-4">
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          <h2 className="text-center mb-4">Book Your Package</h2>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Enter your name:
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="John Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Enter your Email ID:
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="phone">
              Enter your Phone Number:
            </label>
            <input
              id="phone"
              type="tel"
              className="form-control"
              placeholder="123-456-7890"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="passengers">
              Enter the total number of passengers:
            </label>
            <input
              id="passengers"
              type="number"
              className="form-control"
              placeholder="Number of Passengers"
              onChange={(e) => setTotalPassengers(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="requests">
              Special Requests (if any):
            </label>
            <textarea
              id="requests"
              className="form-control"
              rows="3"
              placeholder="Write your requests here..."
              onChange={(e) => setSplReq(e.target.value)}
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Submit Booking
            </button>
          </div>
        </form>

        <div style={{ display: dis ? "block" : "none" }} className="my-4">
          <h3>Invoice</h3>
          <p><strong>Customer Details:</strong></p>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phnNumber}</p>
          <p>Total Passengers: {totalPassengers}</p>
          <p>Special Requests: {splReq}</p>

          <p><strong>Package Details:</strong></p>
          <p>Package Name: {packageDetails.title}</p>
          <p>Description: {packageDetails.description}</p>
          <p>Destination: {packageDetails.destination}</p>
          <p>Price per Passenger: ${packageDetails.price}</p>
          <p>Total Price: ${packageDetails.price * totalPassengers}</p>

          <Link to="/" className="btn btn-primary">
            Go Back to Dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Booking;
