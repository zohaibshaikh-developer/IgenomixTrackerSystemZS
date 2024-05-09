// AddCooler.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hamburger from 'hamburger-react';
import BASE_URL from '../config/base_url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/warehouse1.jpg';


const AddCooler: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [coolerId, setCoolerId] = useState('');
    const [coolerName, setCoolerName] = useState('IGENOMIX');

    const [coolerIdValid, setCoolerIdValid] = useState(true);
    const [coolerNameValid, setCoolerNameValid] = useState(true);

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
        if (!coolerId.trim()) {
            setCoolerIdValid(false);
            return;
        } else {
            setCoolerIdValid(true);
        }

        if (!coolerName.trim()) {
            setCoolerNameValid(false);
            return;
        } else {
            setCoolerNameValid(true);
        }

        const coolerIdNumber = parseInt(coolerId, 10);

        setSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${BASE_URL}/add-cooler`, {
                coolerID: coolerIdNumber,
                coolerName: coolerName,
            });

            const responseData = response.data;

            if (response.status !== 200) {
                if (response.status === 401) {
                    throw new Error(responseData.message || 'Cooler ID already exists. Use another ID.');
                } else {
                    // Handle other status codes
                    throw new Error(responseData.message || 'Failed to add cooler');
                }
            }

            navigate('/list-coolers', { state: { message: responseData.message || 'Cooler added successfully' } });
        } catch (error: any) {
            console.error('Error adding cooler:', error);
            setErrorMessage((error.response?.data?.message || 'Failed to add cooler. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: { target: { value: string; }; }) => {
        const input = e.target.value.trim();
        setCoolerName(input);
        setCoolerNameValid(input !== ''); // Validate only if input is not empty
    };


    return (
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
                            style={{ fontFamily: 'Lugrasimo, cursive' }}
                        >
                            Add Cooler
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
                                <h1>Add Cooler</h1>
                                <p className='mt-2'>Fill in the details below to add a new cooler.</p>
                            </div>
                        </div>

                        <form className="p-6 space-y-9 min-w-full text-left">
                            <div className="mb-4 relative min-w-full">
                                <label className='text-black font-semibold block text-md mb-3'>Cooler ID</label>
                                <input
                                    className={`w-full p-1.5 input-style ${!coolerIdValid ? 'border-red-500' : ''}`}
                                    id="coolerid"
                                    type="text"
                                    placeholder="Cooler ID"
                                    value={coolerId}
                                    onChange={(e) => {
                                        setCoolerId(e.target.value);
                                        setCoolerIdValid(!!e.target.value.trim());
                                    }}
                                    required
                                />
                                {!coolerIdValid && <p className="text-red-500 text-sm mt-1">Cooler ID is required</p>}
                            </div>
                            <div className="mb-4 relative min-w-full">
                                <label className='text-black font-semibold block text-md mb-3'>Cooler Name</label>
                                <input
                                    className={`w-full p-1.5 input-style ${!coolerNameValid ? 'border-red-500' : ''}`}
                                    id="coolername"
                                    type="text"
                                    placeholder="Cooler Name"
                                    value={coolerName || 'IGENOMIX'} // Default value set to 'Igenomix'
                                    onChange={handleChange}

                                    required={!coolerNameValid} // Set required attribute conditionally
                                    disabled // Disable the input field
                                />
                                {!coolerNameValid && <p className="text-red-500 text-sm mt-1">Cooler Name is required</p>}
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
    );
};

export default AddCooler;
