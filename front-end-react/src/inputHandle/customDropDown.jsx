import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";


// CustomDropDown Component for Cutome DropDown from @mui
const CustomDropDown = ({ field, value, dropItems, callback }) => {
  const [dropValue, setDropValue] = useState(value);
  const label = field
    .split("_")
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");
  const handleChange = (event) => {
    setDropValue(event.target.value);
    callback(event.target.value);
  };
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={"id" + field}>{label}</InputLabel>
        <Select
          fullWidth
          labelId={"id" + field}
          id="demo-simple-select"
          value={dropValue}
          label={label}
          onChange={handleChange}
        >
          {Object.entries(dropItems).map(([k, v]) => (
            <MenuItem key={k} value={k}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomDropDown;
