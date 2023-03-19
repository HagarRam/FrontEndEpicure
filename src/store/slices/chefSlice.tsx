import { createSlice } from '@reduxjs/toolkit';
import { IChef } from '../../components/ChefPage/ChefPage';

const data = async () => {
	try {
		const response = await fetch('http://localhost:8000/chef/', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};

const chefs: IChef[] = await data();
export const chefSlice = createSlice({
	name: 'chef',
	initialState: {
		value: chefs,
		filteredValue: chefs,
	},
	reducers: {
		setAllchefs: (state) => {
			state.filteredValue = state.value;
		},
		setNewChef: (state) => {
			state.filteredValue = state.value.filter((chef) => chef.newChef === true);
		},
		setMostView: (state) => {
			state.filteredValue = [...state.value].sort(
				(a: any, b: any) => b?.views - a?.views
			);
		},
		removeChef: (state, action) => {
			state.filteredValue = action.payload;
			state.value = action.payload;
		},
	},
});

export const { setAllchefs, setNewChef, setMostView, removeChef } =
	chefSlice.actions;

export default chefSlice.reducer;
