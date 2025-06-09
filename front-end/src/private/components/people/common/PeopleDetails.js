import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router";
import jsImage from "../../../../images/defaultImg.png";
import axiosInstance from "../../../Common/AxiosInstance";
import { toastError } from "../../../Common/ToastContainer";
import { handleApiError } from "../../../Common/ErrorHandler";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedProfile } from "../../../../store/slices/profileSlice";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email Field is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .notRequired(),
  name: Yup.string()
    .required("Name Field is required")
    .min(3, "Name must be at least 3 charachter long"),
});

function PeopleDetails() {
  const dispatch = useDispatch();
  const profileId = useSelector(
    (state) => state.basicInformation?.profile?._id || null
  );
  const [error, setError] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [profileImageDialog, setProfileImageDialog] = useState(false);
  const { id: peopleId } = useParams();

  const initialValues = {
    company: "",
    name: "",
    phone_number: null,
    department: "",
    email: "",
    website: "",
    location: "",
    status: "",
    skills: [],
    bio: "",
  };

  const { values, errors, handleSubmit, handleChange, handleReset, setValues } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          const response = await axiosInstance.patch(
            `/users/profile/${profileDetails._id}`,
            values
          );
          if (response.data) {
            setProfileDetails({ ...profileDetails, ...values });
            dispatch(fetchLoggedProfile());
          }
          setEditProfile(false);
        } catch (error) {
          const { message } = handleApiError(error);
          toastError(message);
        }
      },
    });

  const fetchData = useCallback(async () => {
    const response = await axiosInstance.get(`/users/profile/${peopleId}`);
    setProfileDetails(response.data);
  }, [peopleId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeProfileImage = () => {
    setError(false);
    setImageURL(null);
    setImagePreview(null);
    setProfileImageDialog((profileImageDialog) => !profileImageDialog);
  };

  const handleOpenProfileEdit = () => {
    setEditProfile(true);
    setValues({
      company: profileDetails.company || "",
      name: profileDetails.name || "",
      phone_number: profileDetails.phone_number || null,
      department: profileDetails.department || "",
      designation: profileDetails.designation || "",
      email: profileDetails.email || "",
      website: profileDetails.website || "",
      location: profileDetails.location || "",
      status: profileDetails.status || "",
      skills: profileDetails.skill || [],
      bio: profileDetails.bio || "",
    });
  };

  const handleCloseProfileEdit = () => {
    handleReset();
    setEditProfile(false);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile.size > 70000) {
      setError(true);
      setImagePreview(null);
    } else {
      setError(false);
      setImageURL(imageFile);
      setImagePreview(URL.createObjectURL(imageFile));
    }
  };

  const handleSubmitImage = async () => {
    const formData = new FormData();
    formData.append("image", imageURL);
    try {
      const response = await axiosInstance.post(
        `users/profile/image/${profileDetails._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data) {
        setProfileDetails({ ...profileDetails, image: response.data.image });
        dispatch(fetchLoggedProfile());
        handleChangeProfileImage();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!profileDetails) {
    return (
      <div className="people-main">
        <CircularProgress />
      </div>
    );
  }

  return (
    <main>
      <div className="profile-header-section">
        <div className="profile-image">
          <div>
            {profileId === peopleId ? (
              <img
                alt={profileDetails?.image}
                src={profileDetails?.image || jsImage}
                style={{ cursor: "pointer" }}
                // src={`${BASE_URL}${profileDetails?.image}` || jsImage}
                onClick={handleChangeProfileImage}
              />
            ) : (
              <img
                alt={profileDetails?.image}
                src={profileDetails?.image || jsImage}
              />
            )}

            <Dialog
              fullWidth
              maxWidth="xs"
              keepMounted={false}
              open={profileImageDialog}
            >
              <DialogTitle>Change Profile Picture</DialogTitle>
              <DialogContent>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview-img"
                    style={{
                      width: 180,
                      height: 180,
                      margin: "20px auto 10px auto",
                      display: "block",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />
                )}
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{
                    display: "block",
                    margin: "20px auto",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                />
                {error && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    Image size exceeds. Pick another one
                  </p>
                )}
              </DialogContent>
              <DialogActions style={{ flexDirection: "flex-start" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleChangeProfileImage}
                >
                  Cancel
                </Button>
                <Button
                  disabled={error || !imageURL}
                  variant="contained"
                  size="small"
                  onClick={handleSubmitImage}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        {profileId === peopleId && (
          <div className="profile-edit-options">
            {editProfile ? (
              <>
                <button
                  className="people-button"
                  onClick={handleCloseProfileEdit}
                >
                  Cancel
                </button>
                <button
                  className="people-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </>
            ) : (
              <button className="people-button" onClick={handleOpenProfileEdit}>
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className="profile-main-section">
        <p>Profile Details</p>
        <Grid container spacing={3} className="profile-details-section">
          <Grid size={6} className="profile-details-item">
            <p>Name</p>
            {!editProfile ? (
              <p>{profileDetails?.name}</p>
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
          <Grid size={6} className="profile-details-item">
            <p>Email</p>
            {!editProfile ? (
              <p>{profileDetails?.email}</p>
            ) : (
              <TextField
                disabled
                fullWidth
                size="small"
                name="email"
                value={profileDetails?.email || null}
              />
            )}
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Department</p>
            {!editProfile ? (
              <p>{profileDetails?.department}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="department"
                value={values.department}
                placeholder="Departmennt"
                onChange={handleChange}
              />
            )}
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Designation</p>
            {!editProfile ? (
              <p>{profileDetails?.designation}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="designation"
                value={values.designation}
                placeholder="Designation"
                onChange={handleChange}
              />
            )}
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Location</p>
            {!editProfile ? (
              <p>{profileDetails?.location}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="location"
                value={values.location}
                placeholder="Location"
                onChange={handleChange}
              />
            )}
          </Grid>
          <Grid size={6} className="profile-details-item">
            <p>Phone Number</p>
            {!editProfile ? (
              <p>{profileDetails?.phone_number}</p>
            ) : (
              <TextField
                fullWidth
                size="small"
                name="phone_number"
                onChange={handleChange}
                placeholder="Phone Number"
                error={errors.phone_number}
                value={values.phone_number}
                helperText={errors.phone_number}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </main>
  );
}

export default PeopleDetails;
