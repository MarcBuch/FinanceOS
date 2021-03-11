import React from 'react';

const RatioInfoCard = ({ tag, description, value, threshold }) => {
	return (
		<div className='card' id={`dashboard-${tag}Div`}>
			<p
				className={
					value > threshold ? 'mt-4 amount positive' : 'mt-4 amount negative'
				}
				id={`${tag}Value`}
			>
				{`${value}%`}
			</p>
			<p className="description">{description}</p>
		</div>
	);
};

export default RatioInfoCard;
