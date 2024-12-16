import Header from '../components/Header'
import Footer from '../components/Footer'
import { getBookings, fetchData,deletePackage } from '../action'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Admin = () =>{
    const [bookingData,setData] = useState([])
    const [packageData,setPackageData] = useState([])
    const [message,setMessage] = useState("")
    const [dis,setDis] = useState(false)
    useEffect(() =>{
        const getData = async () =>{
            try{
                const data = await getBookings()
                if(data)
                {
                    setData(data)
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        getData()
    },[])
    useEffect(() =>{
        const getData = async () =>{
            try{
                const data = await fetchData()
                if(data)
                {
                    setPackageData(data)
                    setDis(false)
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        getData()
    },[])

    const handleDelete = async (id) =>{
        const response = await deletePackage(id); 
        if (response) {
            setMessage("Package deleted successfully!");
            setDis(true);

            setTimeout(() => {
                setDis(false) // Hide the success message after 5 seconds
            }, 5000)
            
            const updatedPackageData = await fetchData();
            setPackageData(updatedPackageData); 
        }

    }
    console.log(packageData)
    // console.log(bookingData)
    return(
        <>
            <Header/>
            <main className='container py-4'>
                <h1 className='text-center'>Welcome Admin</h1>
                { packageData.length != 0 ? 
                <> 
                    <div>
                        <h2>Package List</h2>
                        <div className='text-center my-3'>
                        <Link to='/addPackage' className='btn  btn-warning mb-3'>Add Package</Link>
                        </div>
                       
                        <ul className='list-group d-flex flex-column align-items-end'>
                            {packageData.map((data) => (
                            <li className='list-group-item d-flex justify-content-between align-items-center w-100'>
                                <div>
                                <b>Name: </b> {data.title} <br />
                                <b className='ms-3'>Price: </b>$ {data.price} <br />
                                <b className='ms-3'>Destination: </b>{data.destination}
                                </div>
                                <div>
                                <Link to={`/edit/${data._id}`} className="btn btn-primary ms-5">Edit</Link>
                                <button onClick={() => handleDelete(data._id)} className='btn btn-danger ms-5'>Delete</button>
                                </div>
                            </li>
                            ))}
                        </ul>
                        <p className='text-center text-success' style={{ display:dis ? "block" : "none"}}>{message}</p>
                    </div>
                </> : <p>Packages are Loading...</p> }
                { bookingData.length != 0 ? <>
                    <div className='mt-4'>
                    <h2>Booking List</h2>
                    <ul className='list-group'>
                        {bookingData.map((bData) => <li className='list-group-item mb-3'>
                            <p><b>Packege Name:{"   "}</b>{bData.packageName}</p>
                            <p><b>Customer Name:{"   "}</b>{bData.custName}</p>
                            <p><b>Customer Email ID:{"   "}</b>{bData.email}</p>
                            <p><b>Customer Phone Number :{"   "}</b>{bData.phoneNum}</p>
                            <p><b>Total Number of Pasengers:{"   "}</b>{bData.travelerNum}</p>
                            <p><b>Special Requests :{"   "}</b>{(bData.specialReq.length == 0 || bData.specialReq.toLowerCase() == "na" ) ?"No Special Requests" : bData.specialReq}</p>
                        </li>)}
                    </ul>
                    </div>
                </> : <p>Booking Details are Loading...</p>  }
                <Link to="/" className='btn btn-primary mt-5'>Back to DashBoard</Link>
            </main>
            <Footer/>
        </>
    )
}


export default Admin