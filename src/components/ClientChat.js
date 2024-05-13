import { Avatar, Box, Button, Divider, IconButton, InputBase, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { RxDotsHorizontal } from "react-icons/rx";
import { RiEdit2Line } from "react-icons/ri";
import StarIcon from '@mui/icons-material/Star';
import Header3 from './Header3'
import { CiSearch } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import '../styles/Chat.css'
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { Grid} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import { IoSend } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { DatePicker} from 'antd';
import BAPI from '../helper/variable'
// import {Cloudinary} from "@cloudinary/url-gen";
import axios from 'axios';
import dayjs from 'dayjs';
import io from 'socket.io-client';
import Header4 from './Header4';


export default function Clientchat() {
  const accessToken=localStorage.getItem("accessToken");
  const [freelancers,setFreelancers] =useState([]);
  const [search,setSearch]=useState('');
  const [userMessage, setuserMessage] = useState('');
  const [freeLancerOnline, setFreeLancerOnline] = useState(true);
  const [clientOnline, setClientOnline] = useState(true);
  const [messages, setMessages] = useState([
    // { type: 'text', content: 'Hello Akarsh', username: 'other' },
  ]);
  const chatContainerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [priceInputOpen, setPriceInputOpen] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [deliverableInputOpen, setDeliverableInputOpen] = useState(false);
  const [deliverableValue, setDeliverableValue] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [dateval,setDateval]=useState('');
  const [photoUrl,setPhotoUrl] =useState('');
  const [image,setImage]=useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatInfo,setSelectedChatInfo]=useState(null);
  const [editMode,setEditMode]=useState(false);
  const [editmessageId,setEditmessageId]=useState('');
  let countDeliverable = 0;
  let submittedacceptDeliverables=0;
  const [receivedMessage, setReceivedMessage] = useState(true);
  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );
  const [websckt, setWebsckt] = useState();
  const [clientname,setClientname]=useState('');
  const [freelancername,setfreelancername]=useState('');
  const [freelancerlocation,setFreelancerlocation]=useState('')
  const [openm, setOpenm] = useState(false);
  const [reviewfeedback,setReviewfeedback]=useState({
    feedback:'',
    stars:'0'
  })
  const [chatCompleted,setChatCompleted]=useState(false);
  const [job_title,setSelectedjobtitle]=useState('');
  const container1 = useRef();
  const container2 = useRef();
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [freelancerphotoUrl,setFreelancerPhotoUrl] =useState(null);
  const [clientphotoUrl, setClientPhotoUrl]=useState(null)

  const handleClickOutside = (e) => {
    if (container1.current && !container1.current.contains(e.target)) {
        setOpen(false);
    }
    if (container2.current && !container2.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
        setDeliverableInputOpen(false);
    }
};
// attaches an eventListener to listen when componentDidMount
useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // optionally returning a func in useEffect runs like componentWillUnmount to cleanup
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
    const handleOpen = () => setOpenm(true);
  const handleClose = () => setOpenm(false);

  useEffect(()=>{
      const user=localStorage.getItem('user');
      setClientname(JSON.parse(user).full_name);
      setClientPhotoUrl(JSON.parse(user).photo_url)
  },[])
  useEffect(() => {
    // Generate a unique client ID
    const newClientId = Date.now().toString();
    // setClientId(newClientId);
    

    const url = `wss://api.dev.grull.tech/ws/${newClientId}`;
    // const url = `wss://localhost:8000/ws/${newClientId}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
        console.log("WebSocket connection opened");
        // Send a connection message to the server
        ws.send("Connect");
    };

    ws.onmessage = (event) => {
        console.log("Message received from server:", event.data);
        // Handle incoming messages from the server
        setReceivedMessage(Math.floor(Math.random() * 1000000));

    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        // Handle WebSocket errors
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed");
        // Perform cleanup tasks if needed
    };

    // Set the WebSocket object to state
    setWebsckt(ws);

    // Cleanup function when component unmounts
    return () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
    };
}, [selectedChatInfo]); // Include clientId as a dependency is unnecessary

const sendMessageSocket = () => {
    if (websckt && websckt.readyState === WebSocket.OPEN) {
        websckt.send("Sent Message");
        setReceivedMessage(Math.floor(Math.random() * 1000000));

    } else {
        console.error("WebSocket is not open or not initialized");
        setReceivedMessage(Math.floor(Math.random() * 1000000));
    }
};

const handleCancel=async(messageId)=>{
    try{
        const negres = await axios.post(`${BAPI}/api/v0/chats/update-message-status`,{
            "message_id":messageId,
            "status":"NORMAL"
        },{
            headers:{
                Authorization:`Bearer ${accessToken}`,
            }
        })
        console.log(negres);
    }
    catch(err){
        console.log("Error while Cancelling deliverables : ",err)
    }
    sendMessageSocket()
  }

   
  useEffect(()=>{
    const getChats=async()=>{
        try{
           const response=await axios.get(`${BAPI}/api/v0/chats/get-manager-chats`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
          setFreelancers(response.data);
        }
        catch(err){
            console.log("Error while fetching chat : ", err)
        }
    }
         getChats();
  },[])

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleOpenDeliverable = () => {
    setDeliverableValue('');
    // setDateval('');
    // setSelectedDate('');
    setDeliverableInputOpen((prev)=>(!prev));
  };

  const handleCloseDeliverableInput = () => {
    setDeliverableInputOpen(false);
    setSelectedDate('');
    setDeliverableValue('');
  };

  const handleSendEditedDeliverable = async() => {
    if (deliverableValue.trim() !== '' && selectedDate) {
      const newDeliverableMessage = {message: deliverableValue,  message_id:editmessageId ,status:'DELIVERABLES',deadline:selectedDate};
      
    setEditMode(false);
    setEditmessageId(null);
      try{
        const response=await axios.post(`${BAPI}/api/v0/chats/update-deliverable`,newDeliverableMessage,{
           headers:{
               Authorization:`Bearer ${accessToken}`,
           }
        })
        }
        catch(err){
            console.log("Error in sending chat : ",err)
        }
      handleCloseDeliverableInput();
    } else {
      toast.error('Please enter a valid deliverable and select a date');
    }
    sendMessageSocket()
  };

  const handleSendDeliverable = async() => {
    if (deliverableValue.trim() !== '' && selectedDate) {
      const newDeliverableMessage = {message: deliverableValue, sent_by: selectedChatInfo.manager_id, chat_id:selectedChatInfo.id ,status:'DELIVERABLES',deadline:selectedDate};
      try{
        const response=await axios.post(`${BAPI}/api/v0/chats/send-message`,newDeliverableMessage,{
           headers:{
               Authorization:`Bearer ${accessToken}`,
           }
        })
        await createnotification("Deliverable added", `${clientname} has added a new deliverable for ${job_title} job.`)
        }
        catch(err){
            console.log("Error in sending chat : ",err)
        }
      handleCloseDeliverableInput();
    } else {
      toast.error('Please enter a valid deliverable and select a date');
    }
    sendMessageSocket()
  };

  const handleEditDeliverable=async(message)=>{
    setEditMode(true);
    setDeliverableValue(message.message);
    setDeliverableInputOpen(true);
    setSelectedDate(message.deadline);
    setDateval(dayjs(message.deadline, 'DD-MM-YYYY'));
    setEditmessageId(message.id);
  }

  
const createnotification=async(title, content)=>{
    const notification={
        "title": title,
        "content": content,
        "notification_for": selectedChatInfo.freelancer_id
      }
    try{
        const response=await axios.post(`${BAPI}/api/v0/notifications/create-notification`,notification,{
         headers:{
             Authorization:`Bearer ${accessToken}`
         }
        });
        console.log(response.data);
     }
     catch(err){
         console.log("Error while creating notification : ", err)
     }
  }


    const handleNegotiate=async(messaegId)=>{
        try{
            const negres = await axios.post(`${BAPI}/api/v0/chats/update-message-status`,{
                "message_id":messaegId,
                "status":"NEGOTIATION_REJECTED"
            },{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                }
            })
            await createnotification("Price Negotiation", `${clientname} has negotiated the price of ${job_title} job.`)
        }
        catch(err){
            console.log("Error while Negotiating price : ",err)
        }
        sendMessageSocket()
    }

    const handleAcceptPrice=async(messaegId)=>{
        try{
            const negres = await axios.post(`${BAPI}/api/v0/chats/update-message-status`,{
                "message_id":messaegId,
                "status":"NEGOTIATION_ACCEPTED"
            },{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                }
            })
            // console.log(negres);
            await createnotification("Price Accepted", `${clientname} has accepted the price negotiation of ${job_title} job.`)
        }
        catch(err){
            console.log("Error while Accepting price : ",err)
        }
        sendMessageSocket()
    }
    const handleAcceptSubmission = async(messageId)=>{
        try{
            const negres = await axios.post(`${BAPI}/api/v0/chats/update-message-status`,{
                "message_id":messageId,
                "status":"DELIVERABLE_IMAGE_ACCEPTED"
            },{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                }
            })
            await createnotification("Accepted Submission", `${clientname} has accepted the submission of ${job_title} job.`)
        }
        catch(err){
            console.log("Error while Accepting deliverable : ",err)
        }
        sendMessageSocket()
    }
    const handleRejectSubmission = async(messageId)=>{
        try{
            const negres = await axios.post(`${BAPI}/api/v0/chats/update-message-status`,{
                "message_id":messageId,
                "status":"DELIVERABLE_IMAGE_REJECTED"
            },{
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                }
            })
            await createnotification("Submission declined", `${clientname} has declined the submission of ${job_title} job.`)
        }
        catch(err){
            console.log("Error while Rejecting deliverable : ",err)
        }
        sendMessageSocket()
    }


    useEffect(()=>{ 
        const uploadImage = async () => {
          const data = new FormData();
          data.append("file", image);
          data.append("upload_preset", 'er103mfg');
          data.append("cloud_name", 'dlpcihcmz');
          await fetch('https://api.cloudinary.com/v1_1/dlpcihcmz/image/upload', {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then(async(data) => {
              console.log(data)
              const imageUrl = data.url;
                if (imageUrl !== '') {
                  const newMessage = {
                    message: imageUrl,
                    sent_by: selectedChatInfo.manager_id,
                    chat_id: selectedChatInfo.id,
                    status: 'IMAGE',
                    deadline: ''
                  };
                  try{
                      const sendMessageResponse = await axios.post(
                        `${BAPI}/api/v0/chats/send-message`,
                        newMessage,
                        {
                          headers: {
                            Authorization: `Bearer ${accessToken}`
                          }
                        }
                      );
                
                      console.log(sendMessageResponse);
                  }
                  catch(err){
                      console.log("error while sending Image : ", err)
                  }
                }
            })
            .catch((err) => {
              console.log(err);
            });
            setImage(null);
            sendMessageSocket();
        }
    
        const uploadVideo = async () => {
            const data = new FormData();
            data.append("file", selectedVideo);
            data.append("upload_preset", 'er103mfg');
            data.append("cloud_name", 'dlpcihcmz');
            await fetch('https://api.cloudinary.com/v1_1/dlpcihcmz/video/upload', {
              method: "post",
              body: data,
            })
              .then((res) => res.json())
              .then(async(data) => {
                console.log(data)
                const videoUrl = data.url;
                  if (videoUrl !== '') {
                    const newMessage = {
                      message: videoUrl,
                      sent_by: selectedChatInfo.manager_id,
                      chat_id: selectedChatInfo.id,
                      status: 'VIDEO',
                      deadline: ''
                    };
                    try{
                        const sendMessageResponse = await axios.post(
                          `${BAPI}/api/v0/chats/send-message`,
                          newMessage,
                          {
                            headers: {
                              Authorization: `Bearer ${accessToken}`
                            }
                          }
                        );
                  
                        console.log(sendMessageResponse);
                    }
                    catch(err){
                        console.log("error while sending Image : ", err)
                    }
                  }
              })
              .catch((err) => {
                console.log(err);
              });
              setSelectedVideo(null)
              sendMessageSocket()
          }
    
        if(image){
            uploadImage() 
        }
        if(selectedVideo){
            uploadVideo() 
        }
    
      },[image,selectedVideo])   

      const handleFileChange = async (event) => {
        const file = event.target.files[0];
        console.log(file);
    
        if (file === undefined) {
            toast({
                title: "Please Select a File!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        const fileType = file.type;
        if (fileType.startsWith('image/')) {
            setImage(file);
        } else if (fileType.startsWith('video/')) {
            setSelectedVideo(file);
        } else {
            toast({
                title: "Unsupported File Type!",
                description: "Please select either an image or a video file.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
    
        setOpen(false);
    };
  
  const handleClickAttach = () => {
      setOpen((prev)=>!prev);
  };

  const sendMessage = async() => {
    if (userMessage === '') {
      return toast.error('Please write a message');
    }
    const newMessage = {message: userMessage, sent_by: selectedChatInfo.manager_id, chat_id:selectedChatInfo.id ,status:'NORMAL',deadline:''};
    try{
         const response=await axios.post(`${BAPI}/api/v0/chats/send-message`,newMessage,{
            headers:{
                Authorization:`Bearer ${accessToken}`,
            }
         })
         console.log(response);
    }
    catch(err){
        console.log("Error in sending chat : ",err)
    }
    setuserMessage('');
    sendMessageSocket();
  };

  const getFreelancerDetails=async(freelancer_id)=>{
    try{
        const response=await axios.get(`${BAPI}/api/v0/users/${freelancer_id}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
        //    console.log(response)
        setFreelancerPhotoUrl(response.data.photo_url)
    }
    catch(err){
        console.log("Error while fetching client details : ", err)
    }
  }
  
  useEffect(()=>{
    const getChatInfo=async()=>{
        try{
           const response=await axios.get(`${BAPI}/api/v0/chats/${selectedChat}/get-chat-by-id`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
           setSelectedChatInfo(response.data);
           getFreelancerDetails(response.data.freelancer_id)
        }
        catch(err){
            console.log("Error while fetching chat : ", err)
        }
    }
    if(selectedChat!==null){
         getChatInfo();
        }
  },[selectedChat]);

  const submitReview=async()=>{
    const review={
      "stars": reviewfeedback.stars,
      "review": reviewfeedback.feedback,
      "review_for": selectedChatInfo.freelancer_id,
      "job_application_id": selectedChatInfo.application_id,
      "is_freelancer":true
    }
    try{
        const response=await axios.post(`${BAPI}/api/v0/reviews/create-reviews`, review, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
            setReviewfeedback({
                feedback:'',
                stars:'0'
            })
            handleClose();
    }
    catch(err){
        console.log("Error while giving review : ",err)
    }
}


  const checkcompleted=async()=>{
    let total=0;
    let completed=0;
    messages.forEach((message)=>{
        if(message.status==="DELIVERABLE_IMAGE_ACCEPTED"){
            completed++;
        }
        if(message.status==="DELIVERABLES_ACCEPTED"){
            total++;
        }
    })

    if(total!==0 && total===completed){
        setChatCompleted(true);
    }
}

  useEffect(()=>{
    const getChat=async()=>{
        try{
           const response=await axios.get(`${BAPI}/api/v0/chats/get-chat-message-by_id/${selectedChat}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
        //    console.log(response.data);
        //    const newmessage={
        //          status :  "REVIEW"
        //    }
          setMessages(response.data);
        //   await checkcompleted();
        }
        catch(err){
            console.log("Error while fetching chat : ", err)
        }
    }
    // if(selectedChat!==null){
         getChat();
    // }
  },[selectedChat,receivedMessage]);
  
  const handleChatSelect = (chat,title) => {
    if(selectedChat!=chat){
    setChatCompleted(false);
    setReviewfeedback({
        feedback:'',
        stars:'0'
    });
    setMessages([]);
    setSelectedjobtitle(title);
    setSelectedChat(chat);}
  };
  
  const updateTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleConvertDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    const newdate=date.toLocaleDateString('en-US', options);
    return newdate;
  };

  const handleFilter = () => {
    if (!search.trim()) {
        setFilteredFreelancers(freelancers);
    } else {
        const filtered = freelancers.filter(chat => {
            const fullName = `${JSON.parse(chat).first_name} ${JSON.parse(chat).last_name}`;
            return fullName.toLowerCase().includes(search.trim().toLowerCase()) ||
                JSON.parse(chat).job_title.toLowerCase().includes(search.trim().toLowerCase());
        });
        setFilteredFreelancers(filtered);
    }
};

useEffect(() => {
    handleFilter();
}, [search, freelancers]);


  return (
    <Box>
      <Box>
        <Header4 />
      </Box>
      <Box sx={{padding:{md:'40px 90px',sm:'40px',xs:'0px'}}}>
        <Box sx={{display:'flex',flexDirection:'row',height:{sm:'820px',xs:'100%'},position:'relative'}}>
          <Box sx={{boxShadow: {sm:'0px 0px 4px 1px #00000040',xs:'0'},borderRadius:{lg:'16px 0 0 16px',sm:'16px',xs:'0'},width:{lg:'380px',xs:'100%'},overflowY:'auto'}}>
            <Box sx={{ padding: '15px 25px', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%',gap:'15px' }}>
                    <Typography sx={{ color: '#000000', fontWeight: '600', fontSize: '28px', marginRight: 'auto' }}>Messaging</Typography>
                    {/* <RxDotsHorizontal style={{ fontSize: '25px', marginLeft: 'auto',cursor:'pointer' }} />
                    <RiEdit2Line style={{ fontSize: '25px', borderRadius: '50px', border: '1px solid #000',cursor:'pointer'}} /> */}
                </Box>
                <Divider />
                <Box sx={{padding:'24px 20px 12px'}}>
                    <Box sx={{boxShadow: '0px 0px 4px 0.5px #00000040',borderRadius:'16px',padding:'1px 15px 1px 15px',display:'flex',flexDirection:'row',flexWrap:'nowrap',alignItems:'center'}}>
                       <CiSearch style={{ fontSize: '20px'}}/>
                       <InputBase
                            sx={{ ml: 1.4, flex: 1 }}
                            placeholder="Search Message"
                            style={{color:'#000000'}}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton type="button" sx={{p: '10px'}} aria-label="filter">
                            {/* <CiFilter /> */}
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{overflowY:'auto',height:'auto'}}>
                    {
                        (filteredFreelancers!==null && filteredFreelancers?.length!==0)?(filteredFreelancers?.map((chat,indx)=>(
                            <React.Fragment key={indx}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '22px 20px 13px',alignItems:'center',justifyContent:'space-between',gap:'40px',cursor:'pointer'}} onClick={() =>{ handleChatSelect(JSON.parse(chat).id,JSON.parse(chat).job_title);setfreelancername(JSON.parse(chat).first_name+" "+JSON.parse(chat).last_name); setFreelancerlocation(JSON.parse(chat).location)}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:'10px'}}>
                                        <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                        {(JSON.parse(chat).first_name+" "+JSON.parse(chat).last_name)?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                        </Avatar>
                                        <Box sx={{display:'flex',flexDirection:'column'}}>
                                        <Typography sx={{color:'#353535',fontWeight:'500',fontSize:'18px'}}>{JSON.parse(chat).first_name} {JSON.parse(chat).last_name}</Typography>
                                        <Typography sx={{color:'#353535',fontWeight:'400',fontSize:'12px'}}><span style={{fontWeight:'bold'}}></span>{JSON.parse(chat).company}</Typography>
                                        <Typography sx={{color:'#353535',fontWeight:'400',fontSize:'12px'}}><span style={{fontWeight:'bold'}}>Job Profile : </span>{JSON.parse(chat).job_title}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{minWidth:'50px'}}>
                                       <Typography sx={{color:'#74767E',fontSize:'14px'}}>Nov 9</Typography>
                                    </Box>
                                </Box>
                                <Divider/>
                            </React.Fragment>
                        ))):<Box sx={{padding: '22px 20px 13px',textAlign:'center'}}>No chats available</Box>
                    }
                </Box>
            </Box>
            <Box sx={{boxShadow: {sm:'0px 0px 4px 1px #00000040',xs:'0'},borderRadius:{lg:'0 16px 16px 0',sm:'16px',xs:'0'},flex:1,position:{lg:'relative',xs:'absolute'},backgroundColor:'#ffffff',width:{xs:'100%',lg:'auto'}}}>
            <Box sx={{width:'100%',height:selectedChat!==null?{sm:'820px',xs:'100vh'}:'auto'}}>
                {selectedChat!=null && <div className='chat-container'>
                    <div className='chat_Profile_frnd'>
                        <Box>
                        {
                                (clientphotoUrl && clientphotoUrl !=='' )?(
                                    <img
                                    // className='user-picture-img'
                                    alt={clientname[0]}
                                    src={clientphotoUrl}
                                    style={{ borderRadius:'50%',width:'50px',height:'50px',objectFit: 'cover'  }}
                                />
                                ):(
                                    <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                    {clientname?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                    </Avatar>
                                )
                            }
                           {freeLancerOnline ? <div className='chat_Profile_Online'></div> : null}
                        </Box>
                        <div className='chat_Profile_frnd_Name'>
                            <h3>{clientname}</h3>
                            <p>Online</p>
                        </div>
                        <div className='chat_profile_settings'>
                            {/* <div className='chat_profile_settings_menu'>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <div className=''>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div> */}
                            <div className='' onClick={()=>setSelectedChat(null)}>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className='chat-container_client'>
                        <Box>
                        {(freelancerphotoUrl && freelancerphotoUrl!=='') ? (
                                                  <img
                                                      // className='user-picture-img'
                                                      alt={freelancername[0]}
                                                      src={freelancerphotoUrl}
                                                      style={{ borderRadius:'50%',width:'70px',height:'70px',objectFit: 'cover'  }}
                                                  />
                                              ) : (
                                                <Avatar sx={{ textTransform: 'uppercase', width: '70px', height: '70px' }}>
                                                {freelancername?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                                </Avatar>
                                              )}
                            {clientOnline ? <div className='chat_container_client_Online'></div> : null}
                        </Box>
                        <div className='chat-container_client_Name'>
                            <h3>{freelancername}</h3>
                            <p>{freelancerlocation}</p>
                        </div>
                    </div>
                    <Divider />
                    {/* <div className='chat-container_chat_date'>
                        8 Dec 2024
                    </div> */}

                    <Grid sx={{padding:{sm:'20px 35px',xs:'14px'},display:'flex',flexDirection:'column',gap:'13px',overflowY:'auto',width:'100%',flex:1}} className='chat-container_chat_msg_scroll' ref={chatContainerRef}>
                    {messages.map((message, index) => {
                                 if (message.status === 'DELIVERABLES_ACCEPTED') {
                                    countDeliverable++;
                                }
                                if (message.status === 'DELIVERABLE_IMAGE_ACCEPTED') {
                                    submittedacceptDeliverables++;
                                }
                                const convertedDate=handleConvertDate(message.created_at);
                             return (
                             <>
                             { (index===0 || handleConvertDate(messages[index-1]?.created_at)!==convertedDate) && (
                                        <Box key={index}
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',xs:'2px 0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>{convertedDate}</Typography>
                                        </Box>
                                    )
                                }
                             <Grid  key={index}  className={message.sent_by!==selectedChatInfo?.manager_id ? 'message-receive' : 'message-send'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:'10px',
                                        // width:'60%'
                                    }}>
                                        {index === 0 || messages[index - 1].sent_by !== message.sent_by ? (
                                          <>
                                          {
                                              message.sent_by!==selectedChatInfo?.manager_id &&(
                                                  <>
                                                  {(freelancerphotoUrl && freelancerphotoUrl!=='') ? (
                                                      <img
                                                          // className='user-picture-img'
                                                          alt={freelancername[0]}
                                                          src={freelancerphotoUrl}
                                                          style={{ borderRadius:'50%',width:'40px',height:'40px',objectFit: 'cover'  }}
                                                      />
                                                  ) : (
                                                      <Avatar sx={{ textTransform: 'uppercase', width: '40px', height: '40px'}}>
                                                      {/* {message.username[0]} */}
                                                      {(message.sent_by!==selectedChatInfo?.manager_id?(freelancername):(clientname))?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                                    </Avatar>
                                                  )}
                                                  </>
                                              )
                                          }
                                          {
                                              message.sent_by===selectedChatInfo?.manager_id &&(
                                                  <>{
                                                      (clientphotoUrl && clientphotoUrl !=='' )?(
                                                          <img
                                                          // className='user-picture-img'
                                                          alt={clientname[0]}
                                                          src={clientphotoUrl}
                                                          style={{ borderRadius:'50%',width:'40px',height:'40px' ,objectFit: 'cover' }}
                                                      />
                                                      ):(
                                                          <Avatar sx={{ textTransform: 'uppercase', width: '40px', height: '40px'}}>
                                                    {/* {message.username[0]} */}
                                                    {(message.sent_by!==selectedChatInfo?.manager_id?(freelancername):(clientname))?.split(' ').slice(0, 2).map(part => part[0]).join('')}
                                                  </Avatar>
                                                      )
                                                  }
                                                  
                                                  </>
                                              )
                                          }
                                          </>
                                      ) : <div style={{width:'40px'}}></div>}    
                                      {(message.status === 'DELIVERABLE_IMAGE' || message.status === 'DELIVERABLE_IMAGE_ACCEPTED' ||message.status === 'DELIVERABLE_IMAGE_REJECTED' ) && (
                    <Box sx={{display:'flex',justifyContent:'flex-end',flexDirection:'column',marginBottom:'5px'}}>
                        {/* <img
                            className="image_deliverable"
                            src={message.message}
                            alt="Image"
                            style={{width:'220px', height:'220px'}}
                        /> */}
                        <Box sx={{
                            backgroundColor: '#f2f2f2',
                            boxShadow: '0px 0px 4px 1px #00000040',
                            borderRadius: '10px',
                            border: '10px solid #FFFFFF',
                            width: {md:'220px',sm:'170px',xs:'150px'},
                            height: {sm:'80px',xs:'60px'},
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden', 
                            padding:'5px',
                            color:"#b3b3b3",
                            fontSize:{md:'16px',xs:'13px'}
                            }}>
                            <a href={message.message} target="_blank" style={{color:"#b3b3b3"}}>
                                {message.message}
                            </a>
                            </Box>


                        <Box sx={{display: 'flex',flexDirection:'row',gap:'10px',justifyContent:'flex-end',marginTop:'10px'}}>
                            {
                                message.status==='DELIVERABLE_IMAGE'?
                                (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}} onClick={()=>handleAcceptSubmission(message.id)}>Accept</Button>
                                <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}} onClick={()=>[handleRejectSubmission(message.id)]} >Decline</Button>
                            </Box>):null 
                            }
                        </Box>
                    </Box>
                )}
               {(message.status === 'IMAGE' ) && (
                                             <Box sx={{display:'flex',justifyContent:'flex-end',flexDirection:'column',marginBottom:'5px'}}>
                                             <img
                                                   className="image_deliverable"
                                                    src={message.message}
                                                    alt="Image"
                                                    style={{width:'220px', height:'220px'}}
                                                />
                                            </Box>
                                        )}                           
                                      
                {message.status === 'VIDEO' && (
                                             <Box sx={{display:'flex',justifyContent:'flex-end',flexDirection:'column',marginBottom:'5px'}}>
                                                <video
                                                className="image_deliverable"
                                                controls
                                                src={message.message}
                                                alt="Video"
                                                style={{width:'220px', height:'220px'}}
                                                />
                                                
                                            </Box>
                                            
                                        )}
                                        {(message.status === 'NEGOTIATION_ACCEPTED' || message.status=== 'NEGOTIATION_PENDING' || message.status==='NEGOTIATION_REJECTED') && (
                                            <Box sx={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'10px'}}>
                                            <Box sx={{
                                                    maxWidth: '100%',
                                                    color: message.status!=='NEGOTIATION_REJECTED'?'#ffffff':'#000000',
                                                    padding:'10px 15px 10px 15px',
                                                    minWidth:{md:'130px'},
                                                    backgroundColor:message.status!=='NEGOTIATION_REJECTED'?'#ED8335':'#EAEAEA',
                                                    borderRadius:'16px',
                                                    display:'flex',flexDirection:'column',gap:'0px'
                                                }}>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:{sm:'12px',xs:'10px'}
                                                    }}>
                                                        Price
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:{md:'20px',sm:'16px',xs:'14px'},lineHeight:'1'
                                                    }}>
                                                        ₹{message.message}
                                                    </Typography>
                                            </Box>
                                            {
                                                message.status==='NEGOTIATION_PENDING'?
                                                (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                    <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}} onClick={()=>{handleAcceptPrice(message.id)}}>Accept</Button>
                                                    <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}} onClick={()=>handleNegotiate(message.id)}>Negotiaite</Button>
                                                </Box>):null
                                            }
                                            </Box>
                                            
                                        )}
                                        {(message.status === 'DELIVERABLES' || message.status === 'DELIVERABLES_ACCEPTED' || message.status==='DELIVERABLES_REJECTED') && (
                                            <Box sx={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'10px'}}>
                                            <Box sx={{
                                                    maxWidth: '100%',
                                                    color: message.status!=='DELIVERABLES_REJECTED'?'#ffffff':'#000000',
                                                    padding:'10px 15px 10px 15px',
                                                    minWidth:{md:'130px'},
                                                    backgroundColor:message.status!=='DELIVERABLES_REJECTED'?'#ED8335':'#EAEAEA',
                                                    borderRadius:'16px',
                                                    display:'flex',flexDirection:'column',gap:'0px'
                                                }}>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:{sm:'12px',xs:'10px'}
                                                    }}>
                                                        {message.message}
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:{md:'20px',sm:'16px',xs:'14px'},lineHeight:'1'
                                                    }}>
                                                        {message.deadline}
                                                    </Typography>
                                            </Box>
                                            {
                                               message.status==='DELIVERABLES'?
                                               (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                               <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}} onClick={()=>{handleCancel(message.id)}}>Cancel</Button>
                                               <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}} onClick={()=>{handleEditDeliverable(message)}}>Edit</Button>
                                           </Box>):null
                                            }
                                            </Box>
                                            
                                        )}
                                        {message.status === 'NORMAL' && (
                                            <Typography sx={{
                                                    fontWeight:'500',
                                                    color: '#000000',
                                                    maxWidth: '50%',
                                                    wordBreak:'break-word',
                                                    whiteSpace: 'pre-line',
                                                    padding:'5px 15px',
                                                    backgroundColor:'#EAEAEA',
                                                    borderRadius:'16px',
                                                    fontSize:{md:'18px',sm:'16px',xs:'14px'}
                                                }}>
                                                    {message.message}
                                            </Typography>
                                        )}
                                </Grid>
                                {
                                    message.status==="NEGOTIATION_ACCEPTED" && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',sm:'2px 0',xs:'0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Congrats your project has been started</Typography>
                                        </Box>
                                    )
                                }
                                {
                                    message.status==="DELIVERABLES_REJECTED" && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',sm:'2px 0',xs:'0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Freelancer has rejected the deliverable {countDeliverable+1}</Typography>
                                        </Box>
                                    )
                                }
                                {
                                    message.status==="DELIVERABLES_ACCEPTED" && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',sm:'2px 0',xs:'0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Freelancer has accepted the deliverable {countDeliverable}</Typography>
                                        </Box>
                                    )
                                }
                                {
                                    message.status==="DELIVERABLE_IMAGE_ACCEPTED" && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',sm:'2px 0',xs:'0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Deliverable {submittedacceptDeliverables} is accepted</Typography>
                                        </Box>
                                    )
                                }
                                {
                                    message.status==="DELIVERABLE_IMAGE_REJECTED" && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           margin:{md:'5px 0',sm:'2px 0',xs:'0'}
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Deliverable {submittedacceptDeliverables+1} is declined</Typography>
                                        </Box>
                                    )
                                }
                                </>
                            )})
                            }
                                {
                                    chatCompleted && (
                                        <Box 
                                        sx={{
                                           display:'flex',
                                           flexDirection:'row',
                                           justifyContent:'center',
                                           gap:'10px',
                                           alignItems:'center',
                                           width:'100%',
                                           marginTop:'20px'
                                        }}>
                                         <Typography sx={{color:'#454545',fontWeight:'700',fontSize:{md:'18px',sm:'15px',xs:'13px'}}}>Congrats your project is completed</Typography>
                                        <Button sx={{
                                            borderRadius:'16px',
                                            color:'#fff',
                                            backgroundColor:'#000',
                                            padding:'5px 10px',
                                            fontSize:'13px',
                                            ':hover':{
                                                color:'#fff',
                                                backgroundColor:'#000',
                                            }
                                        }} onClick={handleOpen} >Give Review</Button>
                                        <Modal
                                            open={openm}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                             <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width:{sm:'600px',xs:'90%'},
                        backgroundColor: '#fff',
                        boxShadow: '0px 0px 4px 1px #00000040',
                        borderRadius:'7px',
                        padding:'25px'
                    }}>
                                            <Typography sx={{color:'#000000',fontSize:{sm:'23px',xs:'18px'},fontWeight:'700'}} >
                                                Review
                                            </Typography>
                                            <Box sx={{
                                                marginTop:'20px'
                                            }}>
                                                <Form.Group className='form-group' controlId="form">
                                                    <Form.Control as="textarea"
                                                        value={reviewfeedback.feedback}
                                                        onChange={(e)=>{
                                                            setReviewfeedback({ ...reviewfeedback, feedback: e.target.value });
                                                        }}
                                                        rows="5"
                                                        className='form-val proposaldesc' 
                                                        type="text" name='feedback' placeholder="Enter your feedback here.." />
                                                </Form.Group>
                                                <Rating
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55, color:'grey'}} fontSize="inherit" />}
                                                    name="simple-controlled"
                                                    value={reviewfeedback.stars}
                                                    onChange={(e, newValue) => {
                                                        setReviewfeedback({ ...reviewfeedback, stars: newValue });
                                                    }}
                                                />
                                                <Button 
                                                onClick={()=>submitReview()}
                                                sx={{
                                                    borderRadius:'5px',
                                                    color:'#fff',
                                                    backgroundColor:'#000',
                                                    padding:'6px 15px',
                                                    fontSize:{sm:'15px',xs:'12px'},
                                                    marginLeft:'auto',
                                                    ':hover':{
                                                        color:'#fff',
                                                        backgroundColor:'#000',
                                                    },
                                                    float:'right'
                                                }}>Submit Review</Button>
                                            </Box>
                                            </Box>
                                        </Modal>
                                        </Box>
                                    )
                                }
                    </Grid>

                    <Box sx={{display:'flex',flexDirection:'column'}} className="chat_footer">
                            <Divider />
                            <div className='chat_Container_Textarea'>
                            <textarea
                                value={userMessage}
                                onChange={(e) => setuserMessage(e.target.value)}
                                type="text"
                                className='Textarea_chat'
                                placeholder='Write a message...'
                                // ref={(textarea) => textarea && updateTextareaHeight(textarea)}
                                rows="3"
                                // maxRows={6}
                                />
                                {/* <i class="fa-solid fa-chevron-up"></i> */}
                            </div>
                            <Divider />
                            <div className='chat_Profile_send'>
                                <div className='chat_Profile_send1'>
                                    <Box sx={{position:'relative'}} ref={container1}>
                                        <i class="fa-solid fa-paperclip" onClick={()=>{handleClickAttach()}}></i>
                                        <Box sx={{position:'absolute',display:open?'flex':'none',top:'-70px',left:'-20px',backgroundColor:'#ffffff',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'10px'}} >
                                            <Button component="label" htmlFor="ImageInput" ><MdAddPhotoAlternate style={{fontSize:'20px',color:'#B27EE3'}}/></Button>
                                            <input
                                                id="ImageInput"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                disabled={chatCompleted}
                                            />
                                            <Button component="label" htmlFor="videoInput" ><MdOutlineSlowMotionVideo style={{fontSize:'20px',color:'#B27EE3'}}/></Button>
                                            <input
                                                id="videoInput"
                                                type="file"
                                                accept="video/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                disabled={chatCompleted}
                                                />
                                        </Box>
                                    </Box>
                                    {/* <Box sx={{position:'relative'}}>
                                        <BsCurrencyDollar style={{fontSize: '20px',cursor:'pointer'}} onClick={()=>handleOpenPrice()} />
                                        <Box sx={{position:'absolute',display:priceInputOpen?'flex':'none',top:'-100px',left:'-20px',backgroundColor:'#ffffff',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'15px',flexDirection:'column',gap:'10px'}}>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                                               <Typography>Enter Price :</Typography>
                                               <RxCrossCircled style={{fontSize:'20px',cursor:'pointer'}} onClick={handleClosePriceInput} />
                                            </Box>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
                                                <input 
                                                    autoFocus
                                                    type="text"
                                                    value={priceValue}
                                                    onChange={(e)=>setPriceValue(e.target.value)}
                                                    style={{border:'none',outline:'none',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'8px',padding:'5px 10px',width:'120px'}}
                                                />
                                                <IoSend style={{fontSize:'20px',cursor:'pointer',color:'#B27EE3'}} onClick={handleSendPrice} />
                                            </Box>
                                        </Box>
                                    </Box> */}
                                    <Box sx={{position:'relative'}} ref={container2}>
                                    <i class="fa-regular fa-calendar" onClick={()=>handleOpenDeliverable()} ></i>
                                    <Box sx={{position:'absolute',display:deliverableInputOpen?'flex':'none',top:'-180px',left:'-20px',backgroundColor:'#ffffff',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'15px',flexDirection:'column',gap:'10px'}}>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',gap:'20px'}} >
                                               <Typography>Post a Deliverable :</Typography>
                                               <RxCrossCircled style={{fontSize:'20px',cursor:'pointer'}} onClick={handleCloseDeliverableInput} />
                                            </Box>
                                            <Box sx={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                                                <input 
                                                    autoFocus
                                                    type="text"
                                                    value={deliverableValue}
                                                    onChange={(e)=>setDeliverableValue(e.target.value)}
                                                    style={{border:'none',outline:'none',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'8px',padding:'5px 10px',width:'200px'}}
                                                />
                                                <DatePicker onChange={handleDateChange} defaultPickerValue={dateval}
                                                 style={{width:'100%'}} format="DD-MM-YYYY"/>
                                                <Box sx={{
                                                    backgroundColor:'#B27EE3',
                                                    cursor:'pointer',
                                                    width:'100%',
                                                    borderRadius:'8px',textAlign:'center',padding:'2px 0'
                                                }}  onClick={chatCompleted? null:(editMode? handleSendEditedDeliverable:handleSendDeliverable)} >
                                                <IoSend style={{fontSize:'18px',color:'#fff'}}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div>
                                <div className='chat_Profile_send_div'>
                                    <Button onClick={sendMessage} style={{ cursor: 'pointer' }} disabled={chatCompleted} >Send</Button>
                                    <div className='' style={{marginRight:'20px'}}>
                                        {/* <i class="fa-solid fa-ellipsis" style={{ fontSize: '25px' }}></i> */}
                                    </div>
                                </div>
                            </div>
                    </Box>
                </div>}

                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
            </Box>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}
