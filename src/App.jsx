import { useEffect, useState } from 'react';

const App = () => {
  const [animals, setAnimals] = useState();

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);

  const search = async q => {
    const response = await fetch(
      `http://localhost:8080?${new URLSearchParams({ q })}`
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return (
    <div>
      <h1>Animal Farm</h1>

      <input
        type='text'
        placeholder='Search...'
        onChange={e => search(e.target.value)}
      />

      <ul>
        {animals?.length > 0 ? (
          animals?.map(animal => (
            <li key={animal?.id}>
              <strong>{animal?.type}</strong> {animal?.name} {animal?.age}
            </li>
          ))
        ) : (
          <li>'No Animals Found!'</li>
        )}
      </ul>
    </div>
  );
};

export default App;
