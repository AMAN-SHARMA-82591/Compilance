import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    Dialog,
    TextField,
    DialogTitle,
    DialogActions,
    DialogContent,
    CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import axiosInstance from '../../../Common/AxiosInstance';
import jsImage from '../../../../images/defaultImg.png';
// import { useDispatch } from 'react-redux';
import { setProfileData } from '../../../../store/store';

function PeopleDetails(props) {
    // const dispatch = useDispatch();
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(false);
    const [profileDetails, setProfileDetails] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [profileImageDialog, setProfileImageDialog] = useState(false);
    const {
        match: {
            params: { id: peopleId },
        }
    } = props;

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email Field is required'),
        phone_number: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').notRequired(),
        name: Yup.string().required('Name Field is required').min(3, 'Name must be at least 3 charachter long'),
    })

    const initialValues = {
        company: '',
        name: '',
        phone_number: null,
        department: '',
        email: '',
        website: '',
        location: '',
        status: '',
        organization: '',
        skills: [],
        bio: ''
    };

    const { values, errors, handleSubmit, handleChange, handleReset, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const response = await axiosInstance.patch(`/users/profile/${profileDetails._id}`, values);
            if (response.data) {
                setProfileDetails({ ...profileDetails, ...values });
                // dispatch(fetchLoggedProfile());
            }
            setEditProfile(false);
        }
    });

    useEffect(async () => {
        const response = await axiosInstance.get(`/users/profile/${peopleId}`);
        setProfileDetails(response.data);
    }, []);

    const handleChangeProfileImage = () => {
        setProfileImageDialog(!profileImageDialog);
    };

    const handleOpenProfileEdit = () => {
        setEditProfile(true);
        setValues({
            company: profileDetails.company || '',
            name: profileDetails.name || '',
            phone_number: profileDetails.phone_number || null,
            department: profileDetails.department || '',
            designation: profileDetails.designation || '',
            email: profileDetails.email || '',
            website: profileDetails.website || '',
            location: profileDetails.location || '',
            status: profileDetails.status || '',
            organization: profileDetails.organization || '',
            skills: profileDetails.skill || [],
            bio: profileDetails.bio || ''
        })
    }

    const handleCloseProfileEdit = () => {
        handleReset();
        setEditProfile(false);
    }

    const handleImageChange = (event) => {
        const reader = new FileReader();
        const imageFile = event.target.files[0]
        if (imageFile.size > 70000) {
            setError(true);
        } else {
            setError(false);
        }
        setImageURL(imageFile);
    };

    const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append('image', imageURL);
        const response = await axiosInstance.patch(
            `users/profile/image/${profileDetails._id}`,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            },
        );
        setProfileDetails({ ...profileDetails, image: response.data.image });
        // dispatch(fetchLoggedProfile());
        handleChangeProfileImage();
    }

    if (!profileDetails) {
        return (
            <div className='people-main'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <main>
            <div className='profile-header-section'>
                <div className='profile-image'>
                    <div>
                        <img
                            alt={profileDetails?.image}
                            src={profileDetails?.image || jsImage}
                            // src={`${BASE_URL}${profileDetails?.image}` || jsImage}
                            onClick={handleChangeProfileImage}
                        />
                        <Dialog keepMounted={false} open={profileImageDialog}>
                            <DialogTitle>
                                Change Profile Picture
                            </DialogTitle>
                            <DialogContent>
                                <input
                                    accept='image/*'
                                    type='file'
                                    onChange={handleImageChange}
                                />
                                {error && (
                                    <p style={{ color: 'red' }}>Image size exceeds. Pick another one</p>
                                )}
                            </DialogContent>
                            <DialogActions style={{ flexDirection: 'flex-start' }}>
                                <Button variant='outlined' size='small' onClick={handleChangeProfileImage}>
                                    Cancel
                                </Button>
                                <Button disabled={error || !imageURL} variant='contained' size='small' onClick={handleSubmitImage}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
                <div className='profile-edit-options'>
                    {editProfile ? (
                        <>
                            <button className='people-button' onClick={handleCloseProfileEdit}>
                                Cancel
                            </button>
                            <button className='people-button' type='submit' onClick={handleSubmit}>
                                Submit
                            </button>
                        </>
                    ) : (
                        <button className='people-button' onClick={handleOpenProfileEdit}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
            <div className='profile-main-section'>
                <p>Profile Details</p>
                <Grid container spacing={3} className='profile-details-section'>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Name
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.name}
                            </p>
                        ) : (
                            <>
                                <TextField
                                    fullWidth
                                    size='small'
                                    name='name'
                                    placeholder='Title'
                                    error={errors.name}
                                    value={values.name}
                                    helperText={errors.name}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Email
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.email}
                            </p>
                        ) : (
                            <TextField
                                fullWidth
                                size='small'
                                name='email'
                                placeholder='Email'
                                error={errors.email}
                                value={values.email}
                                onChange={handleChange}
                                helperText={errors.email}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Department
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.department}
                            </p>
                        ) : (
                            <TextField
                                fullWidth
                                size='small'
                                name='department'
                                value={values.department}
                                placeholder='Departmennt'
                                onChange={handleChange}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Designation
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.designation}
                            </p>
                        ) : (
                            <TextField
                                fullWidth
                                size='small'
                                name='designation'
                                value={values.designation}
                                placeholder='Designation'
                                onChange={handleChange}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Location
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.location}
                            </p>
                        ) : (
                            <TextField
                                fullWidth
                                size='small'
                                name='location'
                                value={values.location}
                                placeholder='Location'
                                onChange={handleChange}
                            />
                        )}
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Phone Number
                        </p>
                        {!editProfile ? (
                            <p>
                                {profileDetails?.phone_number}
                            </p>
                        ) : (
                            <TextField
                                fullWidth
                                size='small'
                                name='phone_number'
                                onChange={handleChange}
                                placeholder='Phone Number'
                                error={errors.phone_number}
                                value={values.phone_number}
                                helperText={errors.phone_number}
                            />
                        )}
                    </Grid>
                </Grid>
            </div>
        </main>
    )
}

export default PeopleDetails
