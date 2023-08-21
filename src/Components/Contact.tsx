import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
interface Contacts {
  id: number;
  firstname: string;
  lastname: string;
  number: number;
  status: string;
}
const Contact = () => {
  const dispatch = useDispatch();
  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    toast.success("contact deleted sucessfully!")
  }
  const Contacts = useSelector((state: Contacts[]) => state);
  return (

    <div className="justify-center w-full ">
                  <ToastContainer />
      <div className="text-center">
        <div className="m-4">
          <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            <Link to="/add" className='text-white'>
              Create Contact
            </Link>
          </button>
        </div>

        <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                Contacts.map((contact, id) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={id}>
                    <td>{id + 1}</td>
                    <td>{contact.firstname}</td>
                    <td>{contact.number}</td>
                    <td>{contact.status}</td>

                    <td className="px-6 py-4">
                      <Link to={`/edit/${contact.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</Link>
                      <button onClick={() => deleteContact(contact.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Contact