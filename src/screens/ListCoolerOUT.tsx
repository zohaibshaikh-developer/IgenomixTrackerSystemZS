import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hamburger from 'hamburger-react';
import BASE_URL from '../config/base_url';
import { useLocation } from 'react-router-dom';
import { FaTrash, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';

const Alert: React.FC<{ message: string; onClose: () => void }> = ({ message }) => {
    return (
        <div className="fixed top-16 md:top-4 lg:top-4 xl:top-4 left-1/2 transform -translate-x-1/2 bg-green-500 p-4 rounded-md shadow-md">
            <p className="text-white">{message}</p>
        </div>
    );
};


const UpdateModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    DateSent: any;
    clinicName: string;
    coolerID: string;
    SrNo: number;
    onUpdate: (SrNo: number, DateSent: string, clinicName: string, coolerID: string, newSrNo: number) => void;
}> = ({ isOpen, onClose, SrNo, onUpdate }) => {

    const [editableSrNo, setEditableSrNo] = useState(SrNo);
    const [newDateSent, setNewDateSent] = useState(new Date());
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedCooler, setSelectedCooler] = useState('');
    const [newSrNo] = useState(SrNo);

    interface Clinic {
        rowId: number; // Assuming rowId is of type number, adjust accordingly
        clinicName: string; // Assuming clinicName is of type string, adjust accordingly
    }

    const [clinicList, setClinicList] = useState<Clinic[]>([]);
    interface Cooler {
        rowId: number; // Assuming rowId is of type number, adjust accordingly
        coolerID: string; // Assuming coolerID is of type string, adjust accordingly
    }

    const [coolerList, setCoolerList] = useState<Cooler[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Fetch clinic and cooler list
        ListClinicData();
        ListCoolerData();
    }, []);

    const ListClinicData = async () => {
        try {
            // const response = await axios.get(`${BASE_URL}/list-clinics`);
            // setClinicList(response.data.data);
            const clinicNamesResponse = await axios.get(`${BASE_URL}/list-clinics`);
            const clinicNamesData = clinicNamesResponse.data.data;

            // Filter out empty, null, or undefined clinic names
            const filteredClinicNames = clinicNamesData.filter((clinic: any) => clinic.clinicName);

            setClinicList(filteredClinicNames.map((clinic: any) => clinic.clinicName));

        } catch (error) {
            console.error('Error fetching clinic list:', error);
        }
    };

    const ListCoolerData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/list-coolers`);
            setCoolerList(response.data.data);
        } catch (error) {
            console.error('Error fetching cooler list:', error);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);

        try {
            onUpdate(editableSrNo, newDateSent.toISOString(), selectedClinic, selectedCooler, newSrNo);
            setSubmitting(false);
            onClose();
        } catch (error) {
            console.error('Error updating clinic:', error);
            setSubmitting(false);
        }
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
                        />
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-8 text-white">Update clinic {SrNo}</h2>
                <form className="p-6 space-y-9 min-w-full text-left">
                    <div className="mb-4 relative min-w-full">
                        <label className="text-black font-semibold block text-md mb-3">Sr No</label>
                        <input
                            type="text"
                            className="w-full p-1.5 input-style"
                            value={editableSrNo}
                            onChange={(e) => setEditableSrNo(parseInt(e.target.value, 10))}
                            required
                        />
                    </div>
                    <div className="mb-4 relative min-w-full">
                        <label className="text-black font-semibold block text-md mb-3">Date Sent</label>
                        <DatePicker
                            selected={newDateSent}
                            onChange={(date) => setNewDateSent(date || new Date())}
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-1.5 input-style"
                            placeholderText="Select Date"
                            required
                        />
                    </div>
                    <div className="mb-4 relative min-w-full">
                        <label className="text-black font-semibold block text-md mb-3">Clinic Name</label>
                        <select
                            className="w-full p-1.5 input-style"
                            value={selectedClinic}
                            onChange={(e) => setSelectedClinic(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Clinic</option>
                            {clinicList.map((clinic) => (
                                <option key={clinic.rowId} value={clinic.clinicName}>
                                    {clinic.clinicName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 relative min-w-full">
                        <label className="text-black font-semibold block text-md mb-3">Cooler ID</label>
                        <select
                            className="w-full p-1.5 input-style"
                            value={selectedCooler}
                            onChange={(e) => setSelectedCooler(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select Cooler ID</option>
                            {coolerList.map((cooler) => (
                                <option key={cooler.rowId} value={cooler.coolerID}>
                                    {cooler.coolerID}
                                </option>
                            ))}
                        </select>
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
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};




const DeleteConfirmationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onDelete: (SrNo: number) => void;
    SrNo: number;
    DateSent: string,
    clinicName: string;
    coolerID: string;
}> = ({ isOpen, onClose, onDelete, SrNo, DateSent, clinicName, coolerID }) => {
    const handleDelete = () => {
        onDelete(SrNo);
        onClose();
    };


    return (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="p-6 rounded-xl shadow-md w-96" style={{ background: 'linear-gradient(135deg, #ff5252, #ff7675)' }}>

                <h2 className="text-2xl font-semibold mb-4 text-white">Delete Sent Cooler</h2>
                <p className="text-white">Are you sure you want to delete sent cooler : <br></br> <br></br> Sr_No :   {SrNo} <br></br> Date Sent: {DateSent}  <br></br>Cooler Name : {clinicName} <br></br> Cooler ID : {coolerID}</p>
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





const ListCoolerOUT: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);
    const [alert, setAlert] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
    const [clinics, setclinics] = useState<any[]>([]);
    const location = useLocation();
    const [filterText, setFilterText] = useState('');

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDeleteclinic, setSelectedDeleteclinic] = useState({ SrNo: 0, clinicName: '', DateSent: '', coolerID: '' });



    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        setBodyOverflowHidden(!isBodyOverflowHidden);
    };

    const [isLoading, setIsLoading] = useState(true);

    const [filteredclinics, setFilteredclinics] = useState<any[]>(clinics);

    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedclinic] = useState({ SrNo: 0, clinicName: '', DateSent: '', coolerID: '' });



    const handleUpdate = async (SrNo: number, DateSent: string, clinicName: string, coolerID: string, newSrNo: number) => {

        try {
            const response = await axios.put(`${BASE_URL}/update-clinicBySr_No/${SrNo}`, {
                clinicSr_No: newSrNo,
                clinicName: clinicName,
                DateSent: DateSent,
                coolerID: coolerID,
            });

            if (response.data.status === 200) {
                setAlert({ message: `Clinic with Sr.No ${SrNo} updated successfully.`, visible: true });

                // Set a timeout to clear the alert after 4000 milliseconds (4 seconds)
                setTimeout(() => {
                    setAlert({ message: '', visible: false });

                    // Call fetchDataListclinic immediately after clearing the alert
                }, 5000);
                fetchDataListclinic();
            } else {
                // Handle error case if needed
                console.error('Error updating clinic:', response.data.message);
            }

            return response; // Return the response for additional handling if needed
        } catch (error) {
            // Handle network or other errors
            console.error('Error updating clinic:', error);
            throw error; // Re-throw the error for the modal to handle
        }
    };


    useEffect(() => {
        setFilteredclinics(
            clinics.filter((clinic) => clinic && clinic.clinicName && clinic.clinicName.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [clinics, filterText]);


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
        fetchDataListclinic();
    }, []);


    const fetchDataListclinic = () => {
        axios.get(`${BASE_URL}/list-coolerOUT`)
            .then((response) => {
                const data = response.data;
                if (data.status === 200) {
                    setclinics(data.data);
                    setIsLoading(false);
                } else {
                    setclinics([]);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setclinics([]);
                setIsLoading(false);
            });
    };


    useEffect(() => {
        setFilteredclinics(
            clinics.filter((clinic) => clinic && clinic.clinicName && clinic.clinicName.toLowerCase().includes(filterText.toLowerCase()))
        );
    }, [clinics, filterText]);


    const handleDelete = (SrNo: any, DateSent: any, clinicName: any, CoolerID: any) => {

        setSelectedDeleteclinic((prevclinic) => ({ ...prevclinic, SrNo, DateSent, clinicName, CoolerID }));
        setDeleteModalOpen(true);

        const activeElement = document.activeElement as HTMLElement;
        if (activeElement instanceof HTMLElement) {
            activeElement.blur();
        }
    }

    const handleDeleteConfirm = async (SrNo: any) => {
        try {
            const response = await axios.delete(`${BASE_URL}/delete-coolerOUTBySr_No/${SrNo}`);
            if (response.data.status === 200) {
                setAlert({ message: `Sent Cooler with Sr.No ${SrNo} deleted successfully.`, visible: true });
                setTimeout(() => {
                    setAlert({ message: '', visible: false });
                }, 5000);
                fetchDataListclinic();
            } else {
                console.error('Error deleting clinic:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting clinic:', error);
        }
    };

    const [, setFocusElement] = useState<HTMLElement | null>(null);


    return (
        <>
            {(!isSidebarOpen || window.innerWidth >= 768) && !isLoading && (
                // <div className='flex items-center justify-center fixed top-4 left-8 transform z-50'>
                <div className={`ml-4 ${isSidebarOpen ? 'ml-28 xl:ml-56 lg:ml-56 md:ml-56' : 'ml-9'} relative text-black text-start text-3xl mt-[-4%] md:mt-[-1%] lg:mt-[-1%] xl:mt-[-1%]`} style={{ fontFamily: 'Lugrasimo, cursive' }}>
                    List Of Sent Coolers
                </div>
                // </div>
            )}
            {alert.visible && <Alert message={alert.message} onClose={function (): void {
                throw new Error('Function not implemented.');
            }} />}

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


                            <UpdateModal
                                isOpen={isUpdateModalOpen}
                                onClose={() => setUpdateModalOpen(false)}
                                SrNo={selectedclinic.SrNo}
                                DateSent={selectedclinic.DateSent}
                                clinicName={selectedclinic.clinicName}
                                coolerID={selectedclinic.coolerID}
                                onUpdate={handleUpdate}
                            />

                        </div>


                        <div className="flex flex-col items-center justify-center mt-2 overflow-y-auto">
                            {/* ... (your existing code) */}


                            <DeleteConfirmationModal
                                isOpen={isDeleteModalOpen}
                                onClose={() => setDeleteModalOpen(false)}
                                onDelete={handleDeleteConfirm}
                                SrNo={selectedDeleteclinic.SrNo}
                                DateSent={selectedDeleteclinic.DateSent}
                                clinicName={selectedDeleteclinic.clinicName}
                                coolerID={selectedDeleteclinic.coolerID}
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

                            {filteredclinics.length > 0 ? (
                                <div className="text-black w-full overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr className="bg-cyan-500 text-white text-lg">
                                                <th className="py-2 px-2 lg:px-4 w-1/6 border-r">Sr.No</th>
                                                <th className="py-2 px-2 lg:px-4 border-r">Date Sent</th>
                                                <th className="py-2 px-2 lg:px-4 border-r">Clinic Name</th>
                                                <th className="py-2 px-2 lg:px-4 border-r">Cooler ID</th>
                                                <th className="py-2 px-2 lg:px-4 w-1/6 p-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredclinics.map((coolerOUT, index) => (
                                                <tr key={index} className="border-t font-medium">
                                                    <td className="py-2 px-2 lg:px-4 border-r">{coolerOUT.Sr_No}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{coolerOUT.DateSent}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{coolerOUT.clinicName}</td>
                                                    <td className="py-2 px-2 lg:px-4 border-r">{coolerOUT.coolerID}</td>
                                                    <td className="py-2 px-2 lg:px-4 flex items-center justify-center space-x-3">
                                                        {/* <button
                                                            className="mr-2 bg-transparent border-none p-2"
                                                            onClick={() => {
                                                                handleEdit(coolerOUT);
                                                                setFocusElement(document.body);
                                                            }}
                                                        >
                                                            <FaPencilAlt className="text-black hover:text-cyan-500" />
                                                        </button> */}
                                                        <button
                                                            className="mr-2 bg-transparent border-none p-2"
                                                            onClick={() => {
                                                                handleDelete(coolerOUT.Sr_No, coolerOUT.DateSent, coolerOUT.clinicName, coolerOUT.coolerID);
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

export default ListCoolerOUT;
