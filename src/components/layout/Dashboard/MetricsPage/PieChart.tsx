import { Box, Typography, Stack } from "@mui/material";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";

interface PieChartProps {
  colors: {
    background: string;
    surface: string;
    surfaceAlt: string;
    border: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    text: string;
    textSecondary: string;
  };
}

export function PieChart({ colors }: PieChartProps) {
  const data = [
    { label: "Math", value: 10, color: "#1976d2" },
    { label: "History", value: 20, color: "#9c27b0" },
    { label: "English", value: 30, color: "#f44336" },
    { label: "Science", value: 40, color: "#4caf50" },
  ];
  return (
    <Box
      display="flex"
      alignItems="center"
      style={{ width: "90%", height: "90%" }}
      gap={4}
    >
      {/* Pie Chart */}
      <MuiPieChart
        series={[
          {
            data,
            highlightScope: {
              fade: "global",
              highlight: "item",
            },
            faded: {
              innerRadius: 30,
              additionalRadius: -30,
              color: "gray",
            },
            innerRadius: 20,
            outerRadius: 150,
          },
        ]}
        width={300}
        height={400}
        hideLegend={true}
      />

      {/* PieChart Legend */}
      <Stack spacing={1}>
        {data.map((item) => (
          <Box key={item.label} display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: item.color,
              }}
            />

            {/* Legend Labels */}
            <Typography
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: colors.text,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
