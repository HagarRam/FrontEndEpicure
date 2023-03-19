import React, { useState } from 'react';
import {
	setAllchefs,
	setMostView,
	setNewChef,
} from '../../store/slices/chefSlice';
import './ChefPageFilter.css';
import { useDispatch } from 'react-redux';
const ChefPageFilter: React.FC = () => {
	const dispatch = useDispatch();
	const [isActiveAll, setIsActiveAll] = useState<boolean>(false);
	const [isActiveNew, setIsActiveNew] = useState<boolean>(false);
	const [isActiveMost, setIsActiveMost] = useState<boolean>(false);

	return (
		<div id="filterchef">
			<button
				className={isActiveAll ? 'filter-button' : 'without-filter-button'}
				onClick={() => {
					dispatch(setAllchefs());
					setIsActiveAll(true);
					setIsActiveMost(false);
					setIsActiveNew(false);
				}}>
				All
			</button>
			<button
				className={isActiveNew ? 'filter-button' : 'without-filter-button'}
				onClick={() => {
					dispatch(setNewChef());
					setIsActiveAll(false);
					setIsActiveMost(false);
					setIsActiveNew(true);
				}}>
				New
			</button>
			<button
				className={isActiveMost ? 'filter-button' : 'without-filter-button'}
				onClick={() => {
					dispatch(setMostView());
					setIsActiveAll(false);
					setIsActiveMost(true);
					setIsActiveNew(false);
				}}>
				Most Viewed
			</button>
		</div>
	);
};

export default ChefPageFilter;
