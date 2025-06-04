import { useState } from "react";
import { isEmpty } from "lodash";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PageHeader from "../../Common/PageHeader";
import OrganizationCard from "./common/OrganizationCard";
import { ConfirmDialogBox } from "../../Common/DialogBox";
import { deleteOrganization } from "../../../store/store";
import { OrganizationSkeleton } from "../../Common/Skeleton";
import CreateOrganizationDialog from "./common/CreateOrganizationDialog";

function Index() {
  const dispatch = useDispatch();
  const { isLoading, data: orgList } = useSelector(
    (state) => state.organizationData || {}
  );
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteUserProfile = async () => {
    dispatch(deleteOrganization({ id: deleteProfileId }));
    setDeleteProfileId(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenOrganizationDialog = () => {
    setOpenCreateDialog((openCreateDialog) => !openCreateDialog);
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 3 }, (_, index) => (
        <OrganizationSkeleton key={index} />
      ));
    }
    if (isEmpty(orgList)) {
      return (
        <Typography
          variant="body1"
          align="center"
          sx={{ mt: 10, fontSize: 20, color: "grey" }}
        >
          <strong style={{ fontSize: "30px", padding: 40, color: "black" }}>
            No Organization found.
          </strong>
          <br />
          To get started, you need to create an organization.
          <br />
          Creating an organization is required before you can add users, manage
          tasks, or access other features of this site.
        </Typography>
      );
    }

    return (
      !isEmpty(orgList) &&
      orgList.map((org) => (
        <OrganizationCard
          data={org}
          key={org._id}
          setDeleteProfileId={setDeleteProfileId}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      ))
    );
  };

  return (
    <>
      <PageHeader
        title="Organization"
        buttonTitle="Create Organization"
        onClick={handleOpenOrganizationDialog}
      >
        <CreateOrganizationDialog
          open={openCreateDialog}
          handleOrganizationDialog={handleOpenOrganizationDialog}
        />
      </PageHeader>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {renderContent()}
        <ConfirmDialogBox
          submitBtnText="Delete"
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onSubmit={() => handleDeleteUserProfile()}
          text="Do you want to remove these elements from this report?"
        />
      </div>
    </>
  );
}

export default Index;
