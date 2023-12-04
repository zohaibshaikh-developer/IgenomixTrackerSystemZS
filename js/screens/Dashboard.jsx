// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Hamburger from 'hamburger-react';
import ChartComponentCoolerIN from '../components/ChartComponentCoolerIN';
import ChartComponentCoolerOUT from '../components/ChartComponentCoolerOUT';
import ChartComponentOverview from '../components/ChartComponentOverview';
import CardWithCounter from '../components/CardWithCounter';
import BASE_URL from '../config/base_url';
import axios from 'axios';
const Dashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);
    const [counts, setCounts] = useState({
        in: 0,
        out: 0,
        overview: 0,
        coolers: 0,
        clinics: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        setBodyOverflowHidden(!isBodyOverflowHidden);
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                document.body.style.overflow = 'auto';
            }
            else {
                document.body.style.overflow = isBodyOverflowHidden ? 'hidden' : 'hidden';
            }
        };
        // Set initial overflow based on window width
        handleResize();
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isBodyOverflowHidden]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/entries-counts-of-all-sheets`);
                const data = response.data;
                setCounts(data);
                setIsLoading(false); // Set loading to false after data is fetched
            }
            catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set loading to false in case of an error
            }
        };
        fetchData();
    }, []);
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    };
    // Calculate the start and end dates for the past 30 days
    const endDate = new Date(); // Current date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);
    return (<div className="flex items-start justify-start h-screen flex-col">
      {/* Sidebar */}
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
      {(!isSidebarOpen || window.innerWidth >= 768) && (<div className={`ml-4 ${isSidebarOpen ? 'ml-28 xl:ml-56 lg:ml-56 md:ml-56' : 'ml-8'} text-black text-3xl mt-[-4%] md:mt-[-1%] lg:mt-[-1%] xl:mt-[-1%]`} style={{ fontFamily: 'Lugrasimo, cursive' }}>
              Dashboard
            </div>)}
      {/* Main content */}
      <div className={`flex-1 p-10 ${isSidebarOpen ? ' lg:ml-48 xl:ml-48' : ''}`}>
        <div className="flex items-center justify-center fixed top-1.5 left-2 transform z-50">
          <Hamburger size={26} toggled={isSidebarOpen} toggle={toggleSidebar} distance="lg" duration={0.7} color="#19c4a6"/>

    
        </div>

        {isLoading && (<div className="loader-container">
            <div className="loader"></div>
            <p className="loading-text">Loading</p>
          </div>)}

        {/* First row with five cards */}

        {!isLoading && (<div>
            <div className={`flex  ${isSidebarOpen ? ' xl:space-x-28' : 'xl:space-x-56'} basis-10 relative top-0 xs:top-0 sm:top-0 md:top-3 lg:top-3 xl:top-3 transform flex-col md:flex-row left-[0%] lg:left-[1%] xl:left-[1%] space-y-4 md:space-y-2 lg:space-y-2 xl:space-y-2`}>
              <CardWithCounter title="Cooler IN" initialValue={counts.in}/>
              <CardWithCounter title="Cooler OUT" initialValue={counts.out}/>
              <CardWithCounter title="Overview" initialValue={counts.overview}/>
            </div>



            <div className={`flex  ${isSidebarOpen ? ' xl:space-x-28' : 'xl:space-x-56'} basis-10 relative top-0 xs:top-0 sm:top-0 md:top-16 lg:top-16 xl:top-16 transform flex-col md:flex-row left-[0%] lg:left-[1%] xl:left-[1%] mt-4  md:mt-0 lg:mt-0 xl:mt-0  space-y-4 md:space-y-2 lg:space-y-2 xl:space-y-2`}>
              <CardWithCounter title="Coolers" initialValue={counts.coolers}/>
              <CardWithCounter title="Clinics" initialValue={counts.clinics}/>
            </div>


            <div className="flex  top-0 xs:top-0 sm:top-0 md:top-28 lg:top-28 xl:top-28  relative mb-5 lg:left-[1%] xl:left-[1%] mt-6 md:mt-0 lg:mt-0 xl:mt-0">
              <h1 className="text-lg md:text-xl lg:text-xl xl:text-xl font-bold text-gray-800">
                Stats for the Past 30 Days [{formatDate(startDate)} to {formatDate(endDate)}]
              </h1>

            </div>



            <div className={`flex  ${isSidebarOpen ? ' xl:space-x-28' : 'xl:space-x-56'} basis-10 relative top-0 xs:top-0 sm:top-0 md:top-64 lg:top-64 xl:top-32 transform flex-col md:flex-row left-[0%] lg:left-[1%] xl:left-[1%]`}>
              <ChartComponentCoolerIN />
              <ChartComponentCoolerOUT />
              <ChartComponentOverview />
            </div>
          </div>)}
      </div>
    </div>);
};
export default Dashboard;
