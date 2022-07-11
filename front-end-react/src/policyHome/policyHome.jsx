import { useState, React } from "react";
import Stack from "@mui/material/Stack";
import Policies from "../policies/policies";
import ChartModal from "../chartModal/chartModal";
import "../policyHome/policyHome.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CircularProgress
} from "@mui/material";

// Handle Searching of Policies
const SearchPolicy = () => {
  const [searchId, setSearchId] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState("policy_id");
  const [noResults, setNoResults] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchId) {
      setError(true);
      setErrorMessage("Search Id Cannot be empty");
    }else{
      setError(false);
      setIsLoading(true);
      fetch(`https://policy-updater.herokuapp.com/${searchType}/${searchId}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        if (parsedResponse.length) {
          setIsLoading(false);
          setNoResults(false);
          setSearchResults(parsedResponse);
        } else {
          setIsLoading(false);
          setError(true);
          setErrorMessage("No Results Found!!")
          setNoResults(true);
        }
      })
      .catch(console.error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!isNaN(+value)) {
      setSearchId(event.target.value);
    }
  };

  return (
    <div className="Search-Policy">
      <div className="customer-container">
        <Stack direction="row" spacing={2}>
          <ChartModal />
          <TextField
            label="Search"
            aria-label="policy_id, customer_id"
            placeholder="Search with Id"
            onChange={handleInputChange}
          />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Search Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={searchType}
              label="Search Type"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
              defaultValue={searchType}
            >
              <MenuItem value="policy_id">By Policy ID</MenuItem>
              <MenuItem value="customer_id">By Customer ID</MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{ float: "right" }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </Stack>
      </div>

      <p className="error-message">{ error && errorMessage}</p>
      {((noResults && !isLoading) || error) && (
        <>
          <p className="home-text">
            Search for your favourite policies and easily update according to
            your choice.
          </p>
        </>
      )}
      {isLoading && (<CircularProgress />)}
      {!noResults && !isLoading && (
        <>
          <Policies items={searchResults} />
        </>
      )}
    </div>
  );
};

export default SearchPolicy;
