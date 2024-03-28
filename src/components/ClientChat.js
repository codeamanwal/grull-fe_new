import { Avatar, Box, Button, Divider, IconButton, InputBase, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { RxDotsHorizontal } from "react-icons/rx";
import { RiEdit2Line } from "react-icons/ri";
import Header3 from './Header3'
import { CiSearch } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import '../styles/Chat.css'
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { Grid} from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { IoSend } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { DatePicker} from 'antd';
import BAPI from '../helper/variable'
// import {Cloudinary} from "@cloudinary/url-gen";
import axios from 'axios';
import dayjs from 'dayjs';
import io from 'socket.io-client';


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

  const [receivedMessage, setReceivedMessage] = useState(true);
  const [connected, setConnected] = useState(false);
  const [clientId, setClientId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );
  const [websckt, setWebsckt] = useState();
  const [clientname,setClientname]=useState('');
  const [freelancername,setfreelancername]=useState('');

  useEffect(()=>{
      const user=localStorage.getItem('user');
      setClientname(JSON.parse(user).first_name)
  },[])
  useEffect(() => {
    // Generate a unique client ID
    const newClientId = Date.now().toString();
    // setClientId(newClientId);

    const url = `wss://api.grull.tech/ws/${newClientId}`;
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
    console.log(dateString);
    setSelectedDate(dateString);
  };

  const handleOpenPrice = () => {
    setPriceInputOpen((prev)=>(!prev));
  };

  const handleClosePriceInput = () => {
    setPriceInputOpen(false);
    setPriceValue('');
  };

  const handleSendPrice = () => {
    if (priceValue.trim() !== '') {
      const newPriceMessage = { type: 'price', content: priceValue, username: 'you' };
      setMessages((prevMessages) => [...prevMessages, newPriceMessage]);
      handleClosePriceInput();
    } else {
      toast.error('Please enter a valid price');
    }
  };

  const handleOpenDeliverable = () => {
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
      try{
        const response=await axios.post(`${BAPI}/api/v0/chats/update-deliverable`,newDeliverableMessage,{
           headers:{
               Authorization:`Bearer ${accessToken}`,
           }
        })
        console.log(response);
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
        console.log(response);
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
            console.log(negres);
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
            console.log(negres);
        }
        catch(err){
            console.log("Error while Accepting price : ",err)
        }
        sendMessageSocket()
    }

  const uploadImage = async () => {
    const formdata = new FormData();
    
        formdata.append("file", image);
        formdata.append("upload_preset", "grullwork");
        formdata.append("cloud_name", "dvvaaxmto");
        const activityResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dvvaaxmto/image/upload",
          formdata
        );

        const url1 = activityResponse.data.url;

        setPhotoUrl(url1)
        console.log(url1);
    // const cld = new Cloudinary({cloud: {cloudName: 'dvvaaxmto'}});
  };
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    uploadImage();
    // if (file) {
    //   if (file.type.startsWith('image/')) {
    //     await uploadImage();
    //     const newMessage = { type: 'image', content: selectedImage, username: 'you' };
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   } else if (file.type.startsWith('video/')) {
    //     // Assuming setSelectedVideo is defined elsewhere
    //     setSelectedVideo(file);
    //     const newMessage = { type: 'video', content: file, username: 'you' };
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   } else {
    //     toast.error('Please select an image or video file');
    //   }
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
    sendMessageSocket()
  };
  
  useEffect(()=>{
    const getChatInfo=async()=>{
        try{
           const response=await axios.get(`${BAPI}/api/v0/chats/${selectedChat}/get-chat-by-id`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
        //    console.log(response.data);
           setSelectedChatInfo(response.data);
        }
        catch(err){
            console.log("Error while fetching chat : ", err)
        }
    }
    if(selectedChat!=null){
         getChatInfo();}
  },[selectedChat]);

  useEffect(()=>{
    const getChat=async()=>{
        try{
           const response=await axios.get(`${BAPI}/api/v0/chats/get-chat-message-by_id/${selectedChat}`,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
           });
        //    console.log(response.data);
          setMessages(response.data);
        }
        catch(err){
            console.log("Error while fetching chat : ", err)
        }
    }
    if(selectedChat!=null){
         getChat();}
  },[selectedChat,receivedMessage]);
  
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const filteredClients = freelancers;
  
  const updateTextareaHeight = (element) => {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  

  return (
    <Box>
      <Box>
        <Header3 />
      </Box>
      <Box sx={{padding:'40px 90px'}}>
        <Box sx={{display:'flex',flexDirection:'row',height:'820px'}}>
            <Box sx={{boxShadow: '0px 0px 4px 1px #00000040',borderRadius:'16px 0 0 16px',width:'380px',paddingBottom:'30px'}}>
                <Box sx={{ padding: '15px 25px', display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%',gap:'15px' }}>
                    <Typography sx={{ color: '#000000', fontWeight: '600', fontSize: '28px', marginRight: 'auto' }}>Messaging</Typography>
                    <RxDotsHorizontal style={{ fontSize: '25px', marginLeft: 'auto',cursor:'pointer' }} />
                    <RiEdit2Line style={{ fontSize: '25px', borderRadius: '50px', border: '1px solid #000',cursor:'pointer'}} />
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
                            <CiFilter />
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    {
                        freelancers?.map((chat,indx)=>(
                            <React.Fragment key={indx}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '22px 20px 13px',alignItems:'center',justifyContent:'space-between',gap:'40px',cursor:'pointer'}} onClick={() =>{ handleChatSelect(JSON.parse(chat).id);setfreelancername(JSON.parse(chat).first_name)}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:'10px'}}>
                                        <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                        {JSON.parse(chat).first_name[0]}
                                        </Avatar>
                                        <Box sx={{display:'flex',flexDirection:'column'}}>
                                        <Typography sx={{color:'#353535',fontWeight:'500',fontSize:'18px'}}>{JSON.parse(chat).first_name} {JSON.parse(chat).last_name}</Typography>
                                        <Typography sx={{color:'#353535',fontWeight:'400',fontSize:'14px'}}>{JSON.parse(chat).job_title}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{minWidth:'50px'}}>
                                       <Typography sx={{color:'#74767E',fontSize:'14px'}}>Nov 9</Typography>
                                    </Box>
                                </Box>
                                <Divider/>
                            </React.Fragment>
                        ))
                    }
                </Box>
            </Box>
            <Box sx={{boxShadow: '0px 0px 4px 1px #00000040',borderRadius:'0px 16px 16px 0px',flex:'1'}}>
            <div>
                {selectedChat!=null && <div className='chat-container'>
                    <div className='chat_Profile_frnd'>
                        <Box>
                            <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                {freelancername[0]}
                            </Avatar>
                           {freeLancerOnline ? <div className='chat_Profile_Online'></div> : null}
                        </Box>
                        <div className='chat_Profile_frnd_Name'>
                            <h3>{freelancername}</h3>
                            <p>Online</p>
                        </div>
                        <div className='chat_profile_settings'>
                            <div className='chat_profile_settings_menu'>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <div className=''>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div className='' onClick={()=>setSelectedChat(null)}>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className='chat-container_client'>
                        <Box>
                            <Avatar sx={{ textTransform: 'uppercase', width: '70px', height: '70px' }}>
                                {clientname[0]}
                            </Avatar>
                            {clientOnline ? <div className='chat_container_client_Online'></div> : null}
                        </Box>
                        <div className='chat-container_client_Name'>
                            <h3>{clientname}</h3>
                            <p>Location</p>
                        </div>
                    </div>
                    <Divider />
                    <div className='chat-container_chat_date'>
                        8 Dec 2024
                    </div>

                    <Grid sx={{padding:'20px 35px',display:'flex',flexDirection:'column',gap:'13px',height:'400px', alignItems:'flex-end',overflowY:'auto'}} className='chat-container_chat_msg_scroll' ref={chatContainerRef}>
                            {messages.map((message, index) => (
                                <Grid key={index} className={message.sent_by!==selectedChatInfo?.manager_id ? 'message-receive' : 'message-send'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:'10px',
                                        width:'60%'
                                    }}>
                                        {index === 0 || messages[index - 1].sent_by !== message.sent_by ? (
                                        <Avatar sx={{ textTransform: 'uppercase', width: '40px', height: '40px'}}>
                                          {/* {message.username[0]} */}
                                          C
                                        </Avatar>
                                      ) : <div style={{width:'40px'}}></div>}                                      
                                       {(message.status === 'DELIVERABLE_IMAGE' || message.status === 'DELIVERABLE_IMAGE_ACCEPTED' ||message.status === 'DELIVERABLE_IMAGE_REJECTED' ) && (
                                            <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',width: '50%',flexDirection:'column',marginBottom:'10px'}}>
                                                <img
                                                    src={message.message}
                                                    alt="Image"
                                                    style={{width:'100%', height:'300px', borderRadius: '16px'}}
                                                />
                                                <Box sx={{display: 'flex',flexDirection:'row',gap:'10px',justifyContent:'flex-end',marginTop:'10px'}}>
                                                    {
                                                        message.status==='DELIVERABLE_IMAGE'?
                                                        (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                        <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Accept</Button>
                                                        <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Decline</Button>
                                                    </Box>):null 
                                                    }
                                                </Box>
                                            </Box>
                                        )}
                                        {/* {message.type === 'video' && (
                                            <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',width: '50%',flexDirection:'column',marginBottom:'10px'}}>
                                                <video
                                                controls
                                                src={message.content}
                                                alt="Video"
                                                style={{ width: '100%',height:'300px', borderRadius: '16px'}}
                                                />
                                                <Box sx={{display: 'flex',flexDirection:'row',gap:'10px',justifyContent:'flex-end',marginTop:'10px'}}>
                                                        {
                                                            message.username==='you'?
                                                                (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                                    <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Unsend</Button>
                                                                    <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Edit</Button>
                                                                </Box>):
                                                                (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                                    <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Accept</Button>
                                                                    <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Decline</Button>
                                                                </Box>)
                                                        }
                                                </Box>
                                            </Box>
                                            
                                        )} */}
                                        {(message.status === 'NEGOTIATION_ACCEPTED' || message.status=== 'NEGOTIATION_PENDING' || message.status==='NEGOTIATION_REJECTED') && (
                                            <Box sx={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'10px'}}>
                                            <Box sx={{
                                                    maxWidth: '100%',
                                                    color: message.status!=='NEGOTIATION_REJECTED'?'#ffffff':'#000000',
                                                    padding:'10px 15px 10px 15px',
                                                    minWidth:'130px',
                                                    backgroundColor:message.status!=='NEGOTIATION_REJECTED'?'#ED8335':'#EAEAEA',
                                                    borderRadius:'16px',
                                                    display:'flex',flexDirection:'column',gap:'0px'
                                                }}>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'12px'
                                                    }}>
                                                        Price
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'20px',lineHeight:'1'
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
                                                    color: '#ffffff',
                                                    padding:'10px 15px 10px 15px',
                                                    minWidth:'130px',
                                                    backgroundColor:'#ED8335',
                                                    borderRadius:'16px',
                                                    display:'flex',flexDirection:'column',gap:'0px'
                                                }}>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'12px'
                                                    }}>
                                                        {message.message}
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'20px',lineHeight:'1'
                                                    }}>
                                                        {message.deadline}
                                                    </Typography>
                                            </Box>
                                            {
                                               message.status==='DELIVERABLES'?
                                               (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                               <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Cancel</Button>
                                               <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}} onClick={()=>{handleEditDeliverable(message)}}>Edit</Button>
                                           </Box>):null
                                            }
                                            </Box>
                                            
                                        )}
                                        {message.status === 'NORMAL' && (
                                            <Typography sx={{
                                                    fontWeight:'500',
                                                    maxWidth: '100%',
                                                    color: '#000000',
                                                    whiteSpace: 'pre-line',
                                                    padding:'5px 15px',
                                                    backgroundColor:'#EAEAEA',
                                                    borderRadius:'16px'
                                                }}>
                                                    {message.message}
                                            </Typography>
                                        )}
                                </Grid>
                            ))}
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
                                ref={(textarea) => textarea && updateTextareaHeight(textarea)}
                                minRows={3}
                                maxRows={6}
                                />
                                <i class="fa-solid fa-chevron-up"></i>
                            </div>
                            <Divider />
                            <div className='chat_Profile_send'>
                                <div className='chat_Profile_send1'>
                                    <Box sx={{position:'relative'}}>
                                        <i class="fa-solid fa-paperclip" onClick={()=>{handleClickAttach()}}></i>
                                        <Box sx={{position:'absolute',display:open?'flex':'none',top:'-70px',left:'-20px',backgroundColor:'#ffffff',boxShadow:'0px 0px 4px 1px #00000040',borderRadius:'16px',padding:'10px'}} >
                                            <Button component="label" htmlFor="ImageInput" ><MdAddPhotoAlternate style={{fontSize:'20px',color:'#B27EE3'}}/></Button>
                                            <input
                                                id="ImageInput"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                            />
                                            <Button component="label" htmlFor="videoInput" ><MdOutlineSlowMotionVideo style={{fontSize:'20px',color:'#B27EE3'}}/></Button>
                                            <input
                                                id="videoInput"
                                                type="file"
                                                accept="video/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileChange}
                                                />
                                        </Box>
                                    </Box>
                                    <Box sx={{position:'relative'}}>
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
                                    </Box>
                                    <Box sx={{position:'relative'}}>
                                    <i class="fa-regular fa-calendar" onClick={()=>handleOpenDeliverable()}></i>
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
                                                }}  onClick={editMode?handleSendEditedDeliverable:handleSendDeliverable} >
                                                <IoSend style={{fontSize:'18px',color:'#fff'}}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div>
                                <div className='chat_Profile_send_div'>
                                    <Button onClick={sendMessage} style={{ cursor: 'pointer' }}>Send</Button>
                                    <div className=''>
                                        <i class="fa-solid fa-ellipsis" style={{ fontSize: '25px' }}></i>
                                    </div>
                                </div>
                            </div>
                    </Box>
                </div>}

                <Toaster
                    position="top-center"
                    reverseOrder={true}
                />
            </div>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}
