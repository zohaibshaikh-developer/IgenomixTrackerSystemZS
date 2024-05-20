// CoolerOUT.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hamburger from 'hamburger-react';
import BASE_URL from '../config/base_url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/blur-hospital.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface Clinic {
    rowId: number;
    clinicName: string;
    // Add other properties if needed
}

interface Cooler {
    rowId: number;
    coolerID: string;
    // Add other properties if needed
}

const CoolerOUT: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [dateSent, setDateSent] = useState<Date>(new Date());

    const [clinicList, setClinicList] = useState<Clinic[]>([]);
    const [coolerList, setCoolerList] = useState<Cooler[]>([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedCooler, setSelectedCooler] = useState('');

    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        // Fetch clinic list
        ListClinicData();
        ListCoolerData();
    }, []);

    // const ListClinicData = async () => {
    //     setIsLoading(true);

    //     try {
    //         // const response = await axios.get(`${BASE_URL}/list-clinics`);

    //         const clinicNamesResponse = await axios.get(`${BASE_URL}/list-clinics`);
    //         const clinicNamesData = clinicNamesResponse.data.data;

    //         // Filter out empty, null, or undefined clinic names
    //         const filteredClinicNames = clinicNamesData.filter((clinic: any) => clinic.clinicName);
    //         setClinicList(filteredClinicNames.map((clinic: any) => clinic.clinicName));

    //         // setClinicList(response.data.data);
    //         setIsLoading(false);

    //     } catch (error) {
    //         console.error('Error fetching clinic list:', error);
    //         setIsLoading(false);

    //     }
    // };


    const ListClinicData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/list-clinics`);

            // Filter out entries with missing or empty clinicName
            const filteredData = response.data.data.filter((clinic: { clinicName: string; }) => clinic.clinicName && clinic.clinicName.trim() !== "");

            setClinicList(filteredData);
        } catch (error) {
            console.error('Error fetching clinic list:', error);
        } finally {
            setIsLoading(false);
        }
    };



    const ListCoolerData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get(`${BASE_URL}/list-coolers`);
            setCoolerList(response.data.data);
            setIsLoading(false);

        } catch (error) {
            console.error('Error fetching cooler list:', error);
            setIsLoading(false);

        }
    };

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        setBodyOverflowHidden(!isBodyOverflowHidden);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.body.style.overflow = 'auto';
            } else {
                document.body.style.overflow = isBodyOverflowHidden ? 'hidden' : 'hidden';
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isBodyOverflowHidden]);


    const handleSubmit = async () => {
        try {
            setSubmitting(true);

            const formattedDate = dateSent.toLocaleDateString('en-GB');
            const coolerIDValue = parseInt(selectedCooler, 10);

            // Replace hard-coded data with dynamic data from your component's state or props
            const requestBody = {
                DateSent: formattedDate,
                clinicName: selectedClinic,
                coolerID: coolerIDValue,
            };

            const response = await axios.post(`${BASE_URL}/add-coolerOUT`, requestBody);


            if (response.status === 200) {
                // Success: Redirect to list-coolersOUT page with success message
                navigate('/list-coolerOUT', { state: { message: response.data.message || 'Sent Cooler Data Inserted Successfully' } });
            } else {
                // Handle other status codes
                throw new Error(response.data.message || 'Failed to insert Sent Cooler data');
            }

        } catch (error: any) {
            console.error('Error submitting data:', error);
            setErrorMessage(error.response?.data?.message || 'Error submitting data. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };






    return (

        <>
            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p className="loading-text">Loading</p>
                </div>
            )}

            {!isLoading && (
                <div className="flex items-start justify-start h-screen">
                    <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                    <div className={`flex-1 p-10 ${isSidebarOpen ? 'lg:ml-44 xl:ml-44' : ''}`}>
                        <div className="flex items-center justify-center fixed top-1.5 left-2 transform z-50">
                            <Hamburger
                                size={26}
                                toggled={isSidebarOpen}
                                toggle={toggleSidebar}
                                distance="lg"
                                duration={0.7}
                                color="#19c4a6"
                            />

                            {(!isSidebarOpen || window.innerWidth >= 768) && (
                                <div
                                    className={`ml-4 ${isSidebarOpen ? 'ml-28 xl:ml-52 lg:ml-52 md:ml-52' : 'ml-2'
                                        } text-black text-3xl mt-2`}
                                    style={{ fontFamily: 'Merriweather, serif' }}
                                >
                                    Send Cooler
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-center h-screen mt-[-5%]">
                            <div className="wrapper bg-white shadow-lg p-0 rounded-lg">
                                <div
                                    className="wrapper relative bg-cyan-400 shadow-lg p-10 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${backgroundImg})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                >
                                    <div className="overlay absolute inset-0 bg-black opacity-50 rounded-lg"></div>
                                    <div className="p-5 text-white z-10 relative">
                                        <h1>Send Cooler</h1>
                                        <p className='mt-2'>Fill in the details below to add a new Send Cooler entry.</p>
                                    </div>
                                </div>

                                <form className="p-6 space-y-9 min-w-full text-left">


                                    <div className="mb-4 relative min-w-full">
                                        <label className='text-black font-semibold block text-md mb-3'>Date Sent</label>
                                        <DatePicker
                                            selected={dateSent}
                                            onChange={(date) => setDateSent(date || new Date())}
                                            dateFormat="dd/MM/yyyy"
                                            className="w-full p-1.5 input-style"
                                            placeholderText="Select Date"
                                            required
                                        />
                                    </div>

                                    {/* Clinic Name Dropdown */}
                                    <div className="mb-4 relative min-w-full">
                                        <label className='text-black font-semibold block text-md mb-3'>Clinic Name</label>
                                        <select
                                            className="w-full p-1.5 input-style"
                                            value={selectedClinic}
                                            onChange={(e) => setSelectedClinic(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Clinic</option>
                                            {clinicList.map((clinic: Clinic) => (
                                                <option key={clinic.rowId} value={clinic.clinicName}>
                                                    {clinic.clinicName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Cooler ID Dropdown */}
                                    <div className="mb-4 relative min-w-full">
                                        <label className='text-black font-semibold block text-md mb-3'>Cooler ID</label>
                                        <select
                                            className="w-full p-1.5 input-style"
                                            value={selectedCooler}
                                            onChange={(e) => setSelectedCooler(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Cooler ID</option>
                                            {coolerList.map((cooler: Cooler) => (
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


                                    {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CoolerOUT;
