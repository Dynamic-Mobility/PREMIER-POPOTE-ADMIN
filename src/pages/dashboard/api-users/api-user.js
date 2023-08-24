import React, { useState } from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Grid, Box, Button, Collapse } from "@mui/material";
import { Card, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";

const ApiUsers = () => {
  const permissions = [
    {
      id: 1,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the first description",
    },
    {
      id: 2,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the second description",
    },
    {
      id: 3,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 4,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 7,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 8,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 9,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 10,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
    {
      id: 11,
      label: "Widthdrawal of cash from the bank at low interest rate",
      description: "This is the third description",
    },
  ];

  const [checkboxes, setCheckboxes] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCheckboxChange = (checkboxId) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  // get half length of the permissions array
  const halfLength = Math.ceil(permissions.length / 2);
  const leftHalf = permissions.slice(0, halfLength);
  const rightHalf = permissions.slice(halfLength);
  const router = useRouter();

  // access the state data
  const data = router;

  return (
    <Container>
      <Typography m={2} variant="h6">
        Provide Permissions
      </Typography>
      <Card sx={{ p: 4, m: 2 }}>
        <form>
          {activeStep === 0 && (
            <>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Typography variant="h5">API Access</Typography>
                  {leftHalf.map((permission) => (
                    <>
                      <FormGroup>
                        <FormControlLabel
                          value="end"
                          control={<Checkbox />}
                          checked={checkboxes[permission.id] || false}
                          onChange={() => handleCheckboxChange(permission.id)}
                          label={permission.label}
                          labelPlacement="end"
                        />
                      </FormGroup>
              
                        <>
                          <Collapse
                            in={Boolean(checkboxes[permission.id])}
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                backgroundColor: "#F0F2F5",
                                width: "100%",
                                borderRadius: 1,
                                p: 1,
                              }}
                            >
                              <Typography>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nostrum reiciendis voluptate
                                architecto in voluptates at libero dolorem, odit
                                minus doloremque?
                              </Typography>
                            </Box>
                          </Collapse>
                        </>
              
                    </>
                  ))}
                </Grid>
                <Grid item md={6} xs={12}>
                  {rightHalf.map((permission) => (
                    <>
                      <FormGroup>
                        <FormControlLabel
                          value="end"
                          control={<Checkbox />}
                          checked={checkboxes[permission.id] || false}
                          onChange={() => handleCheckboxChange(permission.id)}
                          label={permission.label}
                          labelPlacement="end"
                        />
                      </FormGroup>
                        <>
                          <Collapse
                            in={Boolean(checkboxes[permission.id])}
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                backgroundColor: "#F0F2F5",
                                width: "100%",
                                borderRadius: 1,
                                p: 1,
                              }}
                            >
                              <Typography>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Nostrum reiciendis voluptate
                                architecto in voluptates at libero dolorem, odit
                                minus doloremque?
                              </Typography>
                            </Box>
                          </Collapse>
                        </>
                    </>
                  ))}
                </Grid>
                <Button
                  onClick={handleNext}
                  sx={{ mx: 2, my: 2 }}
                  size="small"
                  color="primary"
                  variant="contained"
                >
                  Continue
                </Button>
              </Grid>
            </>
          )}

          {activeStep === 1 && (
            <>
              <Grid item md={6} xs={12}>
                <TextField label={"API User"} fullWidth={true} sx={{ my: 1 }} />
                <TextField label={"Secret"} fullWidth={true} sx={{ my: 1 }} />
                <TextField label={"Key"} fullWidth={true} sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    onClick={handlePrev}
                    sx={{ my: 2 }}
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Back
                  </Button>
                  <Button
                    sx={{ my: 2 }}
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </Box>
              </Grid>
            </>
          )}
        </form>
      </Card>
    </Container>
  );
};

ApiUsers.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default ApiUsers;
