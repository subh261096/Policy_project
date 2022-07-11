import React from "react";
import { TextField } from "@mui/material";

// TextHandle Component for Text Handling from @mui
const TextHandle = ({ field, value, callback, disabled, error, type }) => {
  const handleChange = (event) => {
    callback(event.target.value);
  };
  return (
    <div>
      <TextField
        type={type}
        error={error}
        disabled={disabled}
        fullWidth
        placeholder={String(value)}
        label={field
          .split("_")
          .map((v) => v[0].toUpperCase() + v.slice(1))
          .join(" ")}
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextHandle;
