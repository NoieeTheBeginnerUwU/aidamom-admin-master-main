import React, { useRef, useState } from "react";

import { doc, getDoc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";
import { database } from "../config/firebase";
import "./Conversation.css"
import "./Chatheads.css"
import {   
  faCommentAlt,
  faComments,
  faImage,
  faInfoCircle,
  faPhone,
  faPlusCircle,
  faStickyNote,
  faThumbsUp,
  faVideo, } from "@fortawesome/free-solid-svg-icons";

export default function Conversation({ receiver, user }) {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentMessage = useRef(null);
  const chatBodyRef = useRef(null);

  // handle sending the messages
  const sendMessage = async () => {
    if (!currentMessage.current.value) return;

    const myMessage = {
      message: currentMessage.current.value,
      uid: user.uid,
    };

    // add and save message to firestore
    const conversationRef = doc(database, "conversations", conversationId);
    const docSnap = await getDoc(conversationRef);

    // append message to existing conversation
    if (docSnap.exists()) {
      const docData = docSnap.data();
      await updateDoc(conversationRef, {
        messages: [...docData.messages, myMessage],
      });
    } else {
      // create a new conversation
      await setDoc(doc(database, "conversations", conversationId), {
        messages: [myMessage],
      });
    }

    currentMessage.current.value = "";
  };

  // set conversationId
  React.useEffect(() => {
    if (!receiver || !user) return;

    let myConvId;

    if (receiver.uid > user.uid) myConvId = receiver.uid + user.uid;
    else myConvId = user.uid + receiver.uid;

    setConversationId(myConvId);
  }, [receiver, user]);

  // get converastion from firestore
  React.useEffect(() => {
    if (!conversationId) return;

    const unsub = onSnapshot(
      doc(database, "conversations", conversationId),
      (doc) => {
        const currentData = doc.data();

        if (currentData?.messages.length > 0) setMessages(currentData.messages);
        else setMessages([]);
      }
    );

    return unsub;
  }, [conversationId]);

  // send message with enter
  const handleEnterKeyPressDown = (e) => {
    if ((e.code === "Enter" || e.key === "Enter") && !e.shiftKey) {
      sendMessage();
    }
  };

  const scollToBottomOfChat = () => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.style.scrollBehavior = "smooth";
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  };

  // top scroll after new message
  React.useEffect(() => {
    scollToBottomOfChat();
  }, [messages, chatBodyRef]);

  return (
    <div>
      {receiver ? (
        <div>
          <div className="user-conversation-header">
            <div className="user-conv-header-container">
              <div className="user-profile-pic-container">
                <p className="user-profile-pic-text">{receiver.email[0]}</p>
              </div>
              <p>{receiver.email}</p>
            </div>

            <div className="user-conv-header-container">
              <faPhone color="dodgerblue" size="2vh" />
              <faVideo color="dodgerblue" size="2vh" />
              <faInfoCircle color="dodgerblue" size="2vh" />
            </div>
          </div>

          {/* Conversation messages */}
          <div className="conversation-messages" ref={chatBodyRef}>
            {messages.length > 0 ? (
              messages.map((obj, i) => (
                <div
                  key={i}
                  className="message-container"
                  style={{ justifyContent: obj.uid === user.uid && "flex-end" }}
                >
                  <div className="message-bubble">{obj.message}</div>
                </div>
              ))
            ) : (
              <div className="no-conversation">
                <div>
                  <faComments />
                </div>
                <p>Start a conversation with {receiver.email}</p>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="input-container">
            <faPlusCircle />
            <faImage />
            <faStickyNote />
            <div className="input-message">
              <input placeholder="Hi.." ref={currentMessage} onKeyPress={handleEnterKeyPressDown} />
            </div>
            <button onClick={sendMessage}>Send</button>
            <faThumbsUp />
          </div>
        </div>
      ) : (
        <div className="no-conversation">
          <div>
            <FaCommentAlt />
          </div>
          <p>Pick someone to talk to.</p>
        </div>
      )}
    </div>
  );
}