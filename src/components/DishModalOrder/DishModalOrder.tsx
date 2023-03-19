import icon from '../DishOrder/image/bold-price.svg';

interface IModalDishes {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

const DishModalOrder: React.FC<IModalDishes> = (props: IModalDishes) => {
	const { name, price, quantity } = props;

	return (
		<>
			<div id="price-in-modal">
				<div>{quantity} X</div>
				<div className="order-name">{name}</div>
				<div id="price-conatiner">
					<img
						src={icon}
						alt="icon"
						id="icon-price"></img>
					<div>{price}</div>
				</div>
			</div>
		</>
	);
};

export default DishModalOrder;
