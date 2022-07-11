import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  formatBooleanValues,
  formatMaritalStatus,
} from "../services/formatData";
import "./viewPolicy.css";

// Custome Sylying for Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  height: "500px",
  bgcolor: "#F8F8F8",
  borderTopLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  p: 4,
};

// View Policy to show modal for Policy Details
const ViewPolicy = ({ results }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="main-header-container">
            <div className="main-header">
              <div className="main-title">Policy Id</div>
              <div className="main-value">{results.policy_id}</div>
            </div>
            <div className="main-header">
              <div className="main-title">Date of Purchase</div>
              <div className="main-value">{results.date_of_purchase}</div>
            </div>
            <div className="main-header">
              <div className="main-title">Customer Id</div>
              <div className="main-value">{results.customer_id}</div>
            </div>
          </div>

          <div className="row">
            <div className="row-outer-container">
              <div className="row-title" tabIndex={0}>
                Vehicle Details
              </div>
              <div className="row-inner-container">
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Segment
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {results.vehicle_Segment}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Fuel Type
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {results.fuel}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Premium Amount
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {"$" + results.premium}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="row-outer-container">
              <div className="row-title" tabIndex={0}>
                Customer Details
              </div>
              <div className="row-inner-container">
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Gender
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {results.customer_gender}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Marital Status
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatMaritalStatus(results.customer_marital_status)}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Income Group
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {results.customer_income_group}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Region
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {results.customer_region}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="row-outer-container">
              <div className="row-title" tabIndex={0}>
                Liabilities
              </div>
              <div className="row-inner-container">
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Bodily Injury
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatBooleanValues(results.body_injury_liability)}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Peronal Injury
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatBooleanValues(results.personal_injury_protection)}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Property Damage
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatBooleanValues(results.property_damage_liability)}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Collision
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatBooleanValues(results.collision)}
                  </div>
                </div>
                <div className="row-element">
                  <div className="row-element-title" tabIndex={0}>
                    Comprehensive
                  </div>
                  <div className="row-element-value" tabIndex={0}>
                    {formatBooleanValues(results.comprehensive)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewPolicy;
