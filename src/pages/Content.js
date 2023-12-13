import React, { useEffect, useState } from 'react';
//Import Firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { doc, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { storage } from "../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import moment from 'moment/moment';
import Create from './create';


import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  InputAdornment,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { Send as SendIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Content = () => {



  const id = authentication.currentUser.uid;
  const [active, setActive] = useState(false);
  const [activeArticle, setActiveArticle] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [preview, setPreview] = useState(false);
  const today = new Date();

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed."))
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try {
      const storageRef = ref(storage, selectedImage);
      const result = await uploadBytes(storageRef, blob);
      setUploadImage(getDownloadURL(storageRef));
      return await getDownloadURL(storageRef);
      blob.close();
    } catch (e) {
      console.log("Failed to upload the image. Please try again.")
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  function sendData() {
    let dateNow = moment(today, "YYYY/MM/DD").toString;
    addDoc(collection(database, 'articles'), {
      uid: id,
      dateMade: moment(new Date()).format("YYYY/MM/DD"),
      title: title,
      author: author,
      topic: topic,
      content: content
    }).then(() => {
      alert("Article published successfully.");
      setTitle("");
      setAuthor("");
      setTopic("");
      setContent("");
    })
  }

  const [cont, setCont] = useState([]);
  async function fetchContent() {
    let data = [];
    const queryData = await getDocs(collection(database, 'articles'))
    queryData.forEach((doc) => {
      data.push({ id: doc.id, title: doc.data().title, author: doc.data().author, content: doc.data().content, topic: doc.data().topic, dateMade: doc.data().dateMade })
    })
    setCont(data);
  }

  async function setActiveContentOnClick(id) {
    let data = [];
    cont.map((doc) => {
      if (id === doc.id) {
        data.push({ id: doc.id, title: doc.title, author: doc.author, topic: doc.topic, content: doc.content, dateMade: doc.dateMade })
      }
    })
    setActiveArticle(data)
  }

  useEffect(() => {
    fetchContent();
  }, [])





  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  async function sendData() {
    handleDialogOpen(); // Open the dialog before publishing
  }

  const handlePublish = async () => {
    // Handle publishing logic here
   try {
    // Example: Perform the publishing logic
    await sendData(); // Assuming sendData handles the actual publishing logic
    alert("Article published successfully.");
    setTitle("");
    setAuthor("");
    setTopic("");
    setContent("");
  } catch (error) {
    console.error("Error publishing article:", error);
    // Handle error scenario
  }

  handleDialogClose(); // Close the dialog after publishing
    handleDialogClose(); // Close the dialog after publishing
  };

  return (


    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', height: '8vh', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box textAlign={'left'} ml={2}>
            <Typography variant='h2' fontWeight='600' fontSize={28} mt={2}>
              Create Content
            </Typography>
          </Box>
        </div>
        <div style={{ width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start' }}></div>
        <div style={{ width: '20%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {active === false && (
            <Button padding={'20px'} onClick={() => setActive(!active)} variant="contained" style={{ width: 200, height: '60%', backgroundColor: 'navy', borderRadius: 5, color: 'white' }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 500 }}>View Published Articles</Typography>
            </Button>
          )}
          {active === true && (
            <Button padding={'20px'} onClick={() => setActive(!active)} variant="contained" style={{ width: 200, height: '60%', backgroundColor: 'navy', borderRadius: 5, color: 'white' }}>
              <Typography variant="body2" style={{ fontSize: 12, fontWeight: 500 }}>Publish an article</Typography>
            </Button>
          )}
        </div>
      </div>
      <div style={{ width: '100%', height: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {preview === true && (
          <Paper elevation={3} style={{ width: 1040, textAlign: 'end', height: '98%', backgroundColor: 'white', color: 'black', zIndex: 10, position: 'fixed', overflowY: 'scroll', boxShadow: '.5px 1px 5px .5px grey' }}>
            <Button onClick={() => setPreview(!preview)} style={{ width: 100, height: 40, backgroundColor: 'white', border: 'none', color: 'black', fontSize: 40, cursor: 'pointer' }}>x</Button>
            <Typography variant="h4" style={{ textAlign: 'center', fontSize: 34, fontWeight: 600 }}>{title}</Typography>
            <Typography variant="h6" style={{ textAlign: 'start', margin: '2%' }}>{author}</Typography>
            <Typography variant="body1" style={{ textAlign: 'justify', fontSize: 15, margin: '2%', lineHeight: 2.4, msLineBreak: 10, textIndent: 14 }}>{content}</Typography>
          </Paper>
        )}
        {active === false && (
          <>
            <Box className="box" style={{ width: '100%', height: '100%', boxShadow: '.5px .5px 5px .5px grey', backgroundColor: 'white', marginBottom: '0vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start' }}>
              <Box style={{ width: '44%', height: '38vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', marginLeft: 40 }}>
                <Box style={{ width: '90%', height: '12vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" style={{ color: 'black', marginLeft: 0, fontWeight: 800, fontSize: 16 }}>Title</Typography>
                  <Box style={{ width: '100%', height: '6vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <TextField type='text' placeholder='Article Title' value={title} variant="outlined" fullWidth style={{ margin: '2%', fontSize: 14, height: 70 }} onChange={(e) => setTitle(e.target.value)} />
                  </Box>
                </Box>
                <Box style={{ width: '90%', height: '12vh', backgroundColor: 'white', borderColor: 'black', borderWidth: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" style={{ color: 'black', marginLeft: 0, fontWeight: 800, fontSize: 16 }}>Author</Typography>
                  <Box style={{ width: '100%', height: '6vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <TextField type='text' placeholder='Article Author' value={author} variant="outlined" fullWidth style={{ margin: '2%', fontSize: 14, height: 70 }} onChange={(e) => setAuthor(e.target.value)} />
                  </Box>
                </Box>
                <Box style={{ width: '90%', height: '12vh', backgroundColor: 'white', borderColor: 'black', borderWidth: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="subtitle1" style={{ color: 'black', marginLeft: 0, fontWeight: 800, fontSize: 16 }}>Selected Topic</Typography>
                  <Box style={{ width: '100%', height: '6vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <TextField type='text' placeholder='Article Topic' value={topic} variant="outlined" fullWidth style={{ margin: '2%', fontSize: 14, height: 70 }} onChange={(e) => setTopic(e.target.value)} />
                  </Box>
                </Box>
              </Box>
              <Box className="box" style={{ width: '100%', height: '50vh', display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>
                <Box style={{ width: '85%', height: '50vh', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                  <Box style={{ width: '98%', height: '40vh', margin: '3%', backgroundColor: 'white', overflow: 'hidden', border: 'none', boxShadow: '.5px .5px 5px .5px grey' }}>
                    <TextareaAutosize cols={50} rows={5} value={content} style={{ width: '100%', height: '40vh', outline: 'none', textAlign: 'left', fontSize: 16, border: 'none', margin: '2%', backgroundColor: 'transparent' }} placeholder='type/paste article content here' onChange={(e) => setContent(e.target.value)} />
                  </Box>
                </Box>
                <Box style={{ width: '15%', height: '50vh' }}>
                  <Box style={{ width: '100%', height: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Button onClick={() => setPreview(!preview)} variant="contained" style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      <Typography variant="body2">Preview</Typography>
                    </Button>
                    <Button onClick={sendData} variant="contained" style={{ cursor: 'pointer' }}>
                      <Typography variant="body2">Publish</Typography>
                    </Button>
                    {/* Publish Confirmation Dialog */}
                    <Dialog open={openDialog} onClose={handleDialogClose}maxWidth="xs">
                      <DialogTitle>Confirm Publish</DialogTitle>
                      <DialogContent>
                        <Typography>
                          Are you sure you want to publish this article?
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handlePublish} color="primary">
                          Publish
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
        {active === true && (
          <Box style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Box style={{ width: '20%', height: '100%', overflowY: 'scroll', scrollBehavior: 'smooth' }}>
              {cont.map((doc) => (
                <Box onClick={() => [setActiveContentOnClick(doc.id), setContent(doc.id)]} key={doc.id} style={{ width: '98%', height: 100, cursor: 'pointer', boxShadow: content === doc.id ? '0px' : '.5px 5px 10px .5px white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1%', backgroundColor: content === doc.id ? 'navy' : 'ghostwhite' }}>
                  <Typography variant="body2" style={{ fontSize: 14, color: content === doc.id ? 'white' : 'black', margin: '5%' }}>{doc.title}</Typography>
                </Box>
              ))}
            </Box>
            <Box style={{ width: '80%', height: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {activeArticle.map((doc) => (
                <Box key={doc.id} style={{ width: '100%', height: '92vh', display: 'flex', backgroundColor: 'white', color: 'black', flexDirection: 'column', textJustify: 'auto', alignItems: 'center', justifyContent: 'center', overflowY: 'scroll', textAlign: 'justify' }}>
                  <Box style={{ width: '100%', height: '100%', margin: '2%', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
                    <Typography variant="h4" style={{ marginTop: 10 }}>{doc.title}</Typography>
                    <Typography variant="h6" style={{ margin: 12, fontSize: 17 }}>
                      <span style={{ fontWeight: 800 }}>author/s:</span> {doc.author}
                    </Typography>
                    <Typography variant="body1" style={{ fontSize: 16, lineHeight: 2, marginTop: 20, margin: '2%' }}>{doc.content}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </div>
    </div>


  )
}

export default Content
