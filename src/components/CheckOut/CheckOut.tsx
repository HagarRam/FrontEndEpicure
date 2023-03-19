import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import YourOrderSubmit from '../YourOrder/YourOrderSubmit';
import CheckOutDetails from './CheckOutDetails';
import './CheckOut.css';

const CheckOut: React.FC = () => {
	return (
		<div>
			<NavBar />
			<div id="order-details">
				<CheckOutDetails />
				<YourOrderSubmit />
			</div>
			<Footer />
		</div>
	);
};

export default CheckOut;
