import React from 'react';
import './Hero.css';
const Hero: React.FC = () => {
	return (
		<div className="body-hero">
			<div id="hero">
				<div id="heroBox">
					<div id="heroTitle">
						Epicure works with the top chef restaurants in Tel Aviv
					</div>
					<input
						id="inputHero"
						placeholder="Search for restaurant cuisine, chef"></input>
				</div>
			</div>
		</div>
	);
};

export default Hero;
