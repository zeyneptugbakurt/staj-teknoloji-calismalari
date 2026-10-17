
import { useState } from 'react';
import './App.css';

function App() {
  const [sayac, setSayac] = useState(0);

  return (
    <div className="container">
      <h1>Basit Sayaç</h1>

      <h2>{sayac}</h2>

      <button onClick={() => setSayac(sayac + 1)}>
        Artır
      </button>

      <button onClick={() => setSayac(sayac - 1)}>
        Azalt
      </button>

      <button onClick={() => setSayac(0)}>
        Sıfırla
      </button>
    </div>
  );
}

export default App;
