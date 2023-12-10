import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
//firebase
import { authentication, database } from '../config/firebase';
import { addDoc, collection,  } from 'firebase/firestore';
//moment
import moment from 'moment';
import { TextareaAutosize } from '@material-ui/core';


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};
export default function Create() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  //for image header
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

///for image inside the body

const [images, setImages] = useState([]);

const handleUpload1 = (event) => {
  const files = Array.from(event.target.files);
  setImages(files.map(file => URL.createObjectURL(file)));
};

const uploadArticle = () => {
  try{
    addDoc(collection(database,'articles'),{
      uid: authentication.currentUser.uid,
      title: title,
      author: author,
      content:body,
      dateMade: moment(new Date()).format("MMMM DD, YYYY")
    }).then(()=>{
        alert("Article published successfully.");
    })
  }catch(e){
    alert(e)
  }
}
  console.log(author+" " +body+ " " + title)
  const [text, setText] = useState('');

  const textRef = useRef();

  const handleBold = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleUnderline = () => {
    document.execCommand('underline', false, null);
  };

  const handleCapitalize = () => {
    // handle capitalize
  };

  const handleJustify = () => {
    document.execCommand('justifyFull', false, null);
  };
  const handleAlignCenter = () => {
    document.execCommand('justifyCenter', false, null);
  };

  const handleAlignLeft = () => {
    document.execCommand('justifyLeft', false, null);
  };

  const handleAlignRight = () => {
    document.execCommand('justifyRight', false, null);
  };

  //submit and preview
  const handleSubmit = () => {
    if (!title || !author || !body) {
      alert('All fields are required!');
    } else {
      // handle submit
    }
  };

  const handlePreview = () => {
    // handle preview
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
       <Typography variant='h2' fontWeight='600' fontSize={28} mb={1}>
        Create content
      </Typography>
      <Divider sx={{marginBottom:5}}></Divider>
      <Paper>
      <Grid container spacing={2} padding={5}>
        <Grid item xs={3}>
        <Box justifyContent='center' padding={1} style={{ width:'100%', minHeight: '200px', border: '2px solid black', padding: '20px' }}  > 
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="upload-button"
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="upload-button">
        <Button variant="contained" color="primary" component="span">
          <AddPhotoAlternateIcon />
          Upload Image
        </Button>
      </label>
      <Box padding={2}>
  {image && <img src={image} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />}
</Box>

    </Box>
        </Grid>
        <Grid xs={3} ></Grid >
        <Grid item xs={6}>
        <Box component="form" sx={{'& > :not(style)': { m: 2, width: '30vw' },}}>
      <TextField id="title" label="Title" variant="standard"  value={title}onChange={(e) => setTitle(e.target.value)}/>
        
      <TextField id="author" label="Author" variant="standard" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <TextField id="link" label="Link" variant="standard" />
    </Box>
        </Grid>
        <Divider />
        <Grid item xs={12} >

        <Box sx={{ height: '90%', width: '90%', m: 'auto' }}>

        <Box sx={{ justifyContent:'center', display: 'flex', mt: 2 }}>
        <IconButton onClick={handleBold}><FormatBoldIcon /></IconButton>
        <IconButton onClick={handleItalic}><FormatItalicIcon /></IconButton>
        <IconButton onClick={handleUnderline}><FormatUnderlinedIcon /></IconButton>
        <IconButton onClick={handleCapitalize}><TextFormatIcon /></IconButton>
        <IconButton onClick={handleJustify}><FormatAlignJustifyIcon /></IconButton>
        <IconButton onClick={handleAlignLeft}><FormatAlignLeftIcon /></IconButton>
        <IconButton onClick={handleAlignCenter}><FormatAlignCenterIcon /></IconButton>
        <IconButton onClick={handleAlignRight}><FormatAlignRightIcon /></IconButton>
        <label htmlFor="icon-button-file">
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>
   


      </Box>
      
        <div
        
        >
      
      <textarea
  ref={textRef}
  style={{ minHeight: '200px', minWidth:'100%', border: '1px solid black', padding: '20px' }}
  onInput={(e) => setBody(e.target.value)}
/>

    <div>
    <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        multiple
        onChange={handleUpload1}
      />
     
     {images.map((image1, index) => (
        <img key={index} src={image1} alt={`Uploaded ${index}`} style={{ width: '25%', height: 'auto' }} />
      ))}
    </div>
      </div>
      
   
    </Box>
        </Grid>
        <Grid xs={4}></Grid>
        <Grid xs={5}></Grid>
        <Grid container direction={'row'} xs={3} padding={1}>
        <Button variant='contained' sx={{margin:2}} onClick={()=> uploadArticle()}>Publish</Button>
      <Button  variant='contained'  sx={{margin:2}}  onClick={handlePreview}>Preview</Button>
        </Grid>
      </Grid>
      </Paper>
    </Box>
  )
}
