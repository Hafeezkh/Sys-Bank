import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from './components/home/Home';
import TransactPage from './components/pages/TransactPage';
import CustomerPageList from './components/pages/CustomerPageList';
import Footer from './components/footer/Footer';
import TransferHistoryTable from './components/pages/TransferHistoryTable';
import SuccessPage from './components/model/SuccessPage';
import LoadingPage from './components/model/LoadingPage';

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/customer-list" element={<CustomerPageList />} />
         <Route path="/transact/:userId" element={<TransactPage />} />
         <Route path="/transfer-history" element={<TransferHistoryTable />} />
         <Route path="/loading/:userId" element={<LoadingPage />} />
         <Route path="/success/:userId" element={<SuccessPage />} />
         </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;