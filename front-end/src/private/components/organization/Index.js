import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../Common/PageHeader";
import CreateOrganizationDialog from "./common/CreateOrganizationDialog";
import OrganizationCard from "./common/OrganizationCard";
import axiosInstance from "../../Common/AxiosInstance";
import { OrganizationSkeleton } from "../../Common/Skeleton";
import { Typography } from "@mui/material";
import { ConfirmDialogBox } from "../../Common/DialogBox";
import { isEmpty } from "lodash";
import { toastError } from "../../Common/ToastContainer";

function Index() {
  const [orgList, setOrgList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleFetchOrganizationData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/organization");
      setOrgList(response.data);
    } catch (error) {
      console.error("Error fetching org list:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchOrganizationData();
  }, [handleFetchOrganizationData]);

  const handleDeletUserProfile = async () => {
    if (deleteProfileId) {
      const response = await axiosInstance.delete(
        `/users/organization/${deleteProfileId}`
      );
      if (!isEmpty(response.data)) handleFetchOrganizationData();
      setDeleteProfileId(null);
      setOpenDeleteDialog(false);
    } else {
      toastError("Organization data not found.");
    }
  };

  const handleOpenOrganizationDialog = () => {
    setOpenCreateDialog(!openCreateDialog);
  };

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 3 }, (_, index) => (
        <OrganizationSkeleton key={index} />
      ));
    }

    if (data.length === 0) {
      return <Typography variant="body1">No Organization found.</Typography>;
    }

    return data.map((org) => (
      <OrganizationCard
        data={org}
        key={org._id}
        setDeleteProfileId={setDeleteProfileId}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
    ));
  };

  const { data } = orgList;
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
          handleFetchOrganizationData={handleFetchOrganizationData}
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
          onSubmit={() => handleDeletUserProfile()}
          text="Do you want to remove these elements from this report?"
        />
      </div>
    </>
  );
}

export default Index;
