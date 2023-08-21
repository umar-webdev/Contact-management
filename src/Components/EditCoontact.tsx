import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const EditCoontact = () => {

    interface contacts {
        id: number;
        firstname: string;
        lastname: string;
        number: number;
        status: string;
    }
    const { id } = useParams<{ id: string | undefined }>();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [number, setNumber] = useState("");
    const [status, setStatus] = useState("");
    const parsedId = id ? parseInt(id) : undefined;
    const contactss = useSelector((state: contacts[]) => state)
    const currentContact = contactss.find((contact) => contact.id === parsedId)
    useEffect(() => {
        if (currentContact) {
            setFirstname(currentContact.firstname);
            setLastname(currentContact.lastname);
            setNumber(currentContact.number.toString());
            setStatus(currentContact.status);
        }

    }, [currentContact])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkNumber = contactss.find(
            (contact) => contact.id !== parsedId && contact.number === parseInt(number))
        if (!firstname || !lastname || !number) {
            return toast.warning("Please fill in all feilds!");
        }
        if (checkNumber) {
            return toast.error("number already exists!")
        }
        const data = {
            id: parsedId,
            firstname,
            lastname,
            number,
            status
        }
        // Dispatch/Action
        dispatch({ type: "UPDATE_CONTACT", payload: data })
        toast.success("Contact updated successfully")
        navigate("/contact");
    };
    return (
        <div className="w-1/2 mx-auto my-4 pt-16">
            {currentContact ? (
                <>
                    <ToastContainer />
                    <div className="text-center">
                        <h2 className="text-2xl pb-5 font-bold mb-4">Edit Contact {id}</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="first-name">
                                First Name
                            </label>
                            <input
                                value={firstname} onChange={e => setFirstname(e.target.value)}
                                className="w-full border border-gray-400 p-2 rounded-md"
                                id="first-name"
                                type="text"
                                name="first_name"

                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="last-name">
                                Last Name
                            </label>
                            <input
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                                className="w-full border border-gray-400 p-2 rounded-md"
                                id="last-name"
                                type="text"
                                name="last_name"

                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="last-name">
                                Mobile Number
                            </label>
                            <input
                                className="w-full border border-gray-400 p-2 rounded-md"
                                id="last-name"
                                type="number"
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                name="mob"


                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                className="w-full border border-gray-400 p-2 rounded-md"
                                                                 
                                value={status} onChange={e => setStatus(e.target.value)}
                                name="status">
                                    <option value={'active'}>Active</option>
                                    <option value={"inactive"}>Inactive</option>

                            </select>
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            update Contact
                        </button>
                        <Link
                            to='/'
                            className="bg-red-500 ml-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Cancel
                        </Link>
                    </form>
                </>) : <div className="text-center">
                <h2 className="text-2xl pb-5 font-bold mb-4"> Contact didn't exists with this id:{id}</h2>
            </div>}

        </div>
    )
}

export default EditCoontact