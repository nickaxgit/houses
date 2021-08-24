import React, { useEffect, useState } from "react";

import logo from './logo.svg';
import './App.css';
import Tile from './Tile.js';

function App() {

  let server="http://localhost:3001"
  
  const [houses, fillHouses] = useState([]);
  
  

  useEffect(()=>{
    async function fetchHouses(){        
        let response = await fetch(server + "/houses")      
        fillHouses( await response.json()) 
  
    }
    fetchHouses()
  }    
  ,[])

  return (
  
    <div className="App">
      
   
      {houses.map(h=><Tile price={h.price} area={h.area} image={h.image} type={h.type} key={h.id} index={h.id} />
        )
      }

    </div>
  );
}

export default App;
