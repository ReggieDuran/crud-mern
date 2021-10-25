import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [foodName, setFoodName] = useState('');
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);
 
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      console.log(response);
      setFoodList(response.data);
    });
  }, []);

  const updateFood = (id) => {
    Axios.put('http://localhost:3001/update', {id: id, newFoodName: newFoodName});
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  const addToList = () => {
    Axios.post('http://localhost:3001/insert', {foodName: foodName, days: days});
  };

  return (
    <div className="App">
      <h1>CRUP App with MERN</h1>

      <label>Food Name: </label>
      <input 
        type="text" 
        onChange={(event) => {
          setFoodName(event.target.value);
        }} 
      />
      <label>Days you ate it</label>
      <input 
        type="number" 
        onChange={(event) => {
          setDays(event.target.value);
        }} 
      />
      <button onClick={addToList}> Add to list</button>

      <h1>Food List</h1>
      <div className="food-container">
        {foodList.map((val,key) => {
          return (
            <div key={key} className="food">
              <h2>{val.foodName}</h2>
              <h4>{val.daysSinceIAte}</h4>
              <input 
                type="text" 
                placeholder="New Food Name..."  
                onChange={(event) => {
                  setNewFoodName(event.target.value);
                }}
              />
              <div className="buttons">
                <button onClick={() => updateFood(val._id)} className="update">Update</button>
                <button onClick={() => deleteFood(val._id)} >Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
