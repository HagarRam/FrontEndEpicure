import { ObjectId } from 'mongoose';
import React, { useState } from 'react';
import AddRest from '../AddRest/AddRest';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import RangeBar from '../RangeBar/RangeBar';
import RestaurantCardsPage from '../RestaurantCardsPage/RestaurantCardsPage';
import RestaurantFilterBar from '../RestaurantFilterBar/RestaurantFilterBar';
import './RestaurantPage.css';

export interface IRestaurants {
	_id: ObjectId;
	id?: number;
	name: string;
	address?: string[];
	chef: string;
	chefid?: number;
	openHours?: string[];
	openDays?: number[];
	openYear?: number;
	img: string;
	dishes?: ObjectId[];
	rating: number;
	popular?: boolean;
	newRest?: boolean;
	openNow?: boolean;
	views?: number;
	locationLat?: number;
	locationLng?: number;
	title?: string;
	titleImg?: string;
	titleStar?: string;
}

export interface IrestaurantsState {
	value: IRestaurants[];
	filteredValue: IRestaurants[];
}

const RestaurantPage: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<NavBar />
			<div id="mobile-title">RESTAURANTS</div>
			<div>
				{data._id === '640dae4cd58da0771cc7b736' && (
					<button
						id="add-rest"
						type="submit"
						onClick={openModal}>
						ADD REST
					</button>
				)}
				<RestaurantFilterBar />
			</div>
			<RangeBar />
			{isModalOpen && <AddRest closeButton={closeModal} />}
			<RestaurantCardsPage />
			<Footer />
		</div>
	);
};

export default RestaurantPage;
