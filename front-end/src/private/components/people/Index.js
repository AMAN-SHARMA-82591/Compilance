import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import { isEmpty } from "lodash";
import { MenuItem, TextField, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axiosInstance from "../../Common/AxiosInstance";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { ProfileSkeleton } from "../../Common/Skeleton";
import DeleteBox from "@mui/icons-material/Delete";
import PageHeader from "../../Common/PageHeader";
import { ConfirmDialogBox } from "../../Common/DialogBox";
import { toastError } from "../../Common/ToastContainer";
import { authAdminRole } from "../../Common/Constants";
import { useSelector } from "react-redux";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Field is required"),
  name: Yup.string()
    .required("Name Field is required")
    .min(3, "Name must be at least 3 charachter long"),
  orgId: Yup.string().required("Organization Field is required"),
});

function Index() {
  let content;
  const profileData = useSelector(
    (store) => store.basicInformation?.data?.profile
  );
  const organizationData = useSelector((store) => store.organizationData?.data);
  const navigate = useNavigate();
  const [peopleList, setPeopleList] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const initialValues = {
    name: "",
    orgId: "",
    email: "",
    company: "",
    department: "",
    designation: "",
    phone_number: "",
  };
  const { values, errors, handleSubmit, handleChange, handleReset } = useFormik(
    {
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (values) => {
        await axiosInstance.post("/users/profile", values);
        setOpenDeleteDialog(false);
        handleFetchUserProfiles();
        handleCloseCreateUser();
      },
    }
  );

  const handleFetchUserProfiles = useCallback(async () => {
    const response = await axiosInstance.get("/users/profile");
    if (!isEmpty(response.data)) setPeopleList(response?.data?.profileList);
  }, []);

  const handleDeletUserProfile = async () => {
    if (deleteProfileId) {
      const response = await axiosInstance.delete(
        `/users/profile/${deleteProfileId}`
      );
      if (!isEmpty(response.data)) handleFetchUserProfiles();
      setDeleteProfileId(null);
      setOpenDeleteDialog(false);
    } else {
      toastError("Profile Id not found.");
    }
  };

  useEffect(() => {
    handleFetchUserProfiles();
  }, [handleFetchUserProfiles]);

  const handleOpenCreateUser = () => {
    setOpenCreate(true);
  };

  const handleCloseCreateUser = () => {
    setOpenCreate(false);
    handleReset();
  };

  if (!isEmpty(peopleList)) {
    content = peopleList.map((people) => (
      <div
        key={people._id}
        className="profile-box"
        onClick={() => navigate(`/people/${people._id}`)}
      >
        {profileData.role !== 0 && !authAdminRole.includes(people.role) && (
          <IconButton
            className="delete_icon_button"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteProfileId(people._id);
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteBox color="error" />
          </IconButton>
        )}
        <Avatar alt={people.name.split("")[0]} src={people.image} />
        <div style={{ marginLeft: 15 }}>
          <p>{people.name}</p>
          <p>{people.email}</p>
          <p>{people.department || "User"}</p>
        </div>
      </div>
    ));
  } else {
    content = [...Array(3)].map((_, index) => <ProfileSkeleton key={index} />);
  }
  const main = (
    <PageHeader
      title="Meet Our Team"
      buttonTitle="Create New User"
      onClick={handleOpenCreateUser}
    >
      <div className="people-main">{content}</div>
    </PageHeader>
  );

  const createSection = (
    <>
      <PageHeader
        title="Create New User"
        buttonTitle="Cancel"
        submitBtnTitle="Submit"
        onSubmit={handleSubmit}
        onClick={handleCloseCreateUser}
      />
      <div className="people-create-main">
        <Grid container spacing={3} className="profile-details-section">
          <Grid size={6} className="profile-details-item">
            <p>Name</p>
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
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Email</p>
            <TextField
              fullWidth
              size="small"
              name="email"
              placeholder="Email"
              error={errors.email}
              value={values.email}
              onChange={handleChange}
              helperText={errors.email}
            />
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Organization</p>
            <TextField
              select
              fullWidth
              size="small"
              label="Select Organization"
              name="orgId"
              error={errors.orgId}
              value={values.orgId}
              onChange={handleChange}
            >
              {!isEmpty(organizationData) &&
                organizationData.map((org) => (
                  <MenuItem key={org._id} value={org._id}>
                    {org.name && org.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Phone Number</p>
            <TextField
              fullWidth
              size="small"
              name="phone_number"
              placeholder="Phone Number"
              error={errors.phone_number}
              value={values.phone_number}
              onChange={handleChange}
              helperText={errors.phone_number}
            />
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Department</p>
            <TextField
              fullWidth
              size="small"
              name="department"
              onChange={handleChange}
              placeholder="Department"
              error={errors.department}
              value={values.department}
              helperText={errors.department}
            />
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Designation</p>
            <TextField
              fullWidth
              size="small"
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              error={errors.designation}
              value={values.designation}
              helperText={errors.designation}
            />
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Company</p>
            <TextField
              fullWidth
              size="small"
              name="company"
              onChange={handleChange}
              placeholder="Company"
              error={errors.company}
              value={values.company}
              helperText={errors.company}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );

  return (
    <>
      {!openCreate ? main : createSection}
      <ConfirmDialogBox
        submitBtnText="Delete"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onSubmit={() => handleDeletUserProfile()}
        text="Do you want to remove these elements from this report?"
      />
    </>
  );
}

export default Index;
