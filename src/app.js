import {useEffect, useState} from "react";

function App() {
	const [location, setLocation] = useState(0);
	const [locationData, setLocationData] = useState([]);
	const [enemyData, setEnemyData] = useState([]);

	useEffect(() => {
		fetch("/api/data/locations")
			.then((res) => res.json())
			.then((data) => setLocationData(data));
	}, []);

	useEffect(() => {
		fetch("/api/data/enemies")
			.then((res) => res.json())
			.then((data) => setEnemyData(data));
	}, []);

	function renderLocationData() {
		return locationData.map((item, i) => {
			return (
				<div key={i} style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "center"}}>
					<button onClick={()=>setLocation(item.id)}>{item.name}</button>
				</div>
			);
		});
	}

	function renderEnemyData() {
		return enemyData.map((item, i) => {
			return (
				<>
					{item.location_id === location && (
						<div key={i}
							 style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "center"}}>
							<h3>{item.name}</h3>
							<p>Health: {item.health}</p>
							<p>Damage: {item.damage}</p>
							<button>Attack</button>
						</div>
					)}
				</>
			);
		});
	}

	return (
		<main>
			<h1>Location: {locationData?.find(loc => loc.id === location)?.name}</h1>
			<div style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "center"}}>
				{renderLocationData()}
			</div>
			{renderEnemyData()}
		</main>
	);
}

export default App;