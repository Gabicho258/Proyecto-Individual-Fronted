import React, { useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export const RatingComponent = ({ readOnly, rate }) => {
  const [value, setValue] = useState(rate);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
      style={{ marginBottom: "10px" }}
    >
      {!readOnly ? (
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      ) : (
        <Rating name="read-only" value={value} readOnly />
      )}
    </Box>
  );
};
