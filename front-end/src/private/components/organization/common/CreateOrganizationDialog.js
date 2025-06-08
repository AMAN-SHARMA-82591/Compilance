import { useCallback, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Country, State, City } from "country-state-city";
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
import { createOrganization } from "../../../../store/store";

const initialValues = {
  name: "",
  city: "",
  state: "",
  address: "",
  country: "",
  description: "",
};

const validationSchema = Yup.object({
  address: Yup.string().required("Address Field is required"),
  country: Yup.string().required("Country Field is required"),
  state: Yup.string().required("State Field is required"),
  city: Yup.string().required("City Field is required"),
  name: Yup.string()
    .required("Name Field is required")
    .min(3, "Name must be at least 3 charachter long"),
});

function CreateOrganizationDialog({ open, handleOrganizationDialog }) {
  const dispatch = useDispatch();
  const [countries] = useState(Country.getAllCountries());
  const statesCache = useRef({});
  const citiesCache = useRef({});
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      dispatch(createOrganization(values));
      resetForm();
      handleOrganizationDialog();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleChangeSelectedCountry = useCallback(
    (event) => {
      const selectedCountry = event.target.value;
      setFieldValue("state", "");
      setFieldValue("city", "");
      if (!statesCache.current[selectedCountry]) {
        statesCache.current[selectedCountry] =
          State.getStatesOfCountry(selectedCountry);
      }
      setStates(statesCache.current[selectedCountry]);
      setCitites([]);
    },
    [setFieldValue]
  );

  const handleChangeSelectedState = useCallback(
    (event) => {
      const selectedState = event.target.value;
      setFieldValue("city", "");
      const countryCode = values.country;
      const cacheKey = `${countryCode}-${selectedState}`;
      if (!citiesCache.current[cacheKey]) {
        citiesCache.current[cacheKey] = City.getCitiesOfState(
          countryCode,
          selectedState
        );
      }
      setCitites(citiesCache.current[cacheKey]);
    },
    [values.country, setFieldValue]
  );

  // useEffect(() => {
  //   handleFetchCountry();
  // }, [handleFetchCountry]);

  const handleCloseCreateOrg = () => {
    resetForm();
    handleOrganizationDialog();
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        maxWidth="sm"
        keepMounted={false}
        onClose={handleCloseCreateOrg}
      >
        <DialogTitle>Create Organization</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid size={12}>
              <label htmlFor="name">Name</label>
              <TextField
                fullWidth
                size="small"
                name="name"
                error={errors.name}
                value={values.name}
                helperText={errors.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="address">Address</label>
              <TextField
                fullWidth
                size="small"
                name="address"
                error={errors.address}
                value={values.address}
                helperText={errors.address}
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
                error={errors.country}
                value={values.country}
                helperText={errors.country}
                onChange={(e) => {
                  handleChange(e);
                  handleChangeSelectedCountry(e);
                }}
              >
                <MenuItem value="">Selected Country</MenuItem>
                {countries.length &&
                  countries.map((country) => (
                    <MenuItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </MenuItem>
                  ))}
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
                error={errors.state}
                helperText={errors.state}
                disabled={!values.country}
                onChange={(e) => {
                  handleChange(e);
                  handleChangeSelectedState(e);
                }}
              >
                <MenuItem value="">Selected State</MenuItem>
                {states.length &&
                  states.map((state) => (
                    <MenuItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid size={6}>
              <label htmlFor="city">City</label>
              <TextField
                select
                fullWidth
                name="city"
                size="small"
                value={values.city}
                error={errors.city}
                helperText={errors.city}
                onChange={handleChange}
                disabled={!values.state}
              >
                <MenuItem value="">Select City</MenuItem>
                {cities.length &&
                  cities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="description">Description</label>
              <TextField
                fullWidth
                rows={3}
                multiline
                size="small"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: "", justifyContent: "flex-start" }}>
          <Button variant="outlined" onClick={handleCloseCreateOrg}>
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
