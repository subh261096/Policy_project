import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, Stack, Typography, Modal } from "@mui/material";
import TextHandle from "../inputHandle/textHandle";
import DropDownHandle from "../inputHandle/dropDownHandle";
import CustomDropDown from "../inputHandle/customDropDown";

// Style for the Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

// EditPolicy Component to edit the policy details
const EditPolicy = ({ results, callbackUpdate }) => {
  const policyId = results.policy_id;
  const [premium, setPremium] = useState(results.premium);
  const [error, setError] = useState(false);
  const [propertyDamageLiability, setPropertyDamageLiability] = useState(
    results.property_damage_liability
  );
  const [vehicleSegment, setVehicleSegment] = useState(results.vehicle_Segment);
  const [bodyInjuryLiability, setBodyInjuryLiability] = useState(
    results.body_injury_liability
  );
  const [collision, setCollision] = useState(results.collision);
  const [comprehensive, setComprehensive] = useState(results.comprehensive);
  const [customerGender, setCustomerGender] = useState(results.customer_gender);
  const customerId = results.customer_id;
  const [customerIncomeGroup, setCustomerIncomeGroup] = useState(
    results.customer_income_group
  );
  const [customerMaritalStatus, setCustomerMaritalStatus] = useState(
    results.customer_marital_status
  );
  const [customerRegion, setCustomerRegion] = useState(results.customer_gender);
  const dateOfPurchase = results.date_of_purchase;
  const [fuel, setFuel] = useState(results.fuel);
  const [personalInjuryProtection, setPersonalInjuryProtection] = useState(
    results.personal_injury_protection
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    const updatedResult = {
      policy_id: policyId,
      premium: premium,
      property_damage_liability: propertyDamageLiability,
      vehicle_Segment: vehicleSegment,
      body_injury_liability: bodyInjuryLiability,
      collision: collision,
      comprehensive: comprehensive,
      customer_gender: customerGender,
      customer_id: customerId,
      customer_income_group: customerIncomeGroup,
      customer_marital_status: customerMaritalStatus,
      customer_region: customerRegion,
      date_of_purchase: dateOfPurchase,
      fuel: fuel,
      personal_injury_protection: personalInjuryProtection,
    };
    if (premium > 1000000) {
      setError("Premium amount should be less than $1000000");
    } else{
      fetch(
        `https://policy-updater.herokuapp.com/policy_id/${results.policy_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedResult),
        }
      )
        .then((response) => response.ok)
        .then(() => {
          callbackUpdate(updatedResult);
          setOpen(false);
        })
        .catch(console.error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="column" spacing={2}>
            <Typography
              id="modal-modal-title"
              sx={{ textAlign: "center" }}
              variant="h6"
              component="h2"
            >
              Modify Policy Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextHandle
                  field="policy_id"
                  value={results["policy_id"]}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextHandle
                  field="customer_id"
                  value={results["customer_id"]}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextHandle
                  field="date_of_purchase"
                  value={results["date_of_purchase"]}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <TextHandle
                  field="premium"
                  value={results["premium"]}
                  callback={(value) => setPremium(value)}
                  type="number"
                />
                <Typography
                  id="modal-modal-title"
                  sx={{ textAlign: "center", fontSize: "15px", color: "red" }}
                >
                  {error}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <CustomDropDown
                  field="customer_gender"
                  dropItems={{ Male: "Male", Female: "Female" }}
                  value={results["customer_gender"]}
                  callback={(value) => setCustomerGender(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="Married"
                  value={results["customer_marital_status"]}
                  callback={(value) => setCustomerMaritalStatus(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomDropDown
                  field="customer_region"
                  dropItems={{
                    East: "East",
                    West: "West",
                    North: "North",
                    South: "South",
                  }}
                  value={results["customer_region"]}
                  callback={(value) => setCustomerRegion(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomDropDown
                  field="customer_income_group"
                  dropItems={{
                    "0- $25K": "0- $25K",
                    "$25-$70K": "$25-$70K",
                    ">$70K>": ">$70K",
                  }}
                  value={results["customer_income_group"]}
                  callback={(value) => setCustomerIncomeGroup(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomDropDown
                  field="vehicle_Segment"
                  dropItems={{
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D",
                    E: "E",
                    F: "F",
                    G: "G",
                    H: "H",
                  }}
                  value={results["vehicle_Segment"]}
                  callback={(value) => setVehicleSegment(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <CustomDropDown
                  dropItems={{
                    CNG: "CNG",
                    Diesel: "Diesel",
                    Petrol: "Petrol",
                    LPG: "LPG",
                  }}
                  field="fuel"
                  value={results["fuel"]}
                  callback={(value) => setFuel(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="body_injury_liability"
                  value={results["body_injury_liability"]}
                  callback={(value) => setBodyInjuryLiability(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="collision"
                  value={results["collision"]}
                  callback={(value) => setCollision(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="comprehensive"
                  value={results["comprehensive"]}
                  callback={(value) => setComprehensive(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="property_damage_liability"
                  value={results["property_damage_liability"]}
                  callback={(value) => setPropertyDamageLiability(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DropDownHandle
                  field="personal_injury_protection"
                  value={results["personal_injury_protection"]}
                  callback={(value) => setPersonalInjuryProtection(value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="success"
                  style={{ textTransform: "none", padding: "14px 0px" }}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default EditPolicy;
