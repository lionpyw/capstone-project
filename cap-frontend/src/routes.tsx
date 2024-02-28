import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import ServiceProviders from "./pages/ServiceProviders";
import Consultants from "./pages/Consultants";
import ConsultantProfile from "./pages/ConsultantProfile";
import AppRequest from "./pages/AppRequest";
import Appointments from "./pages/Appointments";
import AppReqAll from "./pages/AppReqAll";
import Profile from "./pages/Profile";
import PrevAppoints from "./pages/PrevAppoints";
import AppView from "./pages/AppView";
import ClientDetail from "./pages/ClientDetail";
import Dash from "./pages/Dash";
import LiveRequestPage from "./pages/LiveRequestPage";
  
const router = createBrowserRouter([
    { path: "/",element: <Layout />, 
   children: [{index:true, element:<HomePage/>},
              {path: "login", element:<Login/>},
              {path: "register", element:<RegisterForm/>},
              {path:"contact", element:<ServiceProviders/>},
              {path:"consultants", element:<Consultants/>},
              {path:"home", element:<Dash/>},
              {path: "consultants/:id", element:<ConsultantProfile/>},
              {path:"consultants/:id/req_app", element:<AppRequest/>},
              {path:"appointment", element:<Appointments/>},
              {path:"appointment/:id", element:<AppView/>},
              {path:"appointment/:id/live", element:<LiveRequestPage/>},
              {path:"previous", element:<PrevAppoints/>},
              {path:"app_req_all", element:<AppReqAll/>},
              {path:"profile", element:<Profile/>},
              {path:"mypage", element:<ClientDetail/>}
  ]},
    
  ]);

export default router;