import { useDispatch, useSelector } from "react-redux";
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
import { createTask } from "../../../../store/store";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { authAdminRole } from "../../../Common/Constants";

function CreateTaskDialog({ open, handleOpenTaskDialog }) {
  const dispatch = useDispatch();
  // const [orgData, setOrgData] = useState([]);
  const profileData = useSelector(
    (store) => store.basicInformation?.data?.profile || null
  );
  const orgData = useSelector((store) => store.organizationData?.data || []);

  const initialValues = {
    status: "",
    title: "",
    type: "",
    priority: "",
    description: "",
    orgId: authAdminRole.includes(profileData.role) ? "" : null,
  };

  // const handleFetchOrgData = useCallback(async () => {
  //   const data = await fetchOrgData();
  //   setOrgData(data);
  // }, []);

  // useEffect(() => {
  //   if (profileData && authAdminRole.includes(profileData.role)) {
  //     handleFetchOrgData();
  //   }
  // }, [profileData, handleFetchOrgData]);

  const { values, handleSubmit, handleChange, handleReset } = useFormik(
    {
      initialValues: initialValues,
      onSubmit: (values) => {
        dispatch(createTask(values));
        handleReset();
        // setOpen(false);
        handleOpenTaskDialog();
      },
    }
  );

  const handleCloseCreateTask = () => {
    // setOpen(false);
    handleOpenTaskDialog();
    handleReset();
  };

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        maxWidth="md"
        keepMounted={false}
        onClose={handleCloseCreateTask}
      >
        <DialogTitle>Create Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {authAdminRole.includes(profileData.role) && (
              <Grid size={12} className="profile-details-item">
                <label htmlFor="organization">Organization</label>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Select Organization"
                  name="orgId"
                  // error={errors.orgId}
                  value={values.orgId}
                  onChange={handleChange}
                >
                  {!isEmpty(orgData) &&
                    orgData.map((org) => (
                      <MenuItem key={org._id} value={org._id}>
                        {org.name && org.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            )}
            <Grid size={12}>
              <label htmlFor="status">Status</label>
              <TextField
                select
                fullWidth
                size="small"
                name="status"
                value={values.status}
                onChange={handleChange}
              >
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="not-started">Not Started</MenuItem>
                {/* <MenuItem value='closed'>
                  Closed
                </MenuItem>
                <MenuItem value='pending'>
                  Pending
                </MenuItem> */}
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="title">Title</label>
              <TextField
                fullWidth
                size="small"
                name="title"
                value={values.title}
                placeholder="Title"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <label htmlFor="type">Type</label>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value="enhancement">Enhancement</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="epic">Epic</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="priority">Priority</label>
              <TextField
                select
                fullWidth
                size="small"
                name="priority"
                value={values.priority}
                onChange={handleChange}
              >
                <MenuItem value="major">Major</MenuItem>
                <MenuItem value="blocker">Blocker</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
                <MenuItem value="minor">Minor</MenuItem>
              </TextField>
            </Grid>
            <Grid size={12}>
              <label htmlFor="description">Description</label>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                name="description"
                value={values.description}
                placeholder="Description"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ margin: "10px 0 20px 20px", justifyContent: "flex-start" }}
        >
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

export default CreateTaskDialog;
