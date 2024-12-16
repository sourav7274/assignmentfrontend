import { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addPackage } from '../action';

const AddPackages = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        destination: '',
        availableDates: '',
        image: '',
        category: ''
    });

    const uniqueDestinations = ['Mountain', 'Beach', 'Grasslands'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await addPackage(formData);
        // console.log(response)
        if (response) {
            alert('Package added successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                destination: '',
                availableDates: '',
                image: '',
                category: ''
            });
        }
    };

    return (
        <>
            <Header />
            <main className="container py-4">
                <h2 className="text-center mb-4">Add New Package</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Package Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="destination" className="form-label">Destination</label>
                        <input
                            type="text"
                            className="form-control"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="availableDates" className="form-label">Available Dates</label>
                        <input
                            type="date"
                            className="form-control"
                            id="availableDates"
                            name="availableDates"
                            value={formData.availableDates}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Category</option>
                            {uniqueDestinations.map((data) => <option value={data}>{data}</option> )}
                            <option value="Mountain">Mountain</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Add Package</button>
                </form>
            </main>
            <Footer />
        </>
    );
};

export default AddPackages;
