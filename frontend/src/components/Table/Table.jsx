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
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const data = useMemo(
  //   () => [
  //     {
  //       eventName: 'Tech Conference 2024',
  //       orgName: 'Tech Corp',
  //       dateFrom: '2024-05-10',
  //       dateTill: '2024-05-12',
  //       venue: 'Grand Hall A',
  //       timeFrom: '09:00 AM',
  //       timeTill: '05:00 PM',
  //       registrationformlink: 'http://techconf.com/register',
  //       feedbackformlink: 'http://techconf.com/feedback',
  //       pocNumber: '9988776655',
  //       approval: 'approved',
  //     },
  //     {
  //       eventName: 'AI Symposium',
  //       orgName: 'AI Innovators',
  //       dateFrom: '2024-06-15',
  //       dateTill: '2024-06-16',
  //       venue: 'Tech Park',
  //       timeFrom: '10:00 AM',
  //       timeTill: '04:00 PM',
  //       registrationformlink: 'http://aisymposium.com/register',
  //       feedbackformlink: 'http://aisymposium.com/feedback',
  //       pocNumber: '9911223344',
  //       approval: 'pending',
  //     },
  //     {
  //       eventName: 'Cloud Expo',
  //       orgName: 'Cloud Masters',
  //       dateFrom: '2024-07-01',
  //       dateTill: '2024-07-03',
  //       venue: 'Expo Center',
  //       timeFrom: '11:00 AM',
  //       timeTill: '06:00 PM',
  //       registrationformlink: 'http://cloudexpo.com/register',
  //       feedbackformlink: 'http://cloudexpo.com/feedback',
  //       pocNumber: '9876543212',
  //       approval: 'approved',
  //     },
  //     {
  //       eventName: 'Startup Meetup',
  //       orgName: 'Entrepreneurs Hub',
  //       dateFrom: '2024-08-20',
  //       dateTill: '2024-08-21',
  //       venue: 'Innovation Hub',
  //       timeFrom: '09:30 AM',
  //       timeTill: '05:30 PM',
  //       registrationformlink: 'http://startupmeetup.com/register',
  //       feedbackformlink: 'http://startupmeetup.com/feedback',
  //       pocNumber: '9955667788',
  //       approval: 'pending',
  //     },
  //     {
  //       eventName: 'Cybersecurity Summit',
  //       orgName: 'CyberShield',
  //       dateFrom: '2024-09-10',
  //       dateTill: '2024-09-12',
  //       venue: 'Cyber Center',
  //       timeFrom: '08:45 AM',
  //       timeTill: '04:45 PM',
  //       registrationformlink: 'http://cybersummit.com/register',
  //       feedbackformlink: 'http://cybersummit.com/feedback',
  //       pocNumber: '9922334455',
  //       approval: 'approved',
  //     },
  //     {
  //       eventName: 'Blockchain Conference',
  //       orgName: 'CryptoWorld',
  //       dateFrom: '2024-10-05',
  //       dateTill: '2024-10-07',
  //       venue: 'Blockchain Hub',
  //       timeFrom: '10:15 AM',
  //       timeTill: '06:30 PM',
  //       registrationformlink: 'http://blockchainconf.com/register',
  //       feedbackformlink: 'http://blockchainconf.com/feedback',
  //       pocNumber: '9966554433',
  //       approval: 'pending',
  //     },
  //   ],
  //   []
  // );

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

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
    ],
    []
  );

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
