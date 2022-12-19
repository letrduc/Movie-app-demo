/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MovieCard from "../components/MovieCard";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import SearchAppBar from "../components/SearchAppBar";
import { ExampleContext } from "../components/SearchAppBar";

function MainLayout({ children }) {
  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <MainHeader />
      </Grid>
      <Grid item xs={10} mt={5}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <MainFooter />
      </Grid>
    </Grid>
  );
}
export default MainLayout;
