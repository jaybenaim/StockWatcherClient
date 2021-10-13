import React, { useEffect, useState } from "react";
import local from "api/local";
import { storage } from "config/firebase";
import { Box, Button, IconButton, styled, Modal } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useFirebase } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { SET_ERRORS } from "redux-store/types";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import defaultAvatar from "assets/img/faces/150.png";
import TextHelpers from "lib/helpers/TextHelpers";

const Input = styled('input')({
 display: 'none',
});

const style = {
 position: 'absolute',
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 width: 350,
 bgcolor: 'background.paper',
 border: '2px solid #000',
 boxShadow: 24,
 p: 4,
};

const ProfileImageUpload = ({ profileData: { id, displayName, avatar: {
  as_url: avatarUrl
 } = {
  as_url: defaultAvatar
 } }}) => {
 const firebase = useFirebase();
 const dispatch = useDispatch();

  const allInputs = { imgUrl: "" };

  const [imageAsFile, setImageAsFile] = useState(undefined);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const [open, setOpen] = useState(true);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];

    setImageAsFile(image);

  };

  useEffect(() => {

    if (imageAsFile) {
      console.log(imageAsFile)
      handleFireBaseUpload()
    }
    // eslint-disable-next-line
  }, [imageAsFile])
  const handleFireBaseUpload = async () => {
    console.log("start of upload");
    // image loading
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    console.log(imageAsFile)
    const uploadTask = await storage
      .ref(`/profile-images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
     uploadTask.task.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      async () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        await storage
          .ref("profile-images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then(async (imageUrl) => {
            console.log(imageUrl)
            await handleImageAsUrl(imageUrl)

          });
      }
    );
  };

  const handleImageAsUrl = async (imageUrl = undefined) => {
    if (typeof imageUrl === "object") {
      imageUrl = imageAsUrl.imgUrl
    }

    try {
      const response = await local.patch(`/profiles/${id}/`, {
       avatar: {
        as_url: imageUrl
       }
      })

      if (response.status === 200) {

        await firebase.updateProfile({
          avatar: response.data.avatar
        })
        setOpen(false)
      }
    } catch (err) {
      console.log("error")

      dispatch({
        type: SET_ERRORS,
        payload: err
      })
    }
  }

  return (
    // <form onSubmit={handleFireBaseUpload}>
    //   <input
    //     name="setInnerTitle"
    //     value={innerTitle}
    //     onChange={(e) => setInnerTitle(e.target.value)}
    //     placeholder="Inner Title"
    //   />
    //   <textarea
    //     className="input-group-text"
    //     name="setInnerTitle"
    //     value={innerDetails}
    //     onChange={(e) => setInnerDetails(e.target.value)}
    //     placeholder="Inner Details"
    //   />
    //   <input type="file" onChange={onChange} />
    //   <button>Add</button>
    // </form>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="user-profile-modal"
      aria-describedby="user-profile-modal"
    >
     <Box sx={style}>
      <form className="profile-image-upload">
        <GridContainer>
          <GridItem xs={12}>
            <div className="profile-image-upload__url-upload">
              <CustomInput
                labelText={TextHelpers.truncate(avatarUrl, 50) || "URL"}
                id="email-address"
                formControlProps={{
                  fullWidth: true,
                  onChange: (e) => setImageAsUrl({
                   imgUrl: e.target.value
                  })
                }}
              />

           <Box>
              <Button
                variant="contained"
                component="span"
                onClick={handleImageAsUrl}
              >
                Save
              </Button>
            </Box>
          </div>
         </GridItem>


         <GridItem
           xs={12}
         >
          <div
            className="profile-image-upload__buttons"
          >
            <label htmlFor="image-file-upload">
              <Input accept="image/*" id="image-file-upload" type="file" onChange={handleImageAsFile}/>
              <Button variant="contained" component="span">
                Upload
              </Button>
             </label>

              <label htmlFor="icon-file-upload">
               <Input accept="image/*" id="icon-file-upload" type="file" onChange={handleImageAsFile}/>
               <IconButton color="primary" aria-label="upload picture" component="span">
                 <PhotoCamera />
               </IconButton>
             </label>
          </div>
         </GridItem>
       </GridContainer>
      </form>
      </Box>
    </Modal>
  );
};

ProfileImageUpload.propTypes = {
 profileData: PropTypes.object
}

export default ProfileImageUpload;
