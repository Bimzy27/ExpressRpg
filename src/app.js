import {useEffect, useState} from "react";
import colors from "./colors";

function App() {
	const playerMaxHealth = 100;
	const playerDamage = 1;
	const playerExpToLevel = 100;
	const playerHealthLevelMult = 10;
	const playerDamageLevelMult = 1;

	const [location, setLocation] = useState(0);

	const [activeCombat, setActiveCombat] = useState(-1);
	const [playerHealth, setPlayerHealth] = useState(playerMaxHealth);
	const [playerExp, setPlayerExp] = useState(0);
	const [enemyHealth, setEnemyHealth] = useState(0);

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
						<div key={i} style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "center"}}>
							<h3>{item.name}</h3>
							<p>Health: {item.health}</p>
							<p>Damage: {item.damage}</p>
							<button onClick={()=>
							{
								setActiveCombat(item.id)
								setEnemyHealth(item.health)
							}}>Fight</button>
						</div>
					)}
				</>
			);
		});
	}

	function getActiveEnemy()
	{
		if (activeCombat === -1)
		{
			return null
		}

		return enemyData.find(e=>e.id === activeCombat)
	}

	function getLevel()
	{
		const level = playerExp / playerExpToLevel
		return Math.floor(level)
	}

	function getHealth()
	{
		return playerMaxHealth + (playerHealthLevelMult * getLevel())
	}

	function getDamage()
	{
		return playerDamage + (playerDamageLevelMult * getLevel())
	}

	return (
		<main>
			<div style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "top"}}>
				<div style={{backgroundColor: colors.primary1}}>
					<h1>Player</h1>
					<p>Level: {getLevel() + 1}</p>
					<p>Health: {playerHealth}/{getHealth()}</p>
					<p>Damage: {getDamage()}</p>
					<p>Exp: {playerExp % playerExpToLevel}/{playerExpToLevel}</p>
					<button onClick={()=>setPlayerHealth(Math.min(getHealth(), playerHealth + 5))}>Eat</button>
				</div>
				<div style={{backgroundColor: colors.primary2}}>
					<h1>Location: {locationData?.find(loc => loc.id === location)?.name}</h1>
					<div key={'locValues'} style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "center"}}>
						{renderLocationData()}
					</div>
					{renderEnemyData()}
				</div>
			</div>
			<>
				{activeCombat !== -1 && (
					<div style={{backgroundColor: colors.primary3}}>
						<h1>Combat</h1>
						<div style={{display: "flex", flexDirection: "row", gridGap: '10px', alignItems: "top"}}>
							<div>
								<p>Player</p>
								<p>Health: {playerHealth}/{getHealth()}</p>
								<p>Damage: {getDamage()}</p>
							</div>
							<div>
								<p>{getActiveEnemy()?.name}</p>
								<p>Health: {enemyHealth}/{getActiveEnemy()?.health}</p>
								<p>Damage: {getActiveEnemy()?.damage}</p>
							</div>
						</div>
						<button onClick={() =>
						{
							if (playerHealth <= 0) return

							setPlayerHealth(Math.max(playerHealth - getActiveEnemy()?.damage, 0))
							const newHealth = Math.max(enemyHealth - getDamage(), 0)
							setEnemyHealth(newHealth)
							if (newHealth <= 0)
							{
								setPlayerExp(playerExp + getActiveEnemy()?.exp)
								setActiveCombat(-1)
							}
						}}>Attack</button>
					</div>
				)}
			</>
		</main>
	);
}

export default App;