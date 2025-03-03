import React, { useEffect, useState } from "react";
import PageHeader from "../../Common/PageHeader";
import CreateOrganizationDialog from "./common/CreateOrganizationDialog";
import OrganizationCard from "./common/OrganizationCard";
import axiosInstance from "../../Common/AxiosInstance";
import { OrganizationSkeleton } from "../../Common/Skeleton";
import { Typography } from "@mui/material";

function Index() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axiosInstance.get("/users/organization");
        setOrgList(response.data);
      } catch (error) {
        console.error("Error fetching org list:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

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

    return data.map((org) => <OrganizationCard key={org._id} data={org} />);
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
      </div>
    </>
  );
}

export default Index;
