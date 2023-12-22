import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AdminDashBoard from './features/admindashboard/AdminDashBoard';
import Home from './Home/Home';
import AddHospital from './features/admindashboard/AddHospital';
import AddBed from './features/admindashboard/AddBed';
import HospitalDetails from './features/Hospital/HospitalDetails';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/admindashboard",
        element: <AdminDashBoard></AdminDashBoard>,
        children:[
          {
            path:"/admindashboard/addHospital",
            element:<AddHospital></AddHospital>
          },
          {
            path:"/admindashboard/addbed",
            element:<AddBed></AddBed>
          }
        ]
      },
      {
        path:"/details/:id",
        element: <HospitalDetails></HospitalDetails>

      },
      {
        path: "",
        element: <Home></Home>
      }
    //   {
    //     path: "/aboutus",
    //     element: <Aboutus/>,
    //   },
     ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
