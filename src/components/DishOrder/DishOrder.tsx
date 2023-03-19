import iconPrice from './image/price.svg';
import icon from './image/bold-price.svg';
import './DishOrder.css';

interface IOrderDishes {
	id: number;
	name: string;
	price: number;
	img: string;
	dishtitle: string;
	comment: string;
	quantity: number;
}

const DishOrder: React.FC<IOrderDishes> = (props: IOrderDishes) => {
	const { img, name, price, dishtitle, comment, quantity } = props;

	return (
		<>
			<div className={dishtitle}>
				<img
					className="order-img"
					alt="dish"
					src={img}
				/>
				<div id="right-container">
					<div id={'name-container'}>
						<div id="counter-dishes">{quantity}</div>
						<div id="name-price">
							<div className="order-name">{name}</div>
							<div id="order-price-container">
								<div id="price-with-icon">
									<img
										alt="price"
										src={iconPrice}
										id="icon-price"></img>
									<div>{price}</div>
								</div>
							</div>
						</div>
					</div>
					<div id="comment-with-price">
						<div className="order-comment">{comment}</div>
						<div id="price-order-with-icon">
							<img
								alt="price"
								src={icon}
								id="icon-price"
							/>
							<div>{price}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DishOrder;
