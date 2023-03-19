import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import './ChefPage.css';
import ChefPageFilter from '../ChefPageFilter/ChefPageFilter';
import NavBar from '../NavBar/NavBar';
import ImageChef from '../ImageCard/ImageCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { ObjectId } from 'mongoose';
import AddChef from '../AddChef/AddChef';

export interface IChef {
	_id?: ObjectId;
	id?: number;
	name: string;
	restaurant?: ObjectId[];
	age?: number;
	icons?: string;
	img: string;
	description?: string;
	chefOfTheWeek?: boolean;
	newChef?: boolean;
	views?: number;
	key?: number;
}

export interface IChefState {
	value: IChef[];
	filteredValue: IChef[];
}

const ChefsPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const chefData = useSelector((state: Rootstate) => state.chef.filteredValue);
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div>
			<NavBar />
			<div id="mobile-title">CHEFS</div>
			<ChefPageFilter />
			{data._id === '640dae4cd58da0771cc7b736' && (
				<button
					id="add-rest"
					type="submit"
					onClick={openModal}>
					ADD CHEF
				</button>
			)}
			<div id="allthechefs">
				{chefData.map((chef: IChef) => {
					return (
						<ImageChef
							name={chef.name}
							img={chef.img}
							id={chef.id}
							key={chef.id}
							_id={chef._id}
						/>
					);
				})}
			</div>
			<Footer />
			{isModalOpen && <AddChef closeButton={closeModal} />}
		</div>
	);
};

export default ChefsPage;
