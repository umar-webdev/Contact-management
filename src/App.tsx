import {  Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Shared/Layout";
import Dashboard from "./Components/Dashboard";
import Contact from "./Components/Contact";
import 'react-toastify/dist/ReactToastify.css';
import Contactform from "./Components/Contactform";
import EditCoontact from "./Components/EditCoontact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route index element={<Dashboard/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="/add" element={<Contactform/>} />
        <Route path="/edit/:id" element={<EditCoontact/>} />
        </Route>
      </Routes>
     
    </BrowserRouter>

  );
}

export default App;
