import { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router';
interface Contact {
    id: number;
    firstname: string;
    lastname: string;
    number: number;
    status: string;
}

const Contactform = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");
    const contacts = useSelector((state: Contact[]) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkNumber = contacts.find(
            (contact) => contact.number === parseInt(number))
        if (!firstname || !lastname || !number) {
            return toast.warning("Please fill in all feilds!");
        }
        if (checkNumber) {
            return toast.error("number already exists!")
        }
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            firstname,
            lastname,
            number,
            status
        }
        // Dispatch/Action
        dispatch({type:"ADD_CONTACT",payload:data})
        toast.success("Contact added successfully")
        navigate("/contact");
    };
    return (
        <>
            <ToastContainer />
            <div className="w-1/2 mx-auto my-4 pt-16">
                <div className="text-center">
                    <h2 className="text-2xl pb-5 font-bold mb-4">Create Contact</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="first-name"> First Name </label>
                        <input className="w-full border border-gray-400 p-2 rounded-md" id="first-name" type="text" onChange={e => setFirstname(e.target.value)} value={firstname} name="first_name" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="last-name"> Last Name </label>
                        <input value={lastname} onChange={e => setLastname(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md" id="last-name" type="text" name="last_name" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="last-name"> Mobile Number </label>
                        <input value={number} onChange={e => setNumber(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md" id="last-name" type="number" name="mob" />
                    </div>
                    <div className="mb-4">
                        <label className="block font-bold mb-2" htmlFor="status"> Status </label>
                        <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md" id="status" name="status" >
                            <option value={'active'}>Active</option>
                            <option value={"inactive"}>Inactive</option>
                        </select>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'> Save Contact </button>
                </form>
            </div>
        </>
    );
};


export default Contactform