import React, { useState, useEffect, useRef } from "react";
import { authentication } from "../config/firebase";
import { database } from "../config/firebase";
import { collection, getDocs, onSnapshot, addDoc, query, orderBy, doc, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../animations/Loading";

const img = require("./pic.png")

const Messages = ({messaged}) => {
  let id = authentication.currentUser.uid
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [documents, setDocument] = useState([]);
  const [document, setDocuments] = useState([]);
  const [active, setActive] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [nMessages, setNMessages] = useState("");
  let counter = 0;
  let pic = "./pic.png"
  let date = new Date();
  let currentDate = moment(date).format("YYYY/MM/DD");
  useEffect(() => {
    authentication.onAuthStateChanged((user) => {
      setUser(user);
    });
 
  }, [user]);
  console.log(messaged);

  useEffect(()=>{
    fetchData();
  },[])

  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },1500)
  },[])

  async function fetchData(){
    const querySnapshot = await getDocs(query(collection(database, 'userData'),orderBy("lastMessage","desc")));
    const userData = [];
    const pending = [];
    let i = 1;
    const data = querySnapshot.forEach(doc=>{
      if(doc.data().fName!==""){
        userData.push({count:i++,id:doc.id, fName:doc.data().userFname,
          mName:doc.data().userMname,
          lName:doc.data().userLname,
           number:doc.data().userNumber,
           birthday:doc.data().userBirthdate,
           userPic:doc.data().userPic,
           lastPeriod:doc.data().lastPeriod,
           weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.data().lastPeriod,"weeks"),
           email:doc.data().userEmail,
           userAddress:doc.data().userAddress,
           question1:doc.data().question1,
           question2:doc.data().question2,
           question3:doc.data().question3,
           question4:doc.data().question4,
           question5:doc.data().question5,
           dateCreated:doc.data().dateCreated,
           bloodPressure:doc.data().bloodPressure,
           lastPeriod:doc.data().lastPeriod,
           otherInfo:doc.data().otherInfo,
           height:doc.data().height,
           weight:doc.data().weight,
           status:doc.data().status,
           dateUpdated:doc.data().dateUpdated,
           userLevel:doc.data().userLevel});
      }
    })
    setDocument(userData);
    setDocuments(userData);
    let m = [];
  };


  async function search(vals){
    let ins = [];
    let docs = documents;
    try{
      let fun = documents.map((doc)=>{
        if(vals!==""){
         let val = vals.toLowerCase();
         if(doc.fName.toLowerCase().includes(val)||doc.lName.toLowerCase().includes(val)||doc.number.includes(val)||doc.mName.toLowerCase().includes(val)){
           ins.push({id:doc.id, fName:doc.fName,
             mName:doc.mName,
             lName:doc.lName,
              number:doc.number,
              birthday:doc.birthday,
              userPic:doc.userPic,
              lastPeriod:doc.lastPeriod,
              weeksPregnant:moment(currentDate,"YYYY/MM/DD").diff(doc.lastPeriod,"weeks"),
              email:doc.email,
              userAddress:doc.userAddress,
              question1:doc.question1,
              question2:doc.question2,
              question3:doc.question3,
              question4:doc.question4,
              question5:doc.question5,
              dateCreated:doc.dateCreated,
              bloodPressure:doc.bloodPressure,
              lastPeriod:doc.lastPeriod,
              otherInfo:doc.otherInfo,
              height:doc.height,
              weight:doc.weight,
              status:doc.status,
              dateUpdated:doc.dateUpdated,
              userLevel:doc.userLevel})
         }
         if(vals===""){
          setDocuments(docs)
         }
         else{
          setDocuments(docs)
         }
        }else{
          setDocuments(docs)
        }
       })
        setDocuments(ins)
    }catch(e){
      setDocuments(docs)
    }
    if(vals===""){
      setDocuments(docs)
    }
    console.log(document)
  }

  const [unread, setUnread] = useState([]);
  const [hasMessage, setHasMessage] = useState([]);
  useEffect(() => {
    const messagesCollection = query(collection(database, "messages"),orderBy("createdAt","asc"));
    async function fetchMessages() {
      let appointments = [];
      const messagesSnapshot = await getDocs(messagesCollection);
      messagesSnapshot.forEach((doc)=>{
        appointments.push({id:doc.id,name:doc.data().name, dateMade:doc.data().dateMade,uid:doc.data().uid})
      })
      setMessages(messagesSnapshot.docs);
      scrollToBottom();
    }

    fetchMessages();

    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      let un = [];
      let has = [];
      let appointments = [];
      snapshot.forEach((doc)=>{
        appointments.push({id:doc.id,name:doc.data().name, dateMade:doc.data().dateMade,uid:doc.data().uid})
        if(doc.data().status==="unread"){
          un.push(doc.data().uid)   
          handleRead(doc.id)       
        }
        if(doc.data().status==="unread"){
          has.push({id:doc.id});
        }
      })
      setUnread(un)
      setMessages(snapshot.docs);
      scrollToBottom()
      setHasMessage(has);
      console.log("HAS: "+has)
    });

    messages.forEach((doc)=>{
      if(doc.data().status==="unread"){
        handleRead(doc.id)
      }
    })

    return () => {
      unsubscribe();
    };
  }, [user]);

  const sendMessage = async (message) => {
    const messagesCollection = collection(database, "messages");
    const logCollection = collection(database, "adminLogs");
    let now = moment(date).format("YYYY/MM/DD hh:mm:ss a");
    await addDoc(messagesCollection, {
      text: message,
      createdAt: now,
      senderId: user.uid,
      receiverId: active,
      status: "unread",
      pushNotifRead:false,
      readAt: null
    });
    await addDoc(logCollection, {
      activity:"sent a message to "+ name,
      timestamp: now,
    });
    setMessage("");
    scrollToBottom
  };

  const scrollContainer = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  };

  useEffect(()=>{
    try{
      messages.forEach((docs)=>{
        if(docs.data().senderId===active){
          updateDoc(doc(database,"messages",docs.id),{
            status:'read'
          })
        }
      })
    }catch(e){
      alert(e)
    }
  },[active])

  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const [hasMessages, setHasMessages] = useState([]);

  const handleRead = async(id) => {
    try {
      let userData = [];
      let has = [];
      const unreadDocs = await getDocs(query(collection(database,"messages"),where("senderId","==",id),where("status","==","unread")))
      unreadDocs.forEach((doc)=>{
        userData.push(doc.id)
        if(doc.data().status==="unread"&&doc.data().senderId===active){
          has.push(doc.id)
        }
      })
      setHasMessages(has)
      console.log("IDs: " + userData)
      let i;
      for(i = 1; i <userData.length;i++){
        updateDoc(doc(database,"messages",userData[i]),{
          status:"read"
        }).then(console.log("updated"))
      }
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log("WEW")
  },[messages])

  useEffect(() => {
    // Scroll to the bottom on component mount
    scrollToBottom();
  }, []);

  
  const messageChecker = (id) => {
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].data().status==="unread"&&messages[i].data().senderId===id) {
        return true;
      }
    }
  return false;
  }

  return (
    <>
      {
        loading?
        <Loading/>
        :
        <div style={{width:'100%',height:'100vh',backgroundColor:'ghostwhite',flexDirection:'row',display:'flex',alignItems:'center',justifyContent:'end',}}>
        <div  style={{width:'20%',height:'100%',backgroundColor:'rgb(0,0,50)',overflowY:'scroll',}}>
          <div style={{width:'100%',height:70,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <input type="text" placeholder="search patient" style={{fontSize:12,width:180,height:30}} onChange={(text)=> search(text.target.value)}/>
            </div>
          </div>
          {
            document.map((doc)=> (
              <div key={doc.id} onClick={()=> [setActive(doc.id),setName(doc.fName+" "+doc.mName+" "+doc.lName), scrollToBottom(), handleRead(doc.id),setPicture(doc.userPic)]} style={{width:'100%',height:60,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start',backgroundColor:active===doc.id?"navy":"transparent",cursor:'pointer'}}>
                <div style={{width:40,height:40,borderRadius:40,backgroundImage:!doc.userPic?`url(${img})`:`url(${doc.userPic})`,backgroundSize:'cover',backgroundPosition:'center',backgroundColor:'white',marginLeft:4}}/>
                <div style={{width:'80%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <p style={{fontSize:12,color:'white',marginLeft:10}}>{doc.fName} {doc.mName} {doc.lName}</p>
                  <p style={{fontSize:9,color:'white',marginLeft:10}}>account status: <span style={{color:doc.status==="approved"?"greenyellow":"white"}}>{doc.status==="approved"?"activated":"pending"}</span></p>
                </div>
                {
                  messageChecker(doc.id)===true&&
                  <FontAwesomeIcon icon={faMessage} size="1x" color="white" style={{marginRight:8}}/>
                }
              </div>
            ))
          }
        </div>
        <div style={{width:'80%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'transparent'}}>
         {
          active!==""?
          <>
             <div style={{width:'100%',height:'10%',backgroundColor:'rgb(0,0,50)',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'start'}}>
              <div  style={{width:40,height:40,borderRadius:40,marginRight:40,backgroundImage:picture===""?`url(${pic})`:`url(${picture})`,backgroundSize:'contain',backgroundPosition:'center',marginLeft:40}}/>
              <p style={{color:'white',fontSize:18,fontWeight:700}}>{name}</p>
            </div>
            <div style={{width:'100%',height:'100%',backgroundColor:'white',overflowY:'scroll',}} ref={scrollContainer} className="scroll-container">
                {messages.map((doc) => (
                  <>
                    {
                      doc.data().receiverId===active|doc.data().senderId===active&&
                      <>
                        <div  style={{listStyleType:'none',color:'black',padding:'1%',display:'flex',flexDirection:'column',justifyContent:"center",alignItems:doc.data().receiverId===active?"end":"start",backgroundColor:'transparent',}}>
                          <div style={{width:'40%',display:'flex',flexDirection:'row'}}>
                            {
                              doc.data().senderId===active&&
                              <div  style={{width:60,height:40,borderRadius:40,marginRight:40,backgroundImage:picture===""?`url(${pic})`:`url(${picture})`,backgroundSize:'contain',backgroundPosition:'center',marginLeft:10}}/>
                            }
                            <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column'}}>
                              <li style={{width:'100%',height:'100%',textDecoration:'none',listStyleType:'none',marginBottom:'1%',padding:12,backgroundColor:doc.data().receiverId===active?'navy':"lightgrey",borderRadius:10,fontSize:12,fontWeight:700,color:doc.data().receiverId===active?'white':"black"}} key={doc.id}>{doc.data().text}</li>
                              {
                                doc.data().receiverId===active&&
                                <p style={{color:'black',fontSize:10,color:'black',margin:0}}>{moment(doc.data().createdAt).format("MMMM DD, YYYY hh:mm a")} {doc.data().status}</p>
                              }
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  </>
                ))}
            </div>
            <div style={{width:'100%',height:'8%',backgroundColor:'rgb(0,0,50)',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:'80%',height:'90%',marginTop:10,backgroundColor:'white',border:'1px solid grey',borderTopLeftRadius:10,borderBottomLeftRadius:10,display:'flex',flexDirection:'row',alignItems:'end',justifyContent:'center'}}>
                <input type="text" placeholder="Enter a message" value={message} onChange={(text)=> setMessage(text.target.value)} style={{outline:'none',height:'100%',width:'96%',border:'none',borderRadius:10}}/>
              </div>
              <button onClick={() => [sendMessage(message),scrollToBottom]} style={{width:100,height:'100%',color:'white',fontWeight:600,margin:'none',backgroundColor:'navy',cursor:'pointer'}}>Send</button>
            </div>
          </>
          :
          <div style={{width:'80%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
            <FontAwesomeIcon icon={faMessage} color="skyblue" size="7x"/>
            <p style={{fontSize:40,color:'black'}}>select a conversation</p>
          </div>
         }
        </div>
      </div>
      }
    </>
  );
};

export default Messages;