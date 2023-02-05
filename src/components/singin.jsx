import React, {useState, useEffect, useRef} from 'react';
import socket from './Socket';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Avatar} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import './singin.css';


function Copyright() {
  return (
    <Typography variant="body2"
     color="textSecondary" align="center">
      {''}
      <Link color="inherit" href="https://franzrr.github.io" target="_blank">
        Link a otros proyectos míos
      </Link>
      
    </Typography>
  );
}
const getHora = () =>{
  const hoy = new Date()
  const hora = hoy.getHours()
  const minutos =  hoy.getMinutes()
  const segundos = hoy.getSeconds()
  return (hora+":"+minutos+":"+segundos)
}
function SignIn({nombre, foto}) {
    const [mensaje,setMensaje] = useState("");
    const[mensajes, setMensajes] = useState([]);
    const [hora, setHora] = useState(getHora);
    
    useEffect(()=>{
        socket.emit('conectado', nombre, foto);
    }, [nombre]);

    useEffect(()=>{
        socket.on('mensajes', (mensaj) =>{
            setMensajes([...mensajes, mensaj])
        })
        return ()=>{socket.off()}
    }, [mensajes])

    const divRef = useRef(null);
    
    useEffect(()=>{
      //Para bajar el scroll cada que aparece un mensaje
      divRef.current.scrollIntoView({behavior: 'smooth'});
    })

    const submit = (e)=>{
        e.preventDefault();
        setHora("");
        if(mensaje !== ""){
          socket.emit('mensaje', nombre, mensaje, foto, hora)
        }
        setHora(getHora);
        setMensaje(""); 
    }

    return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className='paper'>
          <Avatar className='avatar'>
            <AllInclusiveIcon/>
          </Avatar>
          <Typography component="h1" variant="h4" className="chat" data-text="Chat">
            Chat
          </Typography>
          <form onSubmit={submit} autoComplete="off" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="outlined-basic"
              label="Escribe el mensaje"
              value={mensaje}
              onChange={e => {setMensaje(e.target.value);
              setHora(getHora)}}
              className="caja"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="boton"
            >
              Enviar mensaje
            </Button>  
          </form>
          <div className="caja-chat" id="caja-chat"> 
            {
            mensajes.map((e,i)=> 
            <div className="mensaje">
              <List className="root">
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                  <Avatar alt="Foto" src={e.foto} className="otroAvatar"/>
                  </ListItemAvatar>
                  <ListItemText
                    primary= {
                      <span>
                        <b>{e.nombre} </b>    
                        <small> {e.hora}</small>
                      </span>
                      }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant='body1'
                          className="inline"
                          color= 'textPrimary'
                          gutterBottom
                        >
                        <span className="texto-mensaje">{e.mensaje}</span>  
                        </Typography>
                      </React.Fragment> 
                      }
                  />
                </ListItem>
              </List>
            </div>)
            }
            <div ref={divRef}></div>
          </div>
        </div>
        <Box mt={3}> <Copyright /> </Box>
    </Container>
  );
}
export default SignIn;