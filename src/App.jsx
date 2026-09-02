import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineRounded";
import TableRowsOutlinedIcon from "@mui/icons-material/TableRowsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import GuitarForm from "./components/GuitarForm";
import GuitarTable from "./components/GuitarTable";
import GuitarDetail from "./components/GuitarDetail";

function App() {
  const [guitars, setGuitars] = useState([]);
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [activeGuitar, setActiveGuitar] = useState(null);
  const [view, setView] = useState("form");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    setActiveGuitar(selectedGuitar);
  }, [selectedGuitar]);

  const addGuitar = (newGuitar) => {
    setGuitars((prev) => [...prev, newGuitar]);
    setView("registry");
  };

  const selectGuitar = (guitar) => {
    setSelectedGuitar(guitar);
  };

  const filteredGuitars =
    filterType === "All"
      ? guitars
      : guitars.filter(
          (guitar) => guitar.bodyType === filterType
        );

  const totalStock = guitars.reduce(
    (total, guitar) => total + guitar.stock,
    0
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `
          linear-gradient(
            rgba(244, 246, 248, 0.78),
            rgba(244, 246, 248, 0.78)
          ),
          url("https://t3.ftcdn.net/jpg/08/18/24/78/360_F_818247854_A4tYmBxgYiq5jZaNwt7vqXShUxj6evvy.jpg")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "rgba(31, 41, 55, 0.93)",
            color: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Inventory2OutlinedIcon
              sx={{
                fontSize: 45,
              }}
            />

            <Box>
              <Typography
                variant="h3"
                fontWeight="bold"
              >
                Guitar Store Inventory Manager
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: "#d1d5db",
                }}
              >
                Manage and organize guitar inventory records.
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.93)",
            }}
          >
            <Typography color="text.secondary">
              Registered Guitars
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {guitars.length}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.93)",
            }}
          >
            <Typography color="text.secondary">
              Total Stock
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {totalStock}
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            variant={
              view === "form"
                ? "contained"
                : "outlined"
            }
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setView("form")}
            sx={{
              backgroundColor:
                view === "form"
                  ? undefined
                  : "rgba(255, 255, 255, 0.88)",
            }}
          >
            Register Guitar
          </Button>

          <Button
            variant={
              view === "registry"
                ? "contained"
                : "outlined"
            }
            startIcon={<TableRowsOutlinedIcon />}
            onClick={() => setView("registry")}
            sx={{
              backgroundColor:
                view === "registry"
                  ? undefined
                  : "rgba(255, 255, 255, 0.88)",
            }}
          >
            Guitar Registry
          </Button>
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(3px)",
          }}
        >
          {view === "form" && (
            <GuitarForm
              onAddGuitar={addGuitar}
            />
          )}

          {view === "registry" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: {
                    xs: "stretch",
                    sm: "center",
                  },
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                  >
                    Inventory Records
                  </Typography>

                  <Typography
                    color="text.secondary"
                    variant="body2"
                  >
                    Select a row to view complete guitar details.
                  </Typography>
                </Box>

                <TextField
                  select
                  size="small"
                  label="Filter Body Type"
                  value={filterType}
                  onChange={(event) =>
                    setFilterType(event.target.value)
                  }
                  sx={{
                    minWidth: 220,
                  }}
                >
                  <MenuItem value="All">
                    All
                  </MenuItem>

                  <MenuItem value="Electric">
                    Electric
                  </MenuItem>

                  <MenuItem value="Acoustic">
                    Acoustic
                  </MenuItem>

                  <MenuItem value="Bass">
                    Bass
                  </MenuItem>

                  <MenuItem value="Classical">
                    Classical
                  </MenuItem>
                </TextField>
              </Box>

              <GuitarTable
                guitars={filteredGuitars}
                selectedGuitar={selectedGuitar}
                onSelectGuitar={selectGuitar}
              />

              <GuitarDetail
                guitar={activeGuitar}
              />
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;