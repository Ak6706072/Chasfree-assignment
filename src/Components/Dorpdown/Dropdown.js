import React, { memo } from "react";
import "./style.css";
function Dropdown(props) {
  const { userName, setUserName } = props;
  const users = [
    "shohan012",
    "Geeta321",
    "ak6706072",
    "Ashish00ask",
    "Rahul",
    "Ragini",
    "Rm012",
  ];

  return (
    <div className="dropdown">
      <select
        className="dropdown_users"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      >
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(Dropdown);
