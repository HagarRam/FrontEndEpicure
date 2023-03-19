import './CheckOutDetails.css';

interface InputField {
	id: string;
	placeholder: string;
	type: string;
	title?: string;
}

const CheckOutDetails: React.FC = () => {
	const deliveryDetails: InputField[] = [
		{ id: 'input-full-name', placeholder: 'Full Name', type: 'text' },
		{ id: 'input-address', placeholder: 'Address', type: 'text' },
		{ id: 'input-phone', placeholder: 'Phone', type: 'text' },
	];

	const paymentDetails: InputField[] = [
		{
			id: 'input-card-number',
			placeholder: '',
			type: 'text',
			title: 'Card Number',
		},
		{
			id: 'input-name-on-card',
			placeholder: '',
			type: 'text',
			title: 'Name On Card',
		},
		{ id: 'input-cvv', placeholder: '', type: 'text', title: 'CVV' },
		{
			id: 'input-expiry-date',
			placeholder: '',
			type: 'text',
			title: 'Expiry Date',
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
				/>
			</div>
		));
	};

	return (
		<div id="details-container">
			<div className="details-title">
				<div> DELIVERY DETAILS</div>
			</div>
			<div id="details-information">{renderInputs(deliveryDetails)}</div>
			<div
				className="details-title"
				id="payment-title">
				PAYMENT DETAILS
			</div>
			<div id="details-information">{renderInputs(paymentDetails)}</div>
		</div>
	);
};

export default CheckOutDetails;
