import React from "react";

import defaultAvatar from "assets/img/faces/150.png";
import PropTypes from "prop-types";

const ProfilePhoto = ({
 profileData:
 {
  id,
  displayName,
  avatar: {
   as_url: avatarUrl
  } = {
   as_url: defaultAvatar
  }
 }}) => {
 return (
   <img src={avatarUrl} alt={displayName} loading="lazy"/>
 );
}


ProfilePhoto.propTypes = {
 profileData: PropTypes.object
}

export default ProfilePhoto;
