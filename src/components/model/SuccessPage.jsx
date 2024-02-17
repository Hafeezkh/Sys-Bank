import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";

const SuccessPage = () => {

  return (
    <div className="p-4 container flex-col flex items-center mb-8">
      <div className="box p-9 bg-blue-200 shadow-md rounded-md mb-8" style={{ width: '40%', margin: '0 auto' }}>
        <div className='flex items-center justify-center p-4'>
          <h1 className="text-2xl p-2 font-bold bg-sky-500 rounded-md text-white relative z-[99] border-b-[1px]  border-primary/50 bg-gradient-to-l shadow-lg" style={{ fontSize: '24px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
            Transaction Successful!
          </h1>
        </div>
        <div className="user-details-box-container">
          <div className="container p-3 flex-col " style={{ fontFamily: 'sans-serif'  }}>
            <h2 className='flex items-center justify-center p-4'>
              <FaCheckCircle className="text-green-500 mr-2" style={{ fontSize: '10em' }} />
            </h2>
            <div className="pt-9 flex justify-center space-x-6 p-3 items-center gap">
              <Link to="/customer-list" className="button-link">
                <button className="rounded-md border-2  bg-primary px-4 py-2 text-sm  text-white transition-colors duration-300 hover:bg-primary/80">
                  Customer List
                </button>
              </Link>
              <Link to="/" className="button-link">
                <button className="rounded-md border-2  bg-violet-900 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                  Home
                </button>
              </Link>
              <Link to="/transfer-history" className="button-link">
                <button className="rounded-md border-2  bg-emerald-500 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                  Transfer History
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
