import React, {useState, useEffect} from "react";

import api from './services/api'
import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    const getData = async () => {

      const response = await api.get('repositories')
  
      setRepositories(response.data)
  
     }

     getData()

  },[])

  async function handleAddRepository() {

    const response = await api.post('repositories',{
        title: `repositório_${Math.random().toString(36).substring(5)}`,
        url: `www.github.${Math.random().toString(36).substring(3)}.com.br`,
        techs: [
          `${Math.random().toString(36).substring(5)}`, `${Math.random().toString(36).substring(5)}`
        ]
    })
    
    const repo = response.data;
    setRepositories([...repositories, repo])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(r => r.id === !id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
        <li key={repositorie.id}>
        {repositorie.title}
          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
