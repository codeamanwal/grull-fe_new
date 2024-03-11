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
import { setDate } from 'rsuite/esm/utils/dateUtils';

export default function Freelancerchat() {
  const [clients,setClients] =useState(['John Joseph','John Albert','John Random','John Surname','John','John']);
  const [search,setSearch]=useState('');
  const [userMessage, setuserMessage] = useState('');
  const [freeLancerOnline, setFreeLancerOnline] = useState(true);
  const [clientOnline, setClientOnline] = useState(true);
  const [messages, setMessages] = useState([
    { type: 'text', content: 'Hello Akarsh', username: 'other' },
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

  const handleDateChange = (date, dateString) => {
    console.log(dateString)
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

  const handleSendDeliverable = () => {
    if (deliverableValue.trim() !== '' && selectedDate) {
      const newDeliverableMessage = { 
        type: 'deliverable', 
        content: { deliverable: deliverableValue, date: selectedDate }, 
        username: 'you' 
      };
      setMessages((prevMessages) => [...prevMessages, newDeliverableMessage]);
      handleCloseDeliverableInput();
    } else {
      toast.error('Please enter a valid deliverable and select a date');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        console.log(content);
        if (file.type.startsWith('image/')) {
          setSelectedImage(content);
          const newMessage = { type: 'image', content: content, username: 'you' };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else if (file.type.startsWith('video/')) {
          setSelectedVideo(content);
          const newMessage = { type: 'video', content: content, username: 'you' };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          toast.error('Please select an image or video file');
        }
      };
      reader.readAsDataURL(file);
      setOpen(false);
    }
  };
  
  const handleClickAttach = () => {
      setOpen((prev)=>!prev);
  };

  const sendMessage = () => {
    if (userMessage === '') {
      return toast.error('Please write a message');
    }
  
    const newMessage = { type: 'text', content: userMessage, username: 'you' };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setuserMessage('');
  };
  

  const filteredClients = clients.filter((client) =>
  client.toLowerCase().includes(search.toLowerCase())
  );
  
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
        <Box sx={{display:'flex',flexDirection:'row'}}>
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
                        filteredClients.map((client,indx)=>(
                            <React.Fragment key={indx}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '22px 20px 13px',alignItems:'center',justifyContent:'space-between',gap:'40px',cursor:'pointer'}}>
                                    <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:'10px'}}>
                                        <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                        {client[0]}
                                        </Avatar>
                                        <Box sx={{display:'flex',flexDirection:'column'}}>
                                        <Typography sx={{color:'#353535',fontWeight:'500',fontSize:'18px'}}>{client}</Typography>
                                        <Typography sx={{color:'#353535',fontWeight:'400',fontSize:'14px'}}>Message preview here is shown here...</Typography>
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
                <div className='chat-container'>
                    <div className='chat_Profile_frnd'>
                        <Box>
                            <Avatar sx={{ textTransform: 'uppercase', width: '50px', height: '50px' }}>
                                F
                            </Avatar>
                           {freeLancerOnline ? <div className='chat_Profile_Online'></div> : null}
                        </Box>
                        <div className='chat_Profile_frnd_Name'>
                            <h3>Freelancer</h3>
                            <p>Online</p>
                        </div>
                        <div className='chat_profile_settings'>
                            <div className='chat_profile_settings_menu'>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <div className=''>
                                <i class="fa-solid fa-chevron-down"></i>
                            </div>
                            <div className=''>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className='chat-container_client'>
                        <Box>
                            <Avatar sx={{ textTransform: 'uppercase', width: '70px', height: '70px' }}>
                                C
                            </Avatar>
                            {clientOnline ? <div className='chat_container_client_Online'></div> : null}
                        </Box>
                        <div className='chat-container_client_Name'>
                            <h3>Client</h3>
                            <p>Location</p>
                        </div>
                    </div>
                    <Divider />
                    <div className='chat-container_chat_date'>
                        8 Dec 2024
                    </div>

                    <Grid sx={{padding:'20px 35px',display:'flex',flexDirection:'column',gap:'13px',height:'400px', alignItems:'flex-end',overflowY:'auto'}} className='chat-container_chat_msg_scroll' ref={chatContainerRef}>
                            {messages.map((message, index) => (
                                <Grid key={index} className={message.username!=='you' ? 'message-receive' : 'message-send'}
                                    sx={{
                                        display: 'flex',
                                        flexDirection:'row',
                                        alignItems:'center',
                                        gap:'10px',
                                        width:'60%'
                                    }}>
                                        {index === 0 || messages[index - 1].username !== message.username ? (
                                        <Avatar sx={{ textTransform: 'uppercase', width: '40px', height: '40px'}}>
                                          {message.username[0]}
                                        </Avatar>
                                      ) : <div style={{width:'40px'}}></div>}                                      
                                        {message.type === 'image' && (
                                            <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end',width: '50%',flexDirection:'column',marginBottom:'10px'}}>
                                                <img
                                                    src={message.content}
                                                    alt="Image"
                                                    style={{width:'100%', height:'300px', borderRadius: '16px'}}
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
                                        )}
                                        {message.type === 'video' && (
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
                                            
                                        )}
                                        {message.type === 'price' && (
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
                                                        Price
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'20px',lineHeight:'1'
                                                    }}>
                                                        ₹{message.content}
                                                    </Typography>
                                            </Box>
                                            {
                                                message.username==='you'?
                                                    (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                        <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Cancel</Button>
                                                        <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Edit</Button>
                                                    </Box>):
                                                    (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                        <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Accept</Button>
                                                        <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Negotiaite</Button>
                                                    </Box>)
                                            }
                                            </Box>
                                            
                                        )}
                                        {message.type === 'deliverable' && (
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
                                                        {message.content.deliverable}
                                                    </Typography>
                                                    <Typography sx={{
                                                            fontWeight:'500',
                                                            fontSize:'20px',lineHeight:'1'
                                                    }}>
                                                        {message.content.date}
                                                    </Typography>
                                            </Box>
                                            {
                                                message.username==='you'?
                                                    (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                        <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Cancel</Button>
                                                        <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Edit</Button>
                                                    </Box>):
                                                    (<Box sx={{display: 'flex',width:'100%',flexDirection:'row',gap:'10px',justifyContent:'center'}}>
                                                        <Button sx={{backgroundColor:'#B27EE3',color:'#fff',padding:'7px 20px',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#B27EE3',color:'#fff'}}}>Accept</Button>
                                                        <Button sx={{backgroundColor:'#fff',color:'#B27EE3',padding:'7px 20px',border:'1px solid #B27EE3',fontSize:'14px',borderRadius:'16px',':hover':{backgroundColor:'#fff',color:'#B27EE3'}}}>Extend</Button>
                                                    </Box>)
                                            }
                                            </Box>
                                            
                                        )}
                                        {message.type === 'text' && (
                                            <Typography sx={{
                                                    fontWeight:'500',
                                                    maxWidth: '100%',
                                                    color: '#000000',
                                                    whiteSpace: 'pre-line',
                                                    padding:'5px 15px',
                                                    backgroundColor:'#EAEAEA',
                                                    borderRadius:'16px'
                                                }}>
                                                    {message.content}
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
                                                <DatePicker onChange={handleDateChange} 
                                                 style={{width:'100%'}} format="DD-MM-YYYY"/>
                                                <Box sx={{
                                                    backgroundColor:'#B27EE3',
                                                    cursor:'pointer',
                                                    width:'100%',
                                                    borderRadius:'8px',textAlign:'center',padding:'2px 0'
                                                }}  onClick={handleSendDeliverable} >
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
                </div>

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
