import React from "react";
import { Grid, Typography } from "@mui/material";
import RoleCard from "./RoleCard";

const RoleList = ({ roles, setRoles, permissions, setSuccessMessage }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Existing Roles
      </Typography>
      <Grid container spacing={3}>
        {roles.map((role, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${role._id}-${index}`}>
            <RoleCard
              role={role}
              setRoles={setRoles}
              permissions={permissions}
              setSuccessMessage={setSuccessMessage}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RoleList;
