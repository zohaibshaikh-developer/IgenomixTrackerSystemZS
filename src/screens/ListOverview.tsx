import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hamburger from 'hamburger-react';
import BASE_URL from '../config/base_url';
import { useLocation } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaTimes } from 'react-icons/fa';

import axios from 'axios';

const Alert: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
    return (
        <div className="fixed top-16 md:top-4 lg:top-4 xl:top-4 left-1/2 transform -translate-x-1/2 bg-green-500 p-4 rounded-md shadow-md">
            <p className="text-white">{message}</p>
        </div>
    );
};


const UpdateoverviewModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    overviewId: number;
    overviewName: string;
    onUpdate: (overviewId: number, overviewName: string) => void;
}> = ({ isOpen, onClose, overviewId, overviewName, onUpdate }) => {
    const [newoverviewId, setNewoverviewId] = useState(overviewId);
    const [newoverviewName, setNewoverviewName] = useState(overviewName);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setNewoverviewId(overviewId);
        setNewoverviewName(overviewName);
    }, [overviewId, overviewName]);

    const handleSubmit = () => {
        setSubmitting(true); // Set submitting to true on form submission


        onUpdate(overviewId, newoverviewName, newoverviewId)// Pass newoverviewId to the onUpdate function
            .then((response) => {
                // Handle success
                setSubmitting(false); // Reset submitting state on success
                onClose();
            })
            .catch((error) => {
                // Handle error
                console.error('Error updating overview:', error);
                setSubmitting(false); // Reset submitting state on error
                // You can also show an error message to the user here
            })
    };

    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="p-6 rounded-xl shadow-md w-96" style={{ background: 'linear-gradient(135deg, #07a3b2, #a0f1ea)' }}>
                <div className="flex justify-end">
                    <button className="bg-transparent border-none p-0 mb-3" onClick={onClose}>
                        <FaTimes
                            className="text-black rounded-full p-1 text-3xl hover:text-white"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #25aae1,  #04befe, #3f86ed)',
                                boxShadow: '0 1px 2px 0 black',
                            }}
                        />                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-8 text-white">Update overview {overviewId}</h2>
                <div className='space-y-7'>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-white text-start mb-3">overview ID</label>
                        <input
                            type="text"
                            value={newoverviewId}
                            // readOnly
                            onChange={(e) => setNewoverviewId(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-white text-start mb-3">overview Name</label>
                        <input
                            type="text"
                            value={newoverviewName}
                            onChange={(e) => setNewoverviewName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <button
                        className={`btn-hoverFormSubmit color-1 relative ${submitting ? 'cursor-not-allowed opacity-75' : ''}`}
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <div className="absolute inset-0 flex items-center justify-center ">
                                <svg
                                    className="animate-spin h-5 w-5 border-t-5 border-blue-200 rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 6a2 2 0 100-4 2 2 0 000 4zM4 6a2 2 0 100-4 2 2 0 000 4zM20 12a2 2 0 100-4 2 2 0 000 4zM4 12a2 2 0 100-4 2 2 0 000 4zM18 18a2 2 0 100-4 2 2 0 000 4zM6 18a2 2 0 100-4 2 2 0 000 4zM20 18a2 2 0 100-4 2 2 0 000 4zM12 20a8 8 0 100-16 8 8 0 000 16z" />
                                </svg>
                            </div>
                        ) : (
                            'Update'
                        )}

                    </button>
                </div>
            </div>
        </div>
    );
};



const DeleteConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onDelete: (overviewId: number) => void;
    overviewId: number;
    overviewName: string;
}> = ({ isOpen, onClose, onDelete, overviewId, overviewName }) => {
    const handleDelete = () => {
        onDelete(overviewId);
        onClose();
    };


    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="p-6 rounded-xl shadow-md w-96" style={{ background: 'linear-gradient(135deg, #ff5252, #ff7675)' }}>

                <h2 className="text-2xl font-semibold mb-4 text-white">Delete overview</h2>
                <p className="text-white">Are you sure you want to delete overview : <br></br> Sr No {overviewId} - Name {overviewName}</p>
                <div className="flex items-center justify-center mt-8">
                    <button
                        className="btn-hoverFormSubmit color-1 mr-2"
                        onClick={handleDelete}
                    >
                        Yes
                    </button>
                    <button
                        className="btn-hoverFormSubmit color-2"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};





const ListOverview: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);
    const [alert, setAlert] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
    const [overviews, setoverviews] = useState<any[]>([]);
    const location = useLocation();
    const [filterText, setFilterText] = useState('');

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDeleteoverview, setSelectedDeleteoverview] = useState({ overviewId: 0, overviewName: '' });



    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        setBodyOverflowHidden(!isBodyOverflowHidden);
    };

    const [isLoading, setIsLoading] = useState(true);

    const [filteredoverviews, setFilteredoverviews] = useState<any[]>(overviews);

    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedoverview, setSelectedoverview] = useState({ overviewId: 0, overviewName: '' });

    const handleEdit = (id, name) => {
        setUpdateModalOpen(true);
        setSelectedoverview((prevoverview) => ({ ...prevoverview, overviewId: id, overviewName: name }));


        const activeElement = document.activeElement as HTMLElement;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }
    };

    const handleUpdate = async (overviewId, overviewName, newoverviewId) => {

        try {
            const response = await axios.put(`${BASE_URL}/update-overview/${overviewId}`, {
                overviewID: newoverviewId,
                overviewName: overviewName,
            });

            if (response.data.status === 200) {
                setAlert({ message: `overview with ID ${overviewId} updated successfully.`, visible: true });

                // Set a timeout to clear the alert after 4000 milliseconds (4 seconds)
                setTimeout(() => {
                    setAlert({ message: '', visible: false });

                    // Call fetchDataListoverview immediately after clearing the alert
                }, 5000);
                fetchDataListoverview();
            } else {
                // Handle error case if needed
                console.error('Error updating overview:', response.data.message);
            }

            return response; // Return the response for additional handling if needed
        } catch (error) {
            // Handle network or other errors
            console.error('Error updating overview:', error);
            throw error; // Re-throw the error for the modal to handle
        }
    };


    useEffect(() => {
        setFilteredoverviews(
            overviews.filter((overview) => overview.clinicName && overview.clinicName.includes(filterText))
        );
    }, [overviews, filterText]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.body.style.overflow = 'auto';
            } else {
                document.body.style.overflow = isBodyOverflowHidden ? 'auto' : 'auto';
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isBodyOverflowHidden]);

    useEffect(() => {
        if (location.state && location.state.message) {
            setAlert({ message: location.state.message, visible: true });

            const timer = setTimeout(() => {
                setAlert({ message: '', visible: false });
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [location.state]);

    useEffect(() => {
        fetchDataListoverview();
    }, []);


    const fetchDataListoverview = () => {
        axios.get(`${BASE_URL}/list-Overviews`)
            .then((response) => {
                const data = response.data;
                if (data.status === 200) {
                    setoverviews(data.data);
                    setIsLoading(false);
                } else {
                    setoverviews([]);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setoverviews([]);
                setIsLoading(false);
            });
    }

    const handleDelete = (overviewId, overviewName) => {

        setSelectedDeleteoverview((prevoverview) => ({ ...prevoverview, overviewId, overviewName }));
        setDeleteModalOpen(true);

        const activeElement = document.activeElement as HTMLElement;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }
    }

    const handleDeleteConfirm = async (overviewId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-overviewBySrNo/${overviewId}`);
            if (response.data.status === 200) {
                setAlert({ message: `Overview with Sr No ${overviewId} deleted successfully.`, visible: true });
                setTimeout(() => {
                    setAlert({ message: '', visible: false });
                }, 5000);
                fetchDataListoverview();
            } else {
                console.error('Error deleting overview:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting overview:', error);
        }
    };

    const [focusElement, setFocusElement] = useState<HTMLElement | null>(null);


    return (
        <>
            {(!isSidebarOpen || window.innerWidth >= 768) && !isLoading && (
                // <div className='flex items-center justify-center fixed top-4 left-8 transform z-50'>
                <div className={`ml-4 ${isSidebarOpen ? 'ml-28 xl:ml-56 lg:ml-56 md:ml-56' : 'ml-9'} relative text-black text-start text-3xl mt-[-4%] md:mt-[-1%] lg:mt-[-1%] xl:mt-[-1%]`} style={{ fontFamily: 'Lugrasimo, cursive' }}>
                    Overview
                </div>
                // </div>
            )}
            {alert.visible && <Alert message={alert.message} />}

            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p className="loading-text">Loading</p>
                </div>
            )}

            {/* First row with five cards */}

            {!isLoading && (

                <div className="flex flex-col lg:flex-row xl:flex-col">
                    {/* Sidebar */}
                    {/* ... (your existing sidebar code) */}
                    <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                    {/* Main content */}
                    <div className={`flex-1 p-4 lg:p-10 ${isSidebarOpen ? 'lg:ml-52 xl:ml-52' : ''}`}>
                        {/* ... (your existing code) */}
                        <div className="flex items-center justify-center fixed top-1.5 left-2 transform z-50">
                            <Hamburger
                                size={26}
                                toggled={isSidebarOpen}
                                toggle={toggleSidebar}
                                distance="lg"
                                duration={0.7}
                                color="#19c4a6"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center mt-2 overflow-y-auto">
                            {/* ... (your existing code) */}


                            <UpdateoverviewModal
                                isOpen={isUpdateModalOpen}
                                onClose={() => setUpdateModalOpen(false)}
                                overviewId={selectedoverview.overviewId}
                                overviewName={selectedoverview.overviewName}
                                onUpdate={handleUpdate}
                            />
                        </div>


                        <div className="flex flex-col items-center justify-center mt-2 overflow-y-auto">
                            {/* ... (your existing code) */}


                            <DeleteConfirmationModal
                                isOpen={isDeleteModalOpen}
                                onClose={() => setDeleteModalOpen(false)}
                                onDelete={handleDeleteConfirm}
                                overviewId={selectedDeleteoverview.overviewId}
                                overviewName={selectedDeleteoverview.overviewName}
                            />

                        </div>

                        <div className="flex flex-col items-center justify-center mt-2 overflow-y-auto">
                            <form className="w-full mb-3 p-1">
                                <input
                                    className="form-control mb-4 w-full h-8 bg-cyan-500 p-2 font-semibold text-lg rounded-lg placeholder-white"
                                    type="text"
                                    placeholder="Search..."
                                    // Use the filter function based on your requirements
                                    value={filterText}
                                    onChange={(e) => setFilterText(e.target.value)}
                                />
                            </form>

                            {filteredoverviews.length > 0 ? (
                                <div className="text-black w-full overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr className="bg-cyan-500 text-white text-lg">
                                                <th className="py-2 px-2 lg:px-4 w-[8%] border-r">Sr.No</th>
                                                <th className="py-2 px-2 lg:px-4 w-[14%] border-r">Date Sent</th>
                                                <th className="py-2 px-2 lg:px-4 w-[8%] border-r">Cooler ID</th>
                                                <th className="py-2 px-2 lg:px-4 border-r">Clinic Name</th>
                                                <th className="py-2 px-2 lg:px-4 w-[14%] border-r">Date Received</th>
                                                <th className="py-2 px-2 lg:px-4 w-[10%] border-r">Status</th>
                                                <th className="py-2 px-2 lg:px-4 w-[22%] border-r">Duration</th>
                                                <th className="py-2 px-2 lg:px-4 w-[10%] p-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredoverviews.map((overview, index) => (
                                                <tr key={index} className="border-t font-medium">
                                                    <td className="py-2 px-2 lg:px-4 border-r">{overview.Sr_No}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{overview.DateSent}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{overview.coolerID}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{overview.clinicName}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">
                                                        {overview.dateReceived ? overview.dateReceived : 'Not Updated Yet'}
                                                    </td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{overview.status}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">
                                                        {overview.duration && overview.duration.includes(')') ? (
                                                            <>
                                                                {overview.duration.split(')')[0] + ')'} <br />
                                                                {overview.duration.split(')')[1].trim()}
                                                            </>
                                                        ) : (
                                                            // Handle the case when the format is not as expected
                                                            // You might want to display an error message or handle it in a way that fits your application logic
                                                            <span>Invalid duration format</span>
                                                        )}
                                                    </td>                                                    <td className="py-2 px-2 lg:px-4 flex items-center justify-center space-x-3">
                                                        {/* <button
                                                            className="mr-2 bg-transparent border-none p-2"
                                                            onClick={() => {
                                                                handleEdit(overview.overviewID, overview.overviewName);
                                                                setFocusElement(document.body); // Set focus to body after button click
                                                            }}
                                                        >
                                                            <FaPencilAlt className="text-lack hover:text-cyan-500" />
                                                        </button> */}
                                                        <button
                                                            className="mr-2 bg-transparent border-none p-2"
                                                            onClick={() => {
                                                                handleDelete(overview.Sr_No,overview.clinicName);
                                                                setFocusElement(document.body); // Set focus to body after button click
                                                            }}

                                                        >
                                                            <FaTrash className="text-red-500 hover:text-red-700" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-black text-center mt-4">No Data Found</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ListOverview;
