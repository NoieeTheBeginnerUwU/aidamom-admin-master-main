import React, { useEffect, useState } from 'react';
//Import Firebase
import { authentication } from '../config/firebase';
import { database } from '../config/firebase';
import { doc, collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { storage } from "../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import moment from 'moment/moment';

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

    async function uploadImageAsync (uri) {
        const blob = await new Promise((resolve, reject)=>{
          const xhr = new XMLHttpRequest();
          xhr.onload = function(){
            resolve(xhr.response);
          };
          xhr.onerror = function(e){
            console.log(e);
            reject(new TypeError("Network request failed."))
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
  
        try{
          const storageRef = ref(storage, selectedImage);
          const result = await uploadBytes(storageRef, blob);
          setUploadImage(getDownloadURL(storageRef));
          return await getDownloadURL(storageRef);
          blob.close();
        }catch(e){
          console.log("Failed to upload the image. Please try again.")
        }
      }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
        }
      };
      
    function sendData(){
        let dateNow = moment(today, "YYYY/MM/DD").toString;
        addDoc(collection(database,'articles'),{
            uid: id,
            dateMade: moment(new Date()).format("YYYY/MM/DD"),
            title: title,
            author: author,
            topic: topic,
            content: content
        }).then(()=>{
            alert("Article published successfully.");
            setTitle("");
            setAuthor("");
            setTopic("");
            setContent("");
        })
    }

    const [cont, setCont] = useState([]);
    async function fetchContent(){
      let data = [];
      const queryData = await getDocs(collection(database, 'articles'))
      queryData.forEach((doc)=>{
        data.push({id:doc.id, title:doc.data().title,author:doc.data().author, content:doc.data().content,topic:doc.data().topic,dateMade:doc.data().dateMade})
      })
      setCont(data);
    }

    async function setActiveContentOnClick(id){
      let data = [];
      cont.map((doc)=>{
        if(id===doc.id){
          data.push({id:doc.id,title:doc.title,author:doc.author,topic:doc.topic,content:doc.content,dateMade:doc.dateMade})
        }
      })
      setActiveArticle(data)
    }
    
    useEffect(()=>{
      fetchContent();
    },[])

  return (
    <div style={{width:'100%',height:'100vh',backgroundColor:'lightgrey',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
     <div style={{width:'100%',height:'8vh',backgroundColor:'white',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}> 
        <div style={{width:'20%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <h3 style={{color:'grey'}}>Create Content</h3>
        </div>
        <div style={{width:'60%',height:'100%',display:'flex',alignItems:'center',justifyContent:'start'}}>
          
        </div>
        <div style={{width:'20%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {
            active===false&&
            <div onClick={()=> setActive(!active)} style={{width:150,height:'80%',backgroundColor:'navy',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5,cursor:'pointer'}}>
              <p style={{color:'white',fontSize:14,fontWeight:400,}}>View Published Articles</p>
            </div>
          }
          {
            active===true&&
            <div onClick={()=> setActive(!active)} style={{width:150,height:'80%',backgroundColor:'navy',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:5,cursor:'pointer'}}>
              <p style={{color:'white',fontSize:14,fontWeight:400,}}>Publish an article</p>
            </div>
          }
        </div>
      </div>
        <div style={{width:'100%',height:'92vh', display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
        {
          preview==true&&
          <div style={{width:1040,textAlign:'end',height:'98%',backgroundColor:"white",color:'black',zIndex:10,position:'fixed',overflowY:'scroll',boxShadow:'.5px 1px 5px .5px grey',}}>
             <button onClick={()=> setPreview(!preview)} style={{width:100,height:40,backgroundColor:'white',border:'none',color:'black',fontSize:40,cursor:'pointer',}}>x</button>
            <h1 style={{textAlign:'center',fontSize:34,fontWeight:600}}>{title}</h1>
            <h3 style={{textAlign:'start',margin:'2%'}}>{author}</h3>
            <p style={{textAlign:'justify',fontSize:15,margin:'2%',lineHeight:2.4,msLineBreak:10,textIndent:14,}}>{content}</p>
          </div>
        }
          {
            active===false&&
            <>
              <div className='box' style={{width:'100%',height:'50vh',boxShadow:'.5px .5px 5px .5px grey',backgroundColor:'white',marginBottom:'0vh',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}}>
                <div style={{width:'44%', height:'38vh',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start',marginLeft:40}}>
                    <div style={{width:'90%',height:'12vh',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'flex-start',}}>
                        <p style={{color:'black',marginLeft:0,fontWeight:800,fontSize:16}}>Title</p>
                        <div style={{width:'100%',height:'6vh',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'flex-start',}}>
                          <input type='text' placeholder='Article Title' value={title} style={{border:'none',outline:'none',margin:'2%',fontSize:14,width:'90%',marginLeft:'4%',height:70,backgroundColor:'lightgrey',padding:'2%',borderRadius:4}} onChange={(e)=> setTitle(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{width:'90%',height:'12vh',backgroundColor:'white',borderColor:'black',borderWidth:1,display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                        <p style={{color:'black',marginLeft:0,fontWeight:800,fontSize:16}}>Author</p>
                        <div style={{width:'100%',height:'6vh',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'flex-start',}}>
                          <input type='text' placeholder='Article Author' value={author} style={{border:'none',outline:'none',margin:'2%',fontSize:14,width:'90%',marginLeft:'4%',height:70,backgroundColor:'lightgrey',padding:'2%',borderRadius:4}} onChange={(e)=> setAuthor(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{width:'90%',height:'12vh',backgroundColor:'white',borderColor:'black',borderWidth:1,display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                        <p style={{color:'black',marginLeft:0,fontWeight:800,fontSize:16}}>Selected Topic</p>
                        <div style={{width:'100%',height:'6vh',backgroundColor:'white',display:'flex',flexDirection:'column',alignItems:'flex-start',}}>
                        <input type='text' placeholder='Article Topic' value={topic} style={{border:'none',outline:'none',margin:'2%',fontSize:14,width:'90%',marginLeft:'4%',height:70,backgroundColor:'lightgrey',padding:'2%',borderRadius:4}} onChange={(e)=> setTopic(e.target.value)}/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='box' style={{width:'100%',height:'50vh',display:'flex',flexDirection:'row',backgroundColor:'white',}}>
                    <div style={{width:'85%',height:'50vh',backgroundColor:'transparent',display:'flex',flexDirection:'column',alignItems:'start',}}>
                        <div style={{width:'98%',height:'40vh',margin:'3%',backgroundColor:'white',overflow:'hidden',border:'none',boxShadow:'.5px .5px 5px .5px grey',}}>
                            <textarea cols={50} rows={5} value={content} style={{width:'100%',height:'40vh',outline:'none',textAlign:'left',fontSize:16, border:'none', margin:'2%', backgroundColor:'transparent'}} placeholder='type/paste article content here' onChange={(e)=> setContent(e.target.value)}/>
                        </div>
                    </div>
                    <div style={{width:'15%',height:'50vh'}}>
                        <div style={{width:'100%',height:'50vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <div style={{cursor:'pointer'}} onClick={()=> setPreview(!preview)} className='btn'>
                                <p>preview</p>
                            </div>
                            <div style={{cursor:'pointer'}} className='btn' onClick={()=> sendData()}>
                                <p>publish</p>
                            </div>
                        </div>
                    </div>
                </div>
             </> 
          }
          {
            active===true&&
              <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                <div style={{width:'20%',height:'100%',overflowY:'scroll',scrollBehavior:'smooth'}}>
                  {
                    cont.map((doc)=>(
                      <div onClick={()=> [setActiveContentOnClick(doc.id),setContent(doc.id)]} style={{width:'98%',height:100,cursor:'pointer',boxShadow:content===doc.id?"0px":'.5px 5px 10px .5px white',display:'flex',alignItems:'center',justifyContent:'center',margin:'1%',backgroundColor:content===doc.id?"navy":'ghostwhite'}}> 
                        <p style={{fontSize:14,color:'black',margin:'5%',color:content===doc.id?"white":'black',}}>{doc.title}</p>
                      </div>
                    ))
                  }
                </div>
                <div style={{width:'80%',height:'100%',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {
                    activeArticle.map((doc)=>(
                      <div style={{width:'100%',height:'92vh',display:'flex',backgroundColor:'white',color:'black',flexDirection:'column',textJustify:'auto',alignItems:'center',justifyContent:'center',overflowY:'scroll',textAlign:'justify'}}>
                        <div style={{width:'100%',height:'100%',margin:'2%',display:'flex',flexDirection:'column',alignItems:'start',justifyContent:'start'}}>
                          <h3 style={{marginTop:10,}}>{doc.title}</h3>
                          <p style={{margin:12,fontSize:17}}><span style={{fontWeight:800}}>author/s:</span> {doc.author}</p>
                            <p style={{fontSize:16,lineHeight:2,marginTop:20,margin:'2%'}}>{doc.content}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
          }
        </div>
    </div>
  )
}

export default Content
