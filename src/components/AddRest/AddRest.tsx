import mongoose from 'mongoose';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { IChef } from '../ChefPage/ChefPage';
import { IRestaurants } from '../RestaurantPage/RestaurantPage';
import './AddModal.css';

interface IModal {
	closeButton: Function;
}

interface IAddRest {
	name: string;
	address: string[];
	chef: string;
	chefId: string;
	openHours: number[];
	openDays: number[];
	dishes: string[];
	rating: number;
	img: string;
}

const AddRest: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const chefData = useSelector((state: Rootstate) => state.chef.filteredValue);
	const restData = useSelector(
		(state: Rootstate) => state.restaurants.filteredValue
	);
	const [selectedChef, setSelectedChef] = useState('');
	const [rest, setRest] = useState<any>(restData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		name: '',
		address: '',
		chef: '',
		img: '',
		openDays: '',
		openHours: '',
		openYears: '',
		rating: '',
	});
	interface InputField {
		id: string;
		placeholder: string;
		type: string;
		title?: string;
		name: string;
	}
	const restDetails: InputField[] = [
		{
			id: 'name-input',
			placeholder: 'Enter restaurant name',
			type: 'text',
			title: 'Restaurant Name',
			name: 'name',
		},
		{
			id: 'chef-input',
			placeholder: 'Enter chef name',
			type: 'text',
			title: 'Chef Name',
			name: 'chef',
		},
		{
			id: 'open-hours-input',
			placeholder: 'Enter open hours',
			type: 'text',
			title: 'Open Hours',
			name: 'openHours',
		},
		{
			id: 'address-input',
			placeholder: 'Enter restaurant address',
			type: 'text',
			title: 'Address',
			name: 'address',
		},
		{
			id: 'open-days-input',
			placeholder: 'Enter open days',
			type: 'text',
			title: 'Open Days',
			name: 'openDays',
		},
		{
			id: 'img-input',
			placeholder: 'Enter image URL',
			type: 'text',
			title: 'Image',
			name: 'img',
		},
		{
			id: 'rating-input',
			placeholder: 'Enter rating',
			type: 'text',
			title: 'Rating',
			name: 'rating',
		},
	];

	const renderInputs = (inputFields: InputField[]) => {
		return inputFields.map((field: InputField) => (
			<div
				id="input-container"
				key={field.id}>
				{field.title && <div id="input-title">{field.title}</div>}
				<input
					id="input-full-Name"
					placeholder={field.placeholder}
					type={field.type}
					name={field.name}
					value={inputValues[field.name]}
					onChange={(e) =>
						setInputValues({ ...inputValues, [field.name]: e.target.value })
					}
				/>
			</div>
		));
	};

	const newRest = async (
		_id: string,
		name: string,
		address: string[],
		chef: string,
		chefId: string,
		img: string,
		openDays: number[],
		openHours: number[],
		rating: number
	) => {
		try {
			// Check if the provided _id is a valid ObjectId
			if (!mongoose.Types.ObjectId.isValid(_id)) {
				throw new Error('Invalid ObjectId');
			}
			// Use the provided _id to create a valid ObjectId
			const objectId = mongoose.Types.ObjectId.createFromHexString(_id);

			await fetch('https://backendepicure.onrender.com/restaurant/', {
				method: 'POST',
				body: JSON.stringify({
					userId: objectId, // Use the valid objectId instead of the _id parameter
					name: name,
					address: address,
					chef: chef,
					chefId: chefId,
					openDays: openDays,
					openHours: openHours,
					rating: rating,
					img: img,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setRest((newRest: [IRestaurants]) => [...newRest, data]);
					setInputValues({
						name: '',
						address: '',
						chef: '',
						chefId: '',
						img: '',
						openDays: '',
						openHours: '',
						rating: '',
					});
					window.location.reload();
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};
	const handleChangeChef = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedChef(e.target.value);
	};
	const handSaveRest = async (
		e: React.FormEvent<HTMLFormElement>,
		value: any
	) => {
		e.preventDefault();
		const credentials: IAddRest = {
			name: '',
			address: [],
			chef: '',
			chefId: '',
			openHours: [],
			openDays: [],
			dishes: [],
			rating: 0,
			img: '',
		};
		const inputObj = e.target;
		Object.values(inputObj).forEach((obj: HTMLInputElement) => {
			switch (obj.name) {
				case 'rating':
					credentials[obj.name] = Number(obj.value);
					break;
				case 'name':
				case 'chef':
				case 'img':
					credentials[obj.name] = obj.value;
					break;
				case 'address':
					credentials[obj.name] = obj.value.split(',').map(String);
					break;
				case 'openDays':
				case 'openHours':
					credentials[obj.name] = obj.value.split(',').map(Number);
					break;
			}
		});
		const restName = credentials.name;
		const address = credentials.address;
		credentials.chefId = selectedChef;
		const chefId = credentials.chefId;
		const chefName = credentials.chef;
		const img = credentials.img;
		const openDays = credentials.openDays;
		const openHours = credentials.openHours;
		const rating = credentials.rating;
		const _id = data._id;
		await newRest(
			_id,
			restName,
			address,
			chefName,
			chefId,
			img,
			openDays,
			openHours,
			rating
		);
	};

	return (
		<div className="restaurants-card">
			<form onSubmit={(e) => handSaveRest(e, selectedChef)}>
				<div
					id="restaurants-card-Modal"
					className="modal">
					<div className="add-information">
						<span
							id="closeButton"
							onClick={() => props.closeButton()}
							className="close">
							&times;
						</span>
						<div className="rest-information">
							<div id="information">
								<select
									onChange={(e) => handleChangeChef(e)}
									id="selectChef">
									<option>SELECT YOUR CHEF'S</option>
									{chefData.map((chef: IChef) => (
										<option
											id="option"
											key={chef._id?.toString()}
											value={chef._id?.toString()}>
											{chef.name}
										</option>
									))}
								</select>
								<div id="render">{renderInputs(restDetails)}</div>
							</div>{' '}
						</div>{' '}
						<button
							className="submit"
							type="submit">
							<span>ADD RESTAURANT </span>
						</button>
					</div>
				</div>
			</form>
			<div />
		</div>
	);
};
export default AddRest;
