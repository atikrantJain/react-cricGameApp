export const TeamsCard = ({ ...props }) => {
  return (
    <div
      onClick={props.handleTeamSelection}
      className="card"
      style={{ backgroundColor: props?.isSelected ? "blue" : "white" }}
    >
      <h2
        className="text-xl"
        style={{ color: props?.isSelected ? "white" : "black" }}
      >
        {props.teamName}
      </h2>
      {props?.score && (
        <h2 className="text-xl" style={{ color: "black" }}>
          {`${props.score}`}
        </h2>
      )}
    </div>
  );
};
