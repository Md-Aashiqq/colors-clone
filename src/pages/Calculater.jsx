import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Calculater() {
  const [value, setValue] = useState({
    loanAmount: "",
    loanYear: "",
    loanInterest: "",
    loanType: "",
    monthlyPayment: "",
    totalPayment: "",
    totalInterest: "",
  });

  const [errorState, setErrorState] = useState({
    loanAmount: false,
    loanAmountErrorMsg: "",
    loanYear: false,
    loanYearErrorMsg: "",
    loanInterest: false,
    loanInterestErrorMsg: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
      if(value < 0 || value === "" || isNaN(value)){
        if (value < 0){
          setErrorState((prev) => ({
            ...prev,
            [name]: true,
            [`${name}ErrorMsg`]: "Value cannot be negative",
          }))
        }
        if (value === "") {
          setErrorState((prev) => ({
            ...prev,
            [name]: true,
            [`${name}ErrorMsg`]: "Value cannot be empty",
          }))
        }
        if (isNaN(value)) {
          setErrorState((prev) => ({
            ...prev,
            [name]: true,
            [`${name}ErrorMsg`]: "Value must be a number",
          }))
        }
       }else{
        setErrorState((prev) => ({
          ...prev,
          [name]: false
        }))
       }
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function caculateEMi() {
    console.log(value)
    const { loanAmount, loanYear, loanInterest , loanType } = value;
    const interest = loanInterest / 100;
    const emi =
      (loanAmount * interest * Math.pow(1 + interest, loanYear)) /
      (Math.pow(1 + interest, loanYear) - 1);
      console.log(emi)
    setValue((prev) => ({
      ...prev,
      monthlyPayment: loanType === "installment" ? emi.toFixed(2) : "",
      totalPayment: loanType === "fulltime" ? loanAmount : "",
    }))

  }

  return (
    <div className="container">
      <div className="left_container">
        <div className="heading">
          <Typography variant="h5">EMI Calculator</Typography>
          <Button className="clear" color="warning" variant="text">
            Clear All
          </Button>
        </div>
        <div className="form">
          <div className="large_input">
            <FormControl sx={{ my: 3 }} fullWidth variant="outlined">
              <InputLabel htmlFor="loan-amount">Loan Amount</InputLabel>
              <OutlinedInput
                label="Loan Amount"
                id="loan-amount"
                onChange={handleInput}
                name="loanAmount"
                value={value.loanAmount}
                error={errorState.loanAmount}
                endAdornment={
                  <InputAdornment className="dollar" position="start">
                    $
                  </InputAdornment>
                }
              />
              {errorState.loanAmount && (
                <FormHelperText error id="accountId-error">
                  {errorState.loanAmountErrorMsg}
                </FormHelperText>
              )}
            </FormControl>
            <div style={{ display: "flex", gap: 10 }}>
              <FormControl sx={{ width: "50%" }} variant="outlined">
                <InputLabel htmlFor="loan-year">Loan Year</InputLabel>
                <OutlinedInput
                  label="Loan Year"
                  id="loan-year"
                  name="loanYear"
                  onChange={handleInput}
                  error={errorState.loanYear}
                  value={value.loanYear}
                  endAdornment={
                    <InputAdornment className="years" position="start">
                      years
                    </InputAdornment>
                  }
                />
                {errorState.loanYear && (
                <FormHelperText error id="accountId-error">
                  {errorState.loanYearErrorMsg}
                </FormHelperText>
              )}
              </FormControl>
              <FormControl sx={{ width: "50%" }} variant="outlined">
                <InputLabel htmlFor="loan-interest">Loan Interest</InputLabel>
                <OutlinedInput
                  label="Loan Interest"
                  id="loan-interest"
                  name="loanInterest"
                  error={errorState.loanInterest}
                  value={value.loanInterest}
                  onChange={handleInput}
                  endAdornment={
                    <InputAdornment position="start">%</InputAdornment>
                  }
                />
                {errorState.loanInterest && (
                <FormHelperText error id="accountId-error">
                  {errorState.loanInterestErrorMsg}
                </FormHelperText>
              )}
              </FormControl>
            </div>
          </div>

          <div className="small_input">
            <Typography sx={{ mt: 3 }} variant="h5">
              Payment type
            </Typography>
            <FormControl>
              {/* <FormLabel id="demo-radio-buttons-group-label">Payment type</FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="full-time"
                name="radio-buttons-group"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value="fulltime"
                  control={<Radio />}
                  label="full-time"
                  name="loanType"
                  onChange={handleInput}
                />
                <FormControlLabel
                  value="installment"
                  control={<Radio />}
                  label="installment"
                  name="loanType"
                  onChange={handleInput}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="cta">
            <Button
              onClick={caculateEMi}
              sx={{ my: 3 }}
              color="success"
              variant="contained"
            >
              Calculate EMI
            </Button>

            {JSON.stringify(value)}
          </div>
        </div>
      </div>
      <div className="right_container"></div>
    </div>
  );
}

export default Calculater;
