import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css';
import LogoImage from '../assets/IGENOMIX_PartOfVitrolifeGroup_black.png';
import { Link } from 'react-router-dom';

interface SidebarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [shouldRenderContent, setShouldRenderContent] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    // Clear timeout if sidebar is closed
    return () => clearTimeout(timeoutId);
  }, [isSidebarOpen]);

  // Listen to changes in isSidebarOpen and trigger rendering
  useEffect(() => {
    if (isSidebarOpen) {
      // Delay the rendering of content by 1000 milliseconds (adjust as needed)
      const timeoutId = setTimeout(() => {
        setShouldRenderContent(true);
      }, 500);

      // Clear the timeout if the component unmounts or isSidebarOpen changes
      return () => clearTimeout(timeoutId);
    } else {
      // If sidebar is closed, reset shouldRenderContent
      setShouldRenderContent(false);
    }
  }, [isSidebarOpen]);

  return (
    <div className={`sidebar ${isSidebarOpen ? 'lg:w-60 md:w-60 sm:w-20 w-40' : 'lg:w-0'} md:w-0 sm:w-0 w-0 z-50`}>
      {shouldRenderContent && (
        <div className={`nav-content ${isSidebarOpen ? 'lg:text-center md:text-center sm:text-center text-center' : ''}`}>
          <div className="logo-container p-4">
            <img className="logo w-full h-32 mt-[30%] " draggable={false} onContextMenu={(e) => e.preventDefault()} src={LogoImage} alt="logo" loading="lazy" />
            <span className="font-playfair text-[135%] font-bold italic">Tracking System</span>
          </div>
          <ul className='mt-[25%] font-semibold font-merriweather text-xl space-y-3 md:space-y-5 lg:space-y-5 xl:space-y-5' style={{ fontFamily: 'Merriweather' }}> 
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-cooler">Add Cooler</Link></li>
            <li><Link to="/list-coolers">List Cooler</Link></li>
            <li><Link to="/add-clinic">Add Clinic</Link></li>
            <li><Link to="/list-clinics">List Clinic</Link></li>
            <li><Link to="/cooler-out">Cooler OUT</Link></li>
            <li><Link to="/list-coolerOUT">List Cooler OUT</Link></li>
            <li><Link to="/cooler-in">Cooler IN</Link></li>
            <li><Link to="/list-coolerIN">List Cooler IN</Link></li>
            <li><Link to="/list-overview">Overview</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
          {/* <ul className="terms-links">
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
