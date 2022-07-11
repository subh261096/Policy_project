import React from "react";
import Box from "@mui/material/Box";
import {Modal, Button, Typography, Stack} from "@mui/material";
import DisplayChart from "../displayChart/displayChart";


// Styling for the modal Pop up
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ChartModal Component to Show the Modal
const ChartModal = ({ isOpen }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        sx={{width: "80%"}}
        onClick={handleOpen}
      >
        Policies Chart
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
                  id="modal-modal-title"
                  sx={{ textAlign: "center" }}
                  variant="h6"
                  component="h2"
                >
                  Policy Count / Month
            </Typography>
            <DisplayChart />
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ChartModal;
