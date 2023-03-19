import React, { useEffect, useState } from 'react';
import './ChefOfTheWeek.css';
import ChefCard from './ChefCard';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../store/store';
import { IChef } from '../ChefPage/ChefPage';

const ChefOfTheWeek: React.FC = () => {
	const chefsData = useSelector((state: Rootstate) => state.chef.value);
	const [chefoftheweek, setchefoftheweek] = useState<IChef>();

	useEffect(() => {
		const chefs = chefsData.find((chef: IChef) => chef.chefOfTheWeek);
		setchefoftheweek(chefs);
	}, []);

	return (
		<div id="chef-of-the-week">
			<div id="titlechef">CHEF OF THE WEEK:</div>
			<div id="information">
				{chefoftheweek && (
					<ChefCard
						description={chefoftheweek.description}
						img={chefoftheweek.img}
						name={chefoftheweek.name}
						restaurant={chefoftheweek.restaurant}
						_id={chefoftheweek._id}
						key={chefoftheweek.id}
					/>
				)}
			</div>
		</div>
	);
};

export default ChefOfTheWeek;
