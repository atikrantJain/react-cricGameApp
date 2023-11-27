import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import { TeamsCard } from "./components/teamCards";

function Game() {
  const location = useLocation();
  const [teamArray, setTeamArray] = useState(location.state.teams);

  const [firstTeamScore, setFirstTeamScore] = useState({
    runs: 0,
    wickets: 0,
  });
  const [secondTeamScore, setSecondTeamScore] = useState({
    runs: 0,
    wickets: 0,
  });
  const [tossStatus, setTossStatus] = useState({
    tossWonBy: -1,
    selectedFirst: "",
  });
  const [isFirstInningFinished, setIsFirstInningFinished] = useState(false);
  const [isTossFinished, setIsTossFinished] = useState(false);
  const [isMatchFinished, setIsMatchFinished] = useState(false);
  const [isTeam1Won, setIsTeam1Won] = useState(false);

  const [runs, updateRuns] = useState(0);
  const [wickets, updateWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);

  useEffect(() => {
    if (wickets === 10 || overs === 10) {
      alert(`${isFirstInningFinished ? "Second" : "First"} inning finished`);
      if (!isFirstInningFinished) {
        setFirstTeamScore({
          runs: runs,
          wickets: wickets,
        });
      } else {
        setSecondTeamScore({
          runs: runs,
          wickets: wickets,
        });
      }
      updateWickets(0);
      updateRuns(0);
      setIsFirstInningFinished(true);
      setOvers(0);
      setBalls(0);
    }
  }, [overs, wickets]);

  useEffect(() => {
    if (tossStatus.tossWonBy !== -1 && tossStatus.selectedFirst !== "") {
      if (
        (tossStatus.tossWonBy === 1 && tossStatus.selectedFirst === "Bat") ||
        (tossStatus.tossWonBy === 0 && tossStatus.selectedFirst === "Ball")
      ) {
        setTeamArray(teamArray.reverse());
      }
    }
  }, [tossStatus.tossWonBy, tossStatus.selectedFirst]);

  useEffect(() => {
    if (isFirstInningFinished) {
      if (runs > firstTeamScore.runs && wickets < 10) {
        setIsMatchFinished(true);
        setIsTeam1Won(false);
        setSecondTeamScore({
          runs: runs,
          wickets: wickets,
        });
      }
      if (runs < firstTeamScore.runs && wickets >= 10 && isMatchFinished) {
        setIsMatchFinished(true);
        setIsTeam1Won(true);
        setSecondTeamScore({
          runs: runs,
          wickets: wickets,
        });
      }
    }

    if (isMatchFinished) {
      alert(`${`${isTeam1Won ? teamArray[0] : teamArray[1]} Won the match`}`);
      setBalls(0);
      setOvers(0);
      updateRuns(0);
      updateWickets(0);
    }
  }, [runs, wickets, isMatchFinished]);

  const handlePlayButton = () => {
    const randomPickedRuns = pickRandomNumber();
    if (balls > 5) {
      setBalls(0);
      setOvers(overs + 1);
    } else setBalls(balls + 1);

    if (randomPickedRuns === 10) {
      updateWickets(wickets + 1);
    } else {
      updateRuns(runs + randomPickedRuns);
    }
  };

  const handleToss = () => {
    const tossValue = [1, 2][Math.floor(Math.random() * 2)];
    alert(`${tossValue === 1 ? teamArray[0] : teamArray[1]} Won the toss`);
    setTossStatus({
      ...tossStatus,
      tossWonBy: tossValue === 1 ? 0 : 1,
    });
    setIsTossFinished(true);
  };

  const pickRandomNumber = () => {
    const arr = [0, 1, 2, 3, 4, 6, 10];
    const randomItem = arr[Math.floor(Math.random() * arr.length)];
    return randomItem;
  };

  const resetGame = () => {
    setBalls(0);
    setOvers(0);
    setFirstTeamScore({
      runs: 0,
      wickets: 0,
    });
    setSecondTeamScore({
      runs: 0,
      wickets: 0,
    });
  };

  return (
    <div className="container">
      <p className="text-4xl font-bold text-center text-blue-700">
        Welcome to T10 Match
      </p>
      {tossStatus.tossWonBy !== -1 && tossStatus.selectedFirst !== "" && (
        <p>{`${teamArray[tossStatus.tossWonBy]} Won the toss and elected to ${
          tossStatus.selectedFirst ? `${tossStatus.selectedFirst} first` : ""
        }`}</p>
      )}
      <div className="card-container">
        <TeamsCard
          isSelected={false}
          handleTeamSelection={() => {}}
          teamName={teamArray[0]}
          score={`${firstTeamScore.runs}  /  ${firstTeamScore.wickets}`}
        />
        <TeamsCard
          isSelected={false}
          handleTeamSelection={() => {}}
          teamName={teamArray[1]}
          score={`${secondTeamScore.runs}  /  ${secondTeamScore.wickets}`}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          className="mb-8"
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <div>
            <p className="mr-5">Score</p>
            <div
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{runs}</p>
            </div>
          </div>
          <span className="mr-5">/</span>
          <div>
            <p className="mr-5">Wickets</p>
            <div
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{wickets}</p>
            </div>
          </div>
        </div>

        <div
          className="mb-8"
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <div>
            <p className="mr-5">Balls</p>
            <div
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{balls}</p>
            </div>
          </div>
          <span className="mr-5">/</span>
          <div>
            <p className="mr-5">Overs</p>
            <div
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{overs}</p>
            </div>
          </div>
        </div>
      </div>
      <>
        {isTossFinished ? (
          <div>
            <p>{`${
              teamArray[tossStatus.tossWonBy]
            } won the toss and elected to ${
              tossStatus.selectedFirst
                ? `${tossStatus.selectedFirst} first`
                : ""
            }`}</p>
            <div
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                display: "flex",
                marginTop: 10,
              }}
            >
              <button
                onClick={() => {
                  setTossStatus({
                    ...tossStatus,
                    selectedFirst: "Bat",
                  });
                  setIsTossFinished(false);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Bat
              </button>
              <button
                onClick={() => {
                  setTossStatus({
                    ...tossStatus,
                    selectedFirst: "Ball",
                  });
                  setIsTossFinished(false);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Ball
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              if (isMatchFinished) {
                resetGame();
              }
              if (tossStatus.selectedFirst == "") {
                handleToss();
              } else {
                handlePlayButton();
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isMatchFinished
              ? "Restart Match"
              : tossStatus.selectedFirst == ""
              ? "Toss"
              : "Play"}
          </button>
        )}
      </>
    </div>
  );
}

export default Game;
