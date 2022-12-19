/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const ExampleContext = React.createContext();
function SearchAppBar() {
  const [loading, setLoading] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [movied, setMovied] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (searchMovie) {
          const res = await apiService.get(
            `search/movie?api_key=${API_KEY}&query=${searchMovie}&page=1`
          );
          setMovied(res.data.results);

          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [searchMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMovie(searchInput);
  };

  return (
    <>
      <ExampleContext.Provider value={movied}>
        <Box display="flex" flexDirection="row">
          <Search>
            <StyledInputBase
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button
            component={Link}
            to="/search"
            onClick={handleSubmit}
            color="inherit"
            disableRipple={true}
            childen={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
      </ExampleContext.Provider>
    </>
  );
}
export default SearchAppBar;
