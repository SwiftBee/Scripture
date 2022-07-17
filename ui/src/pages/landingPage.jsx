import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom"
import themeConstants from "../components/theme";
// prettier-ignore
import { 
  Typography, 
  Grid,
  Button,
} from "@mui/material";
import ProgressLoader from "../components/progressLoader";

const LandingPage = (props) => {
  const isMobile = useMediaQuery({ maxWidth: "600px" });
  const [todaysVerse, setTodaysVerse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("get-todays-verse")
      .then((res) => setTodaysVerse(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Some error occurred, Please try again later");
      })
      .finally(()=> setLoading(false));
  }, []);

  if (loading) return <ProgressLoader/>

  return (
    <Fragment>
      <Grid
        sx={{
          alignItems: "center",
          justifyContent: "center",
          marginInline: "auto",
          padding: isMobile ? themeConstants.SECONDARY_PDD : themeConstants.PRIMARY_PDD,
          height: "100vh",
          cursor: "default"
        }}
        container>
        <Grid
          item
          md={6}
          backgroundColor="primary.div"
          sx={{
            borderRadius: isMobile ? themeConstants.SECONDARY_BRR : themeConstants.PRIMARY_BRR,
            padding: isMobile ? themeConstants.SECONDARY_PDD : themeConstants.PRIMARY_PDD,
          }}>
          {todaysVerse ? (
            <Fragment>
              <Grid 
                container
                spacing={2}
                sx={{ marginBottom: "30px" }}>
                <Grid item md={8}>
                  <Typography variant="body2" fontWeight="600" fontSize={themeConstants.PRIMARY_FSZ}>Today's Verse</Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography variant="body2" fontWeight="400" fontSize={themeConstants.SENARY_FSZ}>
                    Book Name : {todaysVerse.book_name}</Typography>
                  <Typography variant="body2" fontWeight="400" fontSize={themeConstants.SENARY_FSZ}>
                    Chapter No : {todaysVerse.chapter}</Typography>
                  <Typography variant="body2" fontWeight="400" fontSize={themeConstants.SENARY_FSZ}>
                    Verse No : {todaysVerse.verse}</Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" fontWeight="400" fontSize={themeConstants.TERNARY_FSZ}>{todaysVerse.text}</Typography>
            </Fragment>
          ) : null}
        </Grid>

        <Grid item textAlign="center" md={6}>
          <Link to="/read-bible">
            <Button
              variant="outlined"
              color="primary"
              sx={{
                fontSize: isMobile ? themeConstants.TERNARY_FSZ : themeConstants.SECONDARY_FSZ,
                padding: themeConstants.BUTTON_PRIMARY_PDD,
                borderRadius: themeConstants.SECONDARY_BRR,
                margin: "auto",
              }}>
              Read Bible Now
            </Button>
          </Link>
        </Grid>

      </Grid>
    </Fragment>
  );
};

export default LandingPage;
