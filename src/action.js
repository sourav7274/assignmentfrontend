import { data } from "react-router-dom"

export const fetchData = async () =>{
    const response = await fetch('https://assignment-backend-delta.vercel.app/packages',{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok)
    {
      console.log('Error fetching data')
    }
    else
    {
      const data = await response.json()
    //   console.log(data.package)
      return data.package
    }
  }

export const fetchDaybyId = async (id) => {
    const response = await fetch(`https://assignment-backend-delta.vercel.app/packages/${id}`,{
        method:"GET",
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    if(!response.ok)
    {
        console.log('Error fetching data')
    }
    else
    {
        const data = await response.json()
        // console.log(data.package)
        return data.package
    }
}

export const saveBookings = async (data) =>{
    const response = await fetch('https://assignment-backend-delta.vercel.app/bookings',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    if(!response.ok)
    {
        console.log('Error submitting booking')
    }
    else
    {
        const data = await response.json()
        if(data)
        {
            // console.log("Submit succesfull",data)
            return(true)
        }
    }
}


export const getBookings = async() =>{
    const response = await fetch('https://assignment-backend-delta.vercel.app/admin/bookings',{
        method:"GET",
        headers:{
            'Content-Type':'application/json'
        },
    })
    if(!response.ok)
    {
        console.log("Error fetching Booking Data")
    }
    else
    {
        const data = await response.json()
        // console.log(data.bookings)
        return data.bookings
    }
}


export const editPackage = async (data) => {
    const response = await fetch(`https://assignment-backend-delta.vercel.app/admin/packages/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update the package"); 
    }

    const result = await response.json();
    return result; 
};

export const addPackage = async (data) =>{
    const response = await fetch('https://assignment-backend-delta.vercel.app/admin/packages',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    if(!response.ok)
    {
        console.log("Error adding Package Data")
    }
    else
    {
        const data = await response.json()
        // console.log(data.bookings)
        return data
    }
}

export const deletePackage = async (id) =>{
    const response = await fetch(`https://assignment-backend-delta.vercel.app/admin/packages/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(!response.ok)
    {
        console.log("Error adding Package Data")
    }
    else
    {
        const data = await response.json()
        console.log(data)
        return data.message
    }
}