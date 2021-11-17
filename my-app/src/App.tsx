import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React from 'react';
import './App.css';

interface IMDBResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const App = () => {
  const [searchResults, setSearchResults] = React.useState<IMDBResult[]>([]);
  const [userSearch, setUserSearch] = React.useState('');
  const [goSearch, setGoSearch] = React.useState(false);

  React.useEffect(() => {
    // Grabbing movie search results
    const url = `http://www.omdbapi.com/?s=${userSearch}&apikey=d47e0a4b`;

    const fetchAPIResults = () => {
      axios.get(url).then((response) => {
        setSearchResults(response.data.Search);
      });
    };

    fetchAPIResults();
  }, [goSearch]);

  return (
    <div className='App'>
      <header className='App-header'></header>
      {/* User Form Search */}
      <div>
        <TextField
          id='filled-basic'
          label='searchTerm'
          variant='filled'
          onChange={(e) => {
            setGoSearch(false);
            setUserSearch(e.target.value);
          }}
        />
        <Button
          variant='contained'
          onClick={(e) => {
            setGoSearch(true);
          }}
        >
          Search
        </Button>
      </div>

      {/* User Table Display */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Year</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Poster</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults &&
              searchResults.map((searchResult) => (
                <TableRow
                  key={searchResult.imdbID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {searchResult.Title}
                  </TableCell>
                  <TableCell align='right'>{searchResult.Year}</TableCell>
                  <TableCell align='right'>{searchResult.Type}</TableCell>
                  <TableCell align='right'>
                    <img
                      src={searchResult.Poster}
                      alt={searchResult.Title}
                      width='500'
                      height='500'
                    ></img>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
