import React, { useMemo, useRef } from 'react';
import ReactTableUI from 'react-table-ui';
import { Box } from '@mui/material';
import styles from './Table.module.css';

const Table = () => {
  const data = useMemo(
    () => [
      { event: 'Event 1', organisation: 'Org 1', date: '2023-10-01', venue: 'Venue 1', time: '10:00 AM', registrationLink: 'http://example.com', feedbackForm: 'http://example.com' },
      { event: 'Event 2', organisation: 'Org 2', date: '2023-10-02', venue: 'Venue 2', time: '11:00 AM', registrationLink: 'http://example.com', feedbackForm: 'http://example.com' },
      { event: 'Event 3', organisation: 'Org 3', date: '2023-10-03', venue: 'Venue 3', time: '12:00 PM', registrationLink: 'http://example.com', feedbackForm: 'http://example.com' },
      { event: 'Event 4', organisation: 'Org 4', date: '2023-10-04', venue: 'Venue 4', time: '01:00 PM', registrationLink: 'http://example.com', feedbackForm: 'http://example.com' }
    ],
    []
  );

  const columns = useMemo(
    () => [
      { Header: 'Event', accessor: 'event' },
      { Header: 'Organisation', accessor: 'organisation' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Venue', accessor: 'venue' },
      { Header: 'Time', accessor: 'time' },
      { Header: 'Registration Link', accessor: 'registrationLink', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">Register</a> },
      { Header: 'Feedback Form', accessor: 'feedbackForm', Cell: ({ value }) => <a href={value} target="_blank" rel="noopener noreferrer">Feedback</a> }
    ],
    []
  );

  const tableInstanceRef = useRef(null);

  return (
    <Box className={styles.tableContainer}>
      <ReactTableUI
        title="Events Table"
        data={data}
        columns={columns}
        tableInstanceRef={tableInstanceRef}
        options={{
          pagination: true,
          search: true,
          striped: true,
          highlight: true,
          responsive: true,
        }}
        className={styles.reactTable}
      />
    </Box>
  );
};

export default Table;