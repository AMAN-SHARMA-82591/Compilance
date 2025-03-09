import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { TextField, CircularProgress, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import axiosInstance from "../../../Common/AxiosInstance";
import { useParams } from "react-router";
import PageHeader from "../../../Common/PageHeader";

function OrganizationDetails(props) {
  // const [error, setError] = useState(false);
  const [orgDetails, setOrgDetails] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const { id: orgId } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name Field is required")
      .min(3, "Name must be at least 3 charachter long"),
  });

  const initialValues = {
    name: "",
    city: "",
    state: "",
    address: "",
    country: "",
    description: "",
  };

  const { values, errors, handleSubmit, handleChange, handleReset, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const response = await axiosInstance.patch(
          `/users/organization/${orgDetails._id}`,
          values
        );
        if (response.data) {
          setOrgDetails({ ...orgDetails, ...values });
        }
        setEditProfile(false);
      },
    });

  const fetchData = useCallback(async () => {
    const response = await axiosInstance.get(`/users/organization/${orgId}`);
    const { data } = response.data;
    setOrgDetails(data);
  }, [orgId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenProfileEdit = () => {
    setEditProfile(true);
    setValues({
      name: orgDetails.name || "",
      city: orgDetails.city || "",
      state: orgDetails.state || "",
      address: orgDetails.address || "",
      country: orgDetails.country || "",
      description: orgDetails.description || "",
    });
  };

  const handleCloseProfileEdit = () => {
    handleReset();
    setEditProfile(false);
  };

  if (!orgDetails) {
    return (
      <div className="people-main">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main>
      <PageHeader
        submitBtnTitle="Submit"
        onSubmit={editProfile ? handleSubmit : null}
        title="Organization Details"
        buttonTitle={editProfile ? "Cancel" : "Edit Organization"}
        onClick={editProfile ? handleCloseProfileEdit : handleOpenProfileEdit}
      />
      <div className="profile-main-section">
        <Grid container spacing={3} className="profile-details-section">
          <Grid item="true" size={6} className="profile-details-item">
            <p>Name</p>
            {!editProfile ? (
              <p>{orgDetails?.name}</p>
            ) : (
              <>
                <TextField
                  fullWidth
                  size="small"
                  name="name"
                  placeholder="Title"
                  error={errors.name}
                  value={values.name}
                  helperText={errors.name}
                  onChange={handleChange}
                />
              </>
            )}
          </Grid>
          <Grid item="true" size={6} className="profile-details-item">
            <p>Address</p>
            {!editProfile ? (
              <p>{orgDetails?.address}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="address"
                placeholder="Address"
                error={errors.address}
                value={values.address}
                onChange={handleChange}
                helperText={errors.address}
              />
            )}
          </Grid>
          <Grid item="true" size={6} className="profile-details-item">
            <p>Country</p>
            {!editProfile ? (
              <p>{orgDetails?.country}</p>
            ) : (
              <TextField
                select
                fullWidth
                size="small"
                name="country"
                value={values.country}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Select Value</em>
                </MenuItem>
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            )}
          </Grid>
          <Grid item="true" size={6} className="profile-details-item">
            <p>State</p>
            {!editProfile ? (
              <p>{orgDetails?.state}</p>
            ) : (
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
            )}
          </Grid>
          <Grid item="true" size={6} className="profile-details-item">
            <p>City</p>
            {!editProfile ? (
              <p>{orgDetails?.city}</p>
            ) : (
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
            )}
          </Grid>
          <Grid item="true" size={6} className="profile-details-item">
            <p>Description</p>
            {!editProfile ? (
              <p>{orgDetails?.description}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="description"
                rows={5}
                value={values.description}
                placeholder="Description"
                onChange={handleChange}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </main>
  );
}

export default OrganizationDetails;
