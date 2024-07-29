import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function renderData() {
    return data.map((item, i) => {
      return (
        <div key={i}>
          <h3>{item.name}</h3>
          <p>Health: {item.health}</p>
          <p>Damage: {item.damage}</p>
        </div>
      );
    });
  }

  return (
    <main>
      <h1>Game</h1>
        {renderData()}
    </main>
  );
}

export default App;
