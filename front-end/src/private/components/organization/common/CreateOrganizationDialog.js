import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import axiosInstance from "../../../Common/AxiosInstance";

const initialValues = {
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  description: null,
};

function CreateOrganizationDialog({
  open,
  handleOrganizationDialog,
  handleFetchOrganizationData,
}) {
  const { values, error, handleSubmit, handleChange, handleReset } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      await axiosInstance.post("/users/organization", values);
      handleReset();
      handleOrganizationDialog();
      handleFetchOrganizationData();
    },
  });

  const handleCloseCreateTask = () => {
    handleOrganizationDialog();
    handleReset();
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <label htmlFor="name">Name</label>
              <TextField
                fullWidth
                size="small"
                name="name"
                value={values.name}
                placeholder="Name"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="address">Address</label>
              <TextField
                fullWidth
                size="small"
                name="address"
                value={values.address}
                placeholder="Address"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="country">Country</label>
              <TextField
                select
                fullWidth
                size="small"
                name="country"
                value={values.country}
                onChange={handleChange}
              >
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            </Grid>
            <Grid size={6}>
              <label htmlFor="state">State</label>
              <TextField
                select
                fullWidth
                size="small"
                name="state"
                value={values.state}
                onChange={handleChange}
              >
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            </Grid>
            <Grid size={6}>
              <label htmlFor="city">City</label>
              <TextField
                select
                fullWidth
                size="small"
                name="city"
                value={values.city}
                onChange={handleChange}
              >
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="description">Description</label>
              <TextField
                fullWidth
                size="small"
                name="description"
                rows={5}
                value={values.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: "", justifyContent: "flex-start" }}>
          <Button variant="outlined" onClick={handleCloseCreateTask}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateOrganizationDialog;
