import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { CircularProgress, Stack } from "@mui/material";

// DisplayChart Component to Display the Bar Graph
const DisplayChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/policies_per_month`)
      .then((response) => (response.ok && response.json()))
      .then((parsedResponse) => {
        if (parsedResponse.length) {
          setIsLoading(false);
          setData(parsedResponse);
        }
      })
      .catch(console.error);
  }, []);
  return (
    <div>
      {isLoading && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
        )}
      
      {!isLoading && (
        <ResponsiveContainer aspect={2}>
          <BarChart width={150} height={40} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="policy_count" name="Policy Count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DisplayChart;
