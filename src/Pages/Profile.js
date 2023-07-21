import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { Button } from '@mui/material'
import { auth } from '../firebase/initialization'
import { Paper, TextField, Dialog, DialogContent, DialogTitle, Box, DialogActions, Snackbar } from '@mui/material'
import { storage } from '../firebase/initialization'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { updateProfile } from 'firebase/auth'
function Profile() {
  const { uid } = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [emailVarified, setEmailVarified] = useState();
  // const [uid, setUid] = useState();
  const [readOnlyStatus, setReadOnlyStatus] = useState(true)
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [snackBarFlag, setSnackBarFlag] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState("");

  useEffect(() => {

    const user = auth.currentUser;

    if (user != null) {
      setName(user.displayName);
      setEmail(user.email);
      setProfilePhoto(user.photoURL);
      console.log(user.photoURL)
      setEmailVarified(user.emailVerified)
      // setUid(user.uid)
    }

  }, [])

  function EditProfile() {
    setReadOnlyStatus(!readOnlyStatus)
  }


  function EditUserDetails() {
    updateProfile(auth.currentUser, {
      displayName: name
    })
  }

  function UploadFiles() {

    // console.log("Profile photo " + file)
    const profilePhotoRef = ref(storage, `profileImages/${uid}/${file.name}`)


    uploadBytes(profilePhotoRef, file).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })

    getDownloadURL(profilePhotoRef).then((url) => {
      setProfilePhoto(url)
      updateProfile(auth.currentUser, {
        photoURL: url
      }).then((data) => {
        // console.log(data)
      }).catch((error) => {
        console.log(error)
      });
    }).catch((err) => {
      console.log(err)
    })


    handleClose()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-6">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mx-auto my-3">
          <div className='mx-5 my-1'>
            <div className='text-3xl font-serif'><h2>Profile</h2></div>
          </div>
          <div className='mx-5 my-1'>
            <div className='text-end'>
              <div className='mx-1 inline'>
                <Button variant='contained' size='small' onClick={() => { EditUserDetails() }}>Save</Button>
              </div>
              <div className='mx-1 inline'>
                <Button variant='contained' size='small' onClick={() => { EditProfile() }}>Edit profile</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto my-3">
        <div className="grid grid-cols-1 mx-auto">
          <img src={profilePhoto} alt="profile photo" className='mx-auto rounded-full h-32 w-32' height={250} width={150} />
        </div>
        <div className="grid grig-cols-1 my-1 mx-auto">
          <div className='w-1/8 mx-auto'><Button variant='contained' size='small' onClick={() => { handleClickOpen() }}>Change profile photo</Button></div>
        </div>
      </div>

      <div className="container mx-auto my-3">

        <div className="grid lg:grid-cols-2 grid-cols-1 my-1">
          <div>
            <Paper sx={{ padding: '3px', margin: '4px' }}>
              <TextField required label="Email Id" variant="standard"
                value={email}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  disableUnderline: true,
                  readOnly: true
                }}
              />
            </Paper>
          </div>
          <div>
            <Paper sx={{ padding: '3px', margin: '4px' }}>
              <TextField required label="Name" variant="standard"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  disableUnderline: true,
                  readOnly: readOnlyStatus
                }}
              />
            </Paper>
          </div>
          <div>
            <Paper sx={{ padding: '3px', margin: '4px' }}>
              <TextField required label="Email varification status" variant="standard"
                value={emailVarified}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  disableUnderline: true,
                  readOnly: true
                }}
              />
            </Paper>
          </div>
        </div>

      </div>
      <Box>
        <Dialog open={open} onClose={() => { handleClose() }}>
          <DialogTitle>Choose a profile photo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Profile photo"
              type="file"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleClose() }}>Cancel</Button>
            <Button onClick={() => { UploadFiles() }}>Save</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          color='success'
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarFlag}
          autoHideDuration={2000}
          onClose={() => {
            setSnackBarFlag(false)
          }}
          message={snackBarMsg}

        />
      </Box>
    </>

  )
}

export default Profile
