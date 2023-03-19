import { createSlice } from '@reduxjs/toolkit';
import { useState } from 'react';
import { IDishes } from '../../components/SignatureDish/DishCard';
const data = async () => {
	try {
		const response = await fetch('http://localhost:8000/dishes/', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};

const dishes: IDishes[] = await data();

export const dishesSlice = createSlice({
	name: 'dishes',
	initialState: {
		value: dishes,
		filteredValue: dishes,
	},
	reducers: {
		createOrder: (state) => {
			state.filteredValue = state.value;
		},
		removeDish: (state, action) => {
			state.filteredValue = action.payload;
			state.value = action.payload;
		},
	},
});
export const { createOrder, removeDish } = dishesSlice.actions;
export default dishesSlice.reducer;
