// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAndSignupForm from './screens/LoginAndSignupForm';
import Dashboard from './screens/Dashboard';
import AddCooler from './screens/AddCooler';
import ListCooler from './screens/ListCooler';
import Listclinic from './screens/ListClinic';
import AddClinic from './screens/AddClinic';
import CoolerOUT from './screens/CoolerOUT';
import ListCoolerOUT from './screens/ListCoolerOUT';
import ListOverview from './screens/ListOverview';
import CoolerIN from './screens/CoolerIN';
import ListCoolerIN from './screens/ListCoolerIN';
const App = () => {
    return (<Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/" element={<LoginAndSignupForm />}/>
          <Route path="/add-cooler" element={<AddCooler />}/>
          <Route path="/list-coolers" element={<ListCooler />}/>
          <Route path="/add-clinic" element={<AddClinic />}/>
          <Route path="/list-clinics" element={<Listclinic />}/>
          <Route path="/cooler-out" element={<CoolerOUT />}/>
          <Route path="/list-coolerOUT" element={<ListCoolerOUT />}/>
          <Route path="/cooler-in" element={<CoolerIN />}/>
          <Route path="/list-coolerIN" element={<ListCoolerIN />}/>
          <Route path="/list-overview" element={<ListOverview />}/>
        </Routes>
      </div>
    </Router>);
};
export default App;
