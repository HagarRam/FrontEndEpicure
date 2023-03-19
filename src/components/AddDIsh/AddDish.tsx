import mongoose, { Types } from 'mongoose';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import { IDishes } from '../SignatureDish/DishCard';

interface IModal {
	closeButton: Function;
}

const AddDish: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const navigate = useNavigate();
	const dishData = useSelector(
		(state: Rootstate) => state.restaurants.filteredValue
	);
	const restaurantId = useParams<string>();
	const [dish, setDish] = useState<any>(dishData);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		dishName: '',
		about: '',
		dishPrice: '',
		icons: '',
		img: '',
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
			placeholder: 'Enter dish name',
			type: 'text',
			title: 'Dish Name',
			name: 'dishName',
		},
		{
			id: 'about-input',
			placeholder: 'Enter about the dish',
			type: 'text',
			title: 'About',
			name: 'about',
		},
		{
			id: 'price-input',
			placeholder: 'Enter dish price',
			type: 'text',
			title: 'Price',
			name: 'dishPrice',
		},
		{
			id: 'icons-input',
			placeholder: 'Enter the dish symbols',
			type: 'text',
			title: 'Icons',
			name: 'icons',
		},
		{
			id: 'img-input',
			placeholder: 'Enter image URL',
			type: 'text',
			title: 'Image',
			name: 'img',
		},
	];

	const renderInputs = (inputFields: InputField[]) => {
		return inputFields.map((field) => (
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

	const newDish = async (
		_id: string,
		restId: string,
		img: string,
		about: string,
		dishName: string,
		dishPrice: string,
		icons: string
	) => {
		try {
			// Check if the provided _id is a valid ObjectId
			if (!mongoose.Types.ObjectId.isValid(_id)) {
				throw new Error('Invalid ObjectId');
			}
			// Use the provided _id to create a valid ObjectId
			const objectId = mongoose.Types.ObjectId.createFromHexString(_id);
			await fetch('http://localhost:8000/dishes/', {
				method: 'POST',
				body: JSON.stringify({
					userId: objectId, // Use the valid objectId instead of the _id parameter
					img: img,
					about: about,
					name: dishName,
					price: dishPrice,
					icons: icons,
					restId: restId,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setDish((newdish: IDishes[]) => [...newdish, data]);
					setInputValues({
						dishName: '',
						about: '',
						dishPrice: '',
						icons: '',
						img: '',
					});
					window.location.reload();
					navigate('/');
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};

	const handSaveRest = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		const credentials: any = {
			id: 0,
			restId: '',
			dishName: '',
			about: '',
			dishPrice: '',
			icons: [],
			img: '',
		};
		const inputObj = e.target;
		Object.values(inputObj).forEach((obj: any) => {
			switch (obj.name) {
				case 'dishPrice':
					credentials[obj.name] = Number(obj.value);
					break;
				case 'dishName':
				case 'img':
				case 'about':
					credentials[obj.name] = String(obj.value);
					break;
				case 'icons':
					credentials[obj.name] = obj.value.split(',').map(String);
					break;
				default:
					credentials[obj.name] = obj.value;
					break;
			}
		});
		const img = credentials.img;
		const about = credentials.about;
		const dishName = credentials.dishName;
		const dishPrice = credentials.dishPrice;
		const icons = credentials.icons;
		const _id = data._id;
		const restId: string = restaurantId.dishID ?? 'undefined ';
		await newDish(_id, restId, img, about, dishName, dishPrice, icons);
	};

	return (
		<div className="restaurants-card">
			<form onSubmit={handSaveRest}>
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
							<div>
								<div id="information">{renderInputs(restDetails)}</div>
							</div>
							<button
								className="submit"
								type="submit">
								<span>ADD DISH </span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddDish;
