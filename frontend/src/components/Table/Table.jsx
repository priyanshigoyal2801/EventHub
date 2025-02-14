import React, { useEffect, useMemo, useState } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Button,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Modal,
  Snackbar,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { GetApp as DownloadIcon } from '@mui/icons-material';
import axios from "axios";
import SubmitApplication from "../../pages/SubmitApplication";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    error: { main: "#f44336" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff", secondary: "#b0b0b0" },
  },
});

const getColumns = (type) => {
  switch (type) {
    case "dashboard":
      return [
        { Header: "Logo", accessor: "logo" },
        { Header: "Event Name", accessor: "eventName" },
        { Header: "Organisation", accessor: "orgName" },
        { Header: "Date From", accessor: "dateFrom" },
        { Header: "Date Till", accessor: "dateTill" },
        { Header: "Venue", accessor: "venue" },
        { Header: "Time From", accessor: "timeFrom" },
        { Header: "Time Till", accessor: "timeTill" },
        { Header: "Registration", accessor: "registrationformlink" },
        { Header: "Feedback", accessor: "feedbackformlink" },
        //{ Header: "Approval Status", accessor: "approval" },
        { Header: "Socials", accessor: "socials" },
      ];
    case "society":
      return [
        { Header: "Event Name", accessor: "eventName" },
        { Header: "Date From", accessor: "dateFrom" },
        { Header: "Date Till", accessor: "dateTill" },
        { Header: "Venue", accessor: "venue" },
        { Header: "Registration", accessor: "registrationformlink" },
        { Header: "Feedback", accessor: "feedbackformlink" },
        { Header: "Description", accessor: "description" },
        { Header: "Socials", accessor: "socials" },
        { Header: "Proposal", accessor: "proposal" },
        { Header: "Approval Status", accessor: "approval" },
        { Header: "Actions", accessor: "actions" },
      ];
    case "admin":
      return [
        { Header: "Logo", accessor: "logo" },
        { Header: "Event Name", accessor: "eventName" },
        { Header: "Organisation", accessor: "orgName" },
        { Header: "Venue", accessor: "venue" },
        { Header: "Date From", accessor: "dateFrom" },
        { Header: "Date Till", accessor: "dateTill" },
        { Header: "Time From", accessor: "timeFrom" },
        { Header: "Time Till", accessor: "timeTill" },
        { Header: "Approval Status", accessor: "approval" },
        { Header: "POC", accessor: "pocNumber" },
        { Header: "Actions", accessor: "actions" },
      ];
    default:
      return [];
  }
};

const Table = ({ type }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/table?type=${type}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("Fetched events:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = useMemo(() => getColumns(type), [type]);

  const renderSocials = (socials) => {
    return Object.entries(socials).map(([key, value]) => (
      <Typography key={key} variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
        {key}:{" "}
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "primary.light" }}
        >
          {value}
        </Link>
      </Typography>
    ));
  };

  const openModal = (description) => {
    setModalContent(description);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/table/${id}`);
      setData(data.filter((item) => item._id !== id));
      setSnackbarMessage("Event deleted successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting event:", error);
      setSnackbarMessage("Error deleting event");
      setSnackbarOpen(true);
    }
  };

  const handleEdit = (row) => {
    setEditData(row);
    setModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          padding: "30px",
          backgroundColor: "transparent",
          minHeight: "10vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            Events
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setSearchOpen(!searchOpen)}
              sx={{ color: "text.primary" }}
            >
              <SearchIcon />
            </IconButton>

            {searchOpen && (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  input: { color: "text.primary" },
                  bgcolor: "background.paper",
                  borderRadius: "5px",
                  width: "200px",
                  transition: "width 0.3s ease-in-out",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        sx={{ color: "text.primary" }}
                        onClick={() => {
                          setSearchQuery("");
                          setSearchOpen(false);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Box>
        </Box>

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!loading && !error && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              backgroundColor: "background.paper",
            }}
          >
            <MuiTable>
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.dark" }}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "12px",
                      }}
                    >
                      {column.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        "&:hover": { backgroundColor: "#333333" },
                        transition: "background 0.3s ease-in-out",
                      }}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.accessor}
                          sx={{
                            textAlign: "center",
                            color: "text.primary",
                            padding: "12px",
                          }}
                        >
                          {column.accessor === "registrationformlink" ||
                          column.accessor === "feedbackformlink" ? (
                            <Link
                              href={row[column.accessor]}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: "primary.light",
                                fontWeight: "bold",
                                textDecoration: "none",
                              }}
                            >
                              {column.accessor === "registrationformlink"
                                ? "Register"
                                : "Feedback"}
                            </Link>
                          ) : column.accessor === "actions" ? (
                            row.approval === "Pending" ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  sx={{ marginRight: 1, borderRadius: 2 }}
                                  onClick={() => handleEdit(row)}
                                >
                                  Edit
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ borderRadius: 2 }}
                                onClick={() => handleDelete(row._id)}
                              >
                                Cancel Event
                              </Button>
                            )
                          ) : column.accessor === "logo" ? (
                            <img
                              src={row.logo}
                              alt="logo"
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : column.accessor === "description" ? (
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => openModal(row.description)}
                            >
                              View
                            </Button>
                          ) : column.accessor === "proposal" ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              sx={{ borderRadius: 2 }}
                              href={row[column.accessor]}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <DownloadIcon />
                            </Button>
                          ) : column.accessor === "socials" ? (
                            renderSocials(row[column.accessor])
                          ) : (
                            row[column.accessor]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      sx={{
                        textAlign: "center",
                        padding: "20px",
                        color: "text.secondary",
                      }}
                    >
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
        )}
        <Modal
          open={modalOpen}
          onClose={closeModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              padding: "20px",
              width: "400px",
              bgcolor: "background.paper",
            }}
          >
            {editData ? (
              <SubmitApplication editData={editData} onClose={closeModal} />
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", fontWeight: "bold" }}
                >
                  Event Description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", marginTop: "10px" }}
                >
                  {modalContent}
                </Typography>
                <Button
                  onClick={closeModal}
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "15px", width: "100%" }}
                >
                  Close
                </Button>
              </>
            )}
          </Paper>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Table;