import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

interface MetricProps {
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
  title: React.ReactNode;
  metric: React.ReactNode;
}

const styles = {
  primary: {
    color: "#c0d8fc",
    fontFamily: "Poppins",
  },
  secondary: {
    color: "#c0d8fc",
    fontFamily: "Poppins",
  },
  metric: {
    color: "#ffffff",
    fontFamily: "Poppins",
  },
  card: {
    backgroundColor: "#0066ff",
    borderRadius: "20px",
    padding: "1.5rem",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export function Metric({ colors, title, metric }: MetricProps) {
  return (
    <Grid size={4} sx={styles.card}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        height="100%"
      >
        {/* Title */}
        <Typography
          sx={{
            ...styles.secondary,
            fontWeight: 500,
          }}
          variant="h6"
        >
          {title}
        </Typography>

        {/* Metric */}
        <Typography
          sx={{
            ...styles.metric,
            fontWeight: 600,
          }}
          variant="h3"
        >
          {metric}
        </Typography>

        {/* Title */}
        <Typography
          sx={{
            ...styles.secondary,
            fontWeight: 500,
          }}
          variant="h6"
        >
          Prompts Asked
        </Typography>

        {/* Metric */}
        <Typography
          sx={{
            ...styles.metric,
            fontWeight: 600,
          }}
          variant="h3"
        >
          5,702
        </Typography>
      </Box>
    </Grid>
  );
}

export default Metric;
