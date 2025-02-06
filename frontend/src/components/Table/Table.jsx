import React, { useEffect, useMemo, useState } from 'react';
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
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    error: { main: '#f44336' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
});

const Table = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/table'); // Replace with actual API URL

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const arrayBufferToBase64 = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const columns = useMemo(
    () => [
      { Header: 'Event Name', accessor: 'eventName' },
      { Header: 'Organisation', accessor: 'orgName' },
      { Header: 'Date From', accessor: 'dateFrom' },
      { Header: 'Date Till', accessor: 'dateTill' },
      { Header: 'Venue', accessor: 'venue' },
      { Header: 'Time From', accessor: 'timeFrom' },
      { Header: 'Time Till', accessor: 'timeTill' },
      { Header: 'POC Number', accessor: 'pocNumber' },
      { Header: 'Registration', accessor: 'registrationformlink' },
      { Header: 'Feedback', accessor: 'feedbackformlink' },
      { Header: 'Approval Status', accessor: 'approval' },
      { Header: 'Actions', accessor: 'actions' },
      { Header: 'Logo', accessor: 'logo' },
      { Header: 'Socials', accessor: 'socials' },
    ],
    []
  );

  const renderSocials = (socials) => {
    return Object.entries(socials)
      .map(([key, value]) => (
        <Typography key={key} variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
          {key}: <Link href={value} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.light' }}>{value}</Link>
        </Typography>
      ));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ padding: '30px', backgroundColor: 'transparent', minHeight: '10vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            Events
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setSearchOpen(!searchOpen)} sx={{ color: 'text.primary' }}>
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
                  input: { color: 'text.primary' },
                  bgcolor: 'background.paper',
                  borderRadius: '5px',
                  width: '200px',
                  transition: 'width 0.3s ease-in-out',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        sx={{ color: 'text.primary' }}
                        onClick={() => {
                          setSearchQuery('');
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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {!loading && !error && (
          <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 3, backgroundColor: 'background.paper' }}>
            <MuiTable>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.dark' }}>
                  {columns.map((column) => (
                    <TableCell key={column.accessor} sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>
                      {column.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, rowIndex) => (
                    <TableRow key={rowIndex} sx={{ '&:hover': { backgroundColor: '#333333' }, transition: 'background 0.3s ease-in-out' }}>
                      {columns.map((column) => (
                        <TableCell key={column.accessor} sx={{ textAlign: 'center', color: 'text.primary', padding: '12px' }}>
                          {column.accessor === 'registrationformlink' || column.accessor === 'feedbackformlink' ? (
                            <Link href={row[column.accessor]} target="_blank" rel="noopener noreferrer" sx={{ color: 'primary.light', fontWeight: 'bold', textDecoration: 'none' }}>
                              {column.accessor === 'registrationformlink' ? 'Register' : 'Feedback'}
                            </Link>
                          ) : column.accessor === 'actions' ? (
                            row.approval === 'pending' ? (
                              <>
                                <Button variant="contained" color="primary" size="small" sx={{ marginRight: 1, borderRadius: 2 }}>
                                  Edit
                                </Button>
                                <Button variant="contained" color="secondary" size="small" sx={{ borderRadius: 2 }}>
                                  Delete
                                </Button>
                              </>
                            ) : (
                              <Button variant="contained" color="error" size="small" sx={{ borderRadius: 2 }}>
                                Cancel
                              </Button>
                            )
                          ) : column.accessor === 'logo' ? (
                            <img src={`data:image/png;base64,${arrayBufferToBase64(row[column.accessor].data)}`} alt="logo" style={{ width: '50px', height: '50px' }} />
                          ) : column.accessor === 'socials' ? (
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
                    <TableCell colSpan={columns.length} sx={{ textAlign: 'center', padding: '20px', color: 'text.secondary' }}>
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Table;
