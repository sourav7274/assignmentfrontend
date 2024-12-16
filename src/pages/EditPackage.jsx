import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { fetchDaybyId, editPackage } from "../action";
import { useEffect, useState } from "react";

const EditDetails = () => {
    const [detail, setDetail] = useState({
        title: "",
        description: "",
        availableDates: [],
        price: "",
        image: "",
    });
    const [message, setMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchDaybyId(id);
                if (data) {
                    setDetail(data);
                }
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };
        getData();
    }, [id]);

    const handleDateDelete = (date) => {
        const updatedDates = detail.availableDates.filter((d) => d !== date);
        setDetail((prev) => ({ ...prev, availableDates: updatedDates }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetail((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const updatedData = { ...detail, id }; 
            const response = await editPackage(updatedData); 
            setMessage(response.message || "Package updated successfully!"); 
        } catch (error) {
            console.error("Error updating package:", error);
            setMessage("Failed to update the package. Please try again.");
        }
    };
    

    return (
        <>
            <Header />
            <main className="container py-4">
                {detail ? (
                    <div className="my-4">
                        <label>Package Name:</label>
                        <input
                            type="text"
                            name="title"
                            value={detail.title}
                            onChange={handleChange}
                            placeholder="Package Name"
                            className="form-control mb-3"
                        />
                        <label>Package Description:</label>
                        <textarea
                            name="description"
                            value={detail.description}
                            onChange={handleChange}
                            placeholder="Package Description"
                            className="form-control mb-3"
                        />
                        <label>Current Available Dates:</label>
                        <ul className="list-group mb-3">
                            {detail.availableDates.map((date, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {new Date(date).toDateString()}
                                    <button
                                        onClick={() => handleDateDelete(date)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <label>Add Dates:</label>
                        <input
                            type="date"
                            onChange={(e) =>
                                setDetail((prev) => ({
                                    ...prev,
                                    availableDates: [...prev.availableDates, e.target.value],
                                }))
                            }
                            className="form-control mb-3"
                        />
                        <label>Price: $</label>
                        <input
                            type="number"
                            name="price"
                            value={detail.price}
                            onChange={handleChange}
                            placeholder="Price"
                            className="form-control mb-3"
                        />
                        <label>Edit Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            value={detail.image}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="form-control mb-3"
                        />
                        <img
                            className="mt-3 img-fluid"
                            style={{ maxWidth: "100%" }}
                            src={detail.image}
                            alt="Package"
                        />
                    </div>
                ) : (
                    <p>Data is still loading...</p>
                )}
                <div className="text-center">
                <button className="btn btn-success mb-3" onClick={handleSubmit}>
                    Finish Editing
                </button>
                </div>   
                {message && <p className="text-center text-success">{message}</p>}
                <div className="d-flex justify-content-between">
                    <Link to="/" className="btn btn-primary">
                        Back to Dashboard
                    </Link>
                    <Link to="/admin" className="btn btn-primary">
                        Back to Admin Dashboard
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default EditDetails;
