import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Grid, TextField } from '@mui/material';
import axiosInstance from '../../Common/AxiosInstance';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
    email: Yup.string().email().required('Email Field is required'),
    name: Yup.string().required('Name Field is required').min(3, 'Name must be at least 3 charachter long'),
});

function Index({ history }) {
    let content;
    const [peopleList, setPeopleList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        phone_number: '',
        department: '',
        designation: '',
        company: ''
    }
    const { values, errors, handleSubmit, handleChange, handleReset, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: async (values) => {
            await axiosInstance.post('/users/profile', values);
            handleFetchUserProfiles();
            handleCloseCreateUser();
        },
    });

    useEffect(() => {
        handleFetchUserProfiles();
    }, []);

    const handleFetchUserProfiles = async () => {
        if (peopleList.length) {
            setPeopleList([]);
        }
        const response = await axiosInstance.get('/users/profile');
        if (!isEmpty(response.data)) {
            setPeopleList(response.data);
        }
    }

    const handleOpenCreateUser = () => {
        setOpenCreate(true);
    }

    const handleCloseCreateUser = () => {
        setOpenCreate(false);
        handleReset();
    }

    if (!isEmpty(peopleList)) {
        content = (
            peopleList.map((people, key) => (
                <div key={key} className='profile-box' onClick={() => history.push(`/people/${people._id}`)}>
                    <Avatar alt={people.name.split('')[0]} src={people.image} />
                    <div style={{ marginLeft: 15 }}>
                        <p>{people.name}</p>
                        <p>{people.email}</p>
                        <p>{people.department || 'User'}</p>
                    </div>
                </div>
            ))
        )
    } else {
        content = <CircularProgress />
    }
    const main = (
        <main>
            <div className='people-create-header'>
                <h1>Meet Our Team</h1>
                <div>
                    <button className='people-button' onClick={handleOpenCreateUser}>Create New User</button>
                </div>
            </div>
            <div className='people-main'>
                {content}
            </div>
        </main>
    )

    const createSection = (
        <section>
            <div className='people-create-header'>
                <h1>Create New User</h1>
                <div>
                    <button style={{ marginRight: 10 }} className='people-button' onClick={handleCloseCreateUser}>Cancel</button>
                    <button className='people-button' type='submit' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className='people-create-main'>
                <Grid container spacing={3} className='profile-details-section'>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Name
                        </p>
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
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Email
                        </p>
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
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Phone Number
                        </p>
                        <TextField
                            fullWidth
                            size='small'
                            name='phone_number'
                            placeholder='Phone Number'
                            error={errors.phone_number}
                            value={values.phone_number}
                            onChange={handleChange}
                            helperText={errors.phone_number}
                        />
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Department
                        </p>
                        <TextField
                            fullWidth
                            size='small'
                            name='department'
                            onChange={handleChange}
                            placeholder='Department'
                            error={errors.department}
                            value={values.department}
                            helperText={errors.department}
                        />
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Designation
                        </p>
                        <TextField
                            fullWidth
                            size='small'
                            name='designation'
                            onChange={handleChange}
                            placeholder='Designation'
                            error={errors.designation}
                            value={values.designation}
                            helperText={errors.designation}
                        />
                    </Grid>
                    <Grid item xs={6} className='profile-details-item'>
                        <p>
                            Company
                        </p>
                        <TextField
                            fullWidth
                            size='small'
                            name='company'
                            onChange={handleChange}
                            placeholder='Company'
                            error={errors.company}
                            value={values.company}
                            helperText={errors.company}
                        />
                    </Grid>
                </Grid>
            </div>
        </section>
    )

    return (
        <>
            {!openCreate ? main : createSection}
        </>
    )
}

export default (withRouter)(Index)
