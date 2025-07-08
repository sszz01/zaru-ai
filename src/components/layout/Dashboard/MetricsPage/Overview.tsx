import { PieChart } from "./PieChart";
import { Metric } from "./Metric";
import { HalfBox } from "./CardHalf";
import "@fontsource/poppins/400.css";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { LineChart } from "@mui/x-charts/LineChart";

interface OverviewProps {
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

const styles = {
  primary: {
    color: "#232629",
    fontFamily: "Poppins",
  },
  secondary: {
    color: "#5e646e",
    fontFamily: "Poppins",
  },
  metric: {
    color: "#0066ff",
    fontFamily: "Poppins",
  },
};

const OverviewComponent = ({ colors }: OverviewProps) => {
  return (
    <Grid container spacing={2} sx={{ width: "80%", height: "80%" }}>
      {/* Title */}
      <Typography
        sx={{
          ...styles.primary,
          fontWeight: 700,
          position: "absolute",
          top: "5vh",
          left: "38vh",
        }}
        variant="h5"
      >
        AI Usage Overview
      </Typography>

      {/* Top Row - 1/4 height */}
      <Grid size={12} sx={{ height: "35%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid size={8} sx={{ height: "100%" }}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                  color: "#0066ff",
                },
              ]}
              height={275}
            />
          </Grid>
          <Metric colors={colors} title="Registered Teachers" metric="102" />
        </Grid>
      </Grid>

      {/* Bottom Row - 3/4 height */}
      <Grid size={12} sx={{ height: "65%" }}>
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {/* Bottom Left Block */}
          <HalfBox colors={colors}>
            <Typography
              sx={{
                ...styles.primary,
                textAlign: "left",
                fontWeight: 600,
              }}
              variant="h6"
            >
              Frequently Searched Topics
            </Typography>

            <PieChart colors={colors} />
          </HalfBox>

          {/* Bottom Right Block */}
          <HalfBox colors={colors}>
            <Typography
              sx={{
                ...styles.primary,
                fontWeight: 600,
              }}
              variant="h6"
            >
              Frequently Asked Prompts
            </Typography>
          </HalfBox>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewComponent;
