import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
	name: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const datausers = async () => {
	try {
		const response = await fetch('https://backendepicure.onrender.com/users', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {
		console.log();
	}
};
const users: IUser[] = await datausers();
export const userSlice = createSlice({
	name: 'users',
	initialState: {
		value: users,
		filteredValue: {},
	},
	reducers: {
		setAllUsers: (state) => {
			state.filteredValue = state.value;
		},
		setActiveUsers: (state, action) => {
			const currentUser = action.payload;
			const userLogIn = users.find((user: IUser) => {
				return user.email === currentUser.email;
			});
			console.log(userLogIn);
			state.filteredValue = userLogIn || {};
		},
	},
});

export const { setAllUsers, setActiveUsers } = userSlice.actions;

export default userSlice.reducer;
