import React, {useState} from 'react';
import './App.css';
import SignIn from './components/singin';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import List from "./bd-fotos.js";

function App() {
  //socket.emit('conectado', "hola desde cliente");
  const [nombre, setNombre] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) =>{
    e.preventDefault();
    if(nombre !== ""){
      setRegistrado(true);
    }
  }

  let foto = List[Math.floor(Math.random()*(List.length))]
  return (
      <div className='App'>
        {
          !registrado &&  (
            <Container component="main" maxWidth="xs">
              <form className="form" onSubmit={registrar} autoComplete="off">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="mensaje"
                  label="Nickname"
                  value = {nombre}
                  onChange={e=>setNombre(e.target.value)}
                />
                {/* <input value={nombre} onChange={(e)=>setNombre(e.target.value)} /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="boton"
                >
                  Entrar al chat
                </Button>
              </form>
            </Container>
          )

        }
        { registrado &&
          <SignIn nombre={nombre} foto={foto}/>
        }
      </div>
      
  );
}
export default App;
