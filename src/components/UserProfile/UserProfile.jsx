import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";

import ProfileEditForm from "./ProfileEditForm";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfilePhoto from "./ProfilePhoto";
import ProfileImageUpload from "./ProfileImageUpload";

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

const UserProfile = ({ profileData }) => {
  const classes = useStyles();
  const [editProfile, toggleEditProfile] = useState(false)
  const [editProfilePhoto, toggleEditProfilePhoto] = useState(false)

  return (
    <div className="user-profile">
      <GridContainer>
        {/* Profile Card */}
        <GridItem xs={12} sm={12} md={editProfile ? 4 : 12}>
            <Card profile>
              <CardAvatar
                profile
                onClick={() => toggleEditProfilePhoto(!editProfilePhoto)}
              >
                <ProfilePhoto
                  profileData={profileData}
                />
              </CardAvatar>

              {/* Image Upload */}
              {editProfilePhoto && (
                <ProfileImageUpload
                  profileData={profileData}
                />
              )}

              <CardBody profile className="user-profile__body">
                <h6 className={classes.cardCategory}>CEO / FOUNDER</h6>
                <h4 className={classes.cardTitle}>{profileData.displayName}</h4>
                <p className={classes.description}>
                  {profileData.email}
                </p>
                <Button
                  color="primary"
                  round
                  onClick={() => toggleEditProfile(!editProfile)}
                >
                  Update Profile
                </Button>
              </CardBody>
            </Card>
          </GridItem>

          {/* Edit Profile Form */}
          {editProfile && (
            <GridItem xs={12} sm={12} md={8}>
              <ProfileEditForm profileData={profileData} />
            </GridItem>
          )}
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  profileData: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    profileData: state.firebase.profile
  }
}

export default connect(mapStateToProps, {})(UserProfile)