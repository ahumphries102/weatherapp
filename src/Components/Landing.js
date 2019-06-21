import React from 'react'
export default function Landing(props){

	return(
		<section className="landing">
			<img src="https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="naturevalley"/>
			
			
			<section className="landingText">

				<h1>Weather App</h1>
				<h2>{props.city}'s temperature today is {props.temperature}° degrees. The high today is {props.high} and the low is {props.low} and the condition out is {props.currentCondition}</h2>
				
			</section>
		</section>
	)
}