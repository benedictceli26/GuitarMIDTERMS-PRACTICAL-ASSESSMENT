import {
  Box,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

function GuitarDetail({ guitar }) {
  if (!guitar) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          mt: 3,
          textAlign: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          color="text.secondary"
        >
          Select a guitar from the registry
          to view its complete details.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        mt: 3,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
      >
        Active Guitar Profile
      </Typography>

      <Typography
        color="text.secondary"
        variant="body2"
      >
        Selected inventory record
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            GUITAR MODEL
          </Typography>

          <Typography fontWeight="bold">
            {guitar.model}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            BODY TYPE
          </Typography>

          <Typography fontWeight="bold">
            {guitar.bodyType}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            BRAND
          </Typography>

          <Typography fontWeight="bold">
            {guitar.brand}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            STOCK QUANTITY
          </Typography>

          <Typography fontWeight="bold">
            {guitar.stock}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            MANUFACTURER
          </Typography>

          <Typography fontWeight="bold">
            {guitar.manufacturer}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mb={0.5}
          >
            USER ROLE
          </Typography>

          <Chip
            label={guitar.role}
            color={
              guitar.role === "Merchant"
                ? "primary"
                : "secondary"
            }
          />
        </Box>
      </Box>
    </Paper>
  );
}

export default GuitarDetail;