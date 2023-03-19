import React, { useState } from 'react';
import './RestaurantFilterBar.css';
import { useDispatch, useSelector } from 'react-redux';
import {
	setAllRestuarants,
	setPopularRestuarants,
	setNewRestuarants,
	setOpenNow,
	setMap,
} from '../../store/slices/restaurantsSlice';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';
import { Rootstate } from '../../store/store';
import checkIfRestaurantIsOpen from '../OpenClose/OpenClose';

const RestaurantFilterBar: React.FC = () => {
	const dispatch = useDispatch();
	const filteredRestaurants = useSelector(
		(state: Rootstate) => state.restaurants.filteredValue
	);
	const [isActiveAll, setIsActiveAll] = useState(false);
	const [isActiveNew, setIsActiveNew] = useState(false);
	const [isActiveMost, setIsActiveMost] = useState(false);
	const [isActiveOpen, setIsActiveOpen] = useState(false);
	const [isActiveMap, setIsActiveMap] = useState(false);

	const handleSetActive = (active: string) => {
		setIsActiveAll(false);
		setIsActiveNew(false);
		setIsActiveMost(false);
		setIsActiveOpen(false);
		setIsActiveMap(false);

		if (active === 'All') {
			dispatch(setAllRestuarants());
			setIsActiveAll(true);
		} else if (active === 'New') {
			dispatch(setNewRestuarants());
			setIsActiveNew(true);
		} else if (active === 'Most') {
			dispatch(setPopularRestuarants());
			setIsActiveMost(true);
		} else if (active === 'Map') {
			dispatch(setMap());
			setIsActiveMap(true);
		} else if (active === 'Open') {
			getOpenNowRestaurants(filteredRestaurants);
			setIsActiveOpen(true);
		}
	};

	const getOpenNowRestaurants = (restaurants: IRestaurants[]) => {
		let arr: IRestaurants[] = [];
		restaurants.forEach((restaurant: IRestaurants) => {
			if (checkIfRestaurantIsOpen(restaurant)) {
				arr.push(restaurant);
			} else {
			}
		});
		dispatch(setOpenNow(arr));
	};

	return (
		<div id="FilterRestaurant">
			<button
				className={isActiveAll ? 'filter-button' : 'without-filter-button'}
				onClick={() => handleSetActive('All')}>
				All
			</button>
			<button
				className={isActiveNew ? 'filter-button' : 'without-filter-button'}
				onClick={() => handleSetActive('New')}>
				New
			</button>
			<button
				className={isActiveMost ? 'filter-button' : 'without-filter-button'}
				onClick={() => handleSetActive('Most')}>
				Most Popular
			</button>
			<button
				className={isActiveOpen ? 'filter-button' : 'without-filter-button'}
				onClick={() => handleSetActive('Open')}>
				Open Now
			</button>
			<button
				className={isActiveMap ? 'filter-button' : 'without-filter-button'}
				onClick={() => handleSetActive('Map')}>
				Map View
			</button>
			{isActiveMap && <div className="Map-Container"></div>}
		</div>
	);
};

export default RestaurantFilterBar;
