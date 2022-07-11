import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// DropDownHandle Component for DropDownHandle from @mui
const DropDownHandle = ({ field, value, callback }) => {
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
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDownHandle;
