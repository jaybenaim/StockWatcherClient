import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import CustomInput from "components/CustomInput/CustomInput.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import local from "api/local"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux";
import { SET_ERRORS } from "redux-store/types";
import { FormHelperText } from "@material-ui/core";
import { useFirebase } from "react-redux-firebase";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "18px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    fontSize: "1.3em",
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const useStyles = makeStyles(styles);

const ProfileEditForm = ({ profileData: { id, displayName, phone, user: { email }}}) => {
  const dispatch = useDispatch()
  const firebase = useFirebase();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: displayName,
    email,
    phone,
  })

  const handleSubmit = async () => {
    try {
      const response = await local.patch(`/profiles/${id}/`, formData)

      console.log(response.data)
      if (response.status === 200) {
        if (formData.email !== response.data.email) {
          await firebase.updateEmail(formData.email, true)
        }

        await firebase.updateProfile({
          displayName: formData.username,
          phone: response.data.phone,
          user: {
            email: response.data.user.email
          }
        })
      }
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err
      })
    }
  }

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
        <p className={classes.cardCategoryWhite}>Complete your profile</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText={displayName || "Username"}
              id="username"
              formControlProps={{
                fullWidth: true,
                onChange: ({ target: { value }}) => setFormData({
                  ...formData,
                  username: value
                })
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText={email || "Email address"}
              id="email-address"
              formControlProps={{
                fullWidth: true,
                onChange: ({ target: { value }}) => setFormData({
                  ...formData,
                  email: value
                })
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText={phone || "Phone"}
              id="phone"
              formControlProps={{
                fullWidth: false,
                onChange: ({ target: { value }}) => setFormData({
                  ...formData,
                  phone: value
                })
              }}
            />
            <FormHelperText>
              Phone is required to recieve alerts.
            </FormHelperText>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="primary" onClick={handleSubmit}>Save</Button>
      </CardFooter>
    </Card>
  );
}

ProfileEditForm.propTypes = {
  profileData: PropTypes.object
}

export default ProfileEditForm;
