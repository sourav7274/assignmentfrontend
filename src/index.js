import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import App from './App';
import Admin from './pages/Admin';
import Details from './pages/PackageDetail';
import Booking from './pages/Booking';
import EditDetails from './pages/EditPackage';
import AddPackages from './pages/AddPackages';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/admin',
    element: <Admin/>
  },
  {
    path:'/packages/:id',
    element:<Details/>
  },
  {
    path:'/booking/:id',
    element:<Booking/>
  },
  {
    path:'/edit/:id',
    element:<EditDetails/>
  },
  {
    path:'/addPackage',
    element: <AddPackages/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

