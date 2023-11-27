import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { TeamsCard } from "./components/teamCards";
import { dynamicData } from "./utils/constants";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleItemPress = (item) => {
    let updatedSelection = [...selectedItems];
    if (selectedItems.includes(item)) {
      updatedSelection = updatedSelection.filter(
        (selectedItem) => selectedItem !== item
      );
    } else {
      if (selectedItems.length < 2) {
        updatedSelection.push(item);
      }
    }
    setSelectedItems(updatedSelection);
  };

  return (
    <div className="container">
      <p className="text-4xl font-bold text-center text-blue-700">
        Welcome to Cric App
      </p>
      <p className="text-4xl text-center text-gray-700 mt-5">Select team</p>
      <div className="teams-selected-container">
        <p>{`Team 1: ${selectedItems[0] ? selectedItems[0] : ""}`}</p>
        <p>{`Team 2: ${selectedItems[1] ? selectedItems[1] : ""}`}</p>
      </div>

      <div className="card-container">
        {dynamicData.map((data, index) => (
          <TeamsCard
            key={index}
            isSelected={selectedItems.includes(data)}
            handleTeamSelection={() => {
              if (selectedItems.includes(data) || selectedItems.length < 2)
                handleItemPress(data);
            }}
            teamName={data}
          />
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/game", { state: { teams: selectedItems } });
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Game
      </button>
    </div>
  );
}

export default App;
