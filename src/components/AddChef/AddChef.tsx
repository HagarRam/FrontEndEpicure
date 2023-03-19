import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../../store/store';
import { IChef } from '../ChefPage/ChefPage';
import { Types } from 'mongoose';
interface IModal {
	closeButton: () => void;
}

const AddChef: React.FC<IModal> = (props: IModal) => {
	const data = JSON.parse(sessionStorage.getItem('data') || '{}');
	const chefsdata = useSelector((state: Rootstate) => state.chef.filteredValue);
	const [chefs, setChefs] = useState<IChef[]>(chefsdata);
	const [inputValues, setInputValues] = useState<Record<string, string>>({
		name: '',
		description: '',
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
			placeholder: 'Enter chef name',
			type: 'text',
			title: 'Chef`s Name',
			name: 'name',
		},
		{
			id: 'description-input',
			placeholder: 'Enter image URL',
			type: 'text',
			title: 'Image',
			name: 'description',
		},
		{
			id: 'img-input',
			placeholder: 'Enter about the chef',
			type: 'text',
			title: 'Description',
			name: 'img',
		},
	];

	const renderInputs = (inputFields: InputField[]) => {
		return (
			<>
				{inputFields.map((field) => (
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
				))}
			</>
		);
	};

	const newChef = async (
		name: string,
		description: string,
		img: string,
		_id: string
	) => {
		try {
			await fetch('http://localhost:8000/chef/', {
				method: 'POST',
				body: JSON.stringify({
					name: name,
					description: description,
					img: img,
					userId: Types.ObjectId.createFromHexString(_id),
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setChefs((newChef: IChef[]) => [...newChef, data]);
					setInputValues({ name: '', description: '', img: '' });
					window.location.reload();
					navigate('/');
				});
		} catch (err) {
			alert('please try again');
			console.log(err);
		}
	};

	const navigate = useNavigate();
	const handSaveRest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const credentials: Record<string, string> = {
			name: '',
			description: '',
			img: '',
		};
		const inputObj = e.target;
		Object.values(inputObj).forEach((obj: HTMLInputElement) => {
			switch (obj.name) {
				case 'name':
				case 'img':
				case 'description':
					credentials[obj.name] = String(obj.value);
					break;
				default:
					credentials[obj.name] = obj.value;
					break;
			}
		});
		const name = credentials.name;
		const description = credentials.description;
		const img = credentials.img;
		const _id = data._id;
		await newChef(name, img, description, _id);
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
						</div>{' '}
						<button
							className="submit"
							type="submit">
							<span>ADD CHEF </span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddChef;
