import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RechartCreator } from "matx";
import Legend from "recharts/lib/component/Legend";

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8a5b",
  "#b7918d",
  "#5b5b5b",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
];

const SimpleLineChart = ({
  height,
  width,
  listUser,
  allData,
  karyawanCode,
}) => {
  return (
    <RechartCreator height={height} width={width}>
      <LineChart
        data={allData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {listUser
          .filter(function (item) {
            if (karyawanCode == "") {
              return true;
            } else {
              return item.value == karyawanCode;
            }
          })
          .map((user) => (
            <Line
              type="monotone"
              dataKey={user.label
                .replace(" - KARYAWAN", "")
                .replace(" - MAGANG", "")}
              stroke={colors[Math.floor(Math.random() * colors.length)]}
              activeDot={{ r: 8 }}
            />
          ))}
      </LineChart>
    </RechartCreator>
  );
};

export default SimpleLineChart;
