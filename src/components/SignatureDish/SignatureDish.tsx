import React from 'react';
import './SignatureDish.css';
import DishCard, { IDishes } from './DishCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';

const SignatureDish: React.FC = () => {
	const SignatureDishData = useSelector(
		(state: Rootstate) => state.dishes.value
	);
	let index: number = 0;
	return (
		<div id="dish-card">
			<div id="titlecard-dish">SIGNATURE DISH OF:</div>
			<div id="allthecard">
				<div id="dishes-card">
					{SignatureDishData.map((signal: IDishes) => {
						if (index < 3 && signal.signatureDish) {
							index += 1;
							return (
								<DishCard
									img={signal.img}
									icons={signal.icons}
									name={signal.name}
									about={signal.about}
									price={signal.price}
									id={signal.id}
									title={'card-dish-information'}
									key={signal.id}
									dishtitle={'dish-card-element'}
									_id={signal._id}
								/>
							);
						} else {
							return null;
						}
					})}
					;
				</div>
			</div>
		</div>
	);
};

export default SignatureDish;
