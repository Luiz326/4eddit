import React, { useState, useEffect } from "react";
import { 
  LoginContainer, 
  LoginFieldsContainer,
  FieldsContainer, 
  Divider ,
  HalfScreen,
  Form
} from "./Styled";
import { 
  TextField, 
  IconButton, 
  Typography, 
  Button 
} from '@material-ui/core'
import { 
  VisibilityOff, 
  Visibility
} from '@material-ui/icons'
import { useHistory } from "react-router-dom";
import { useForm } from '../../Hooks/UseForm'
import SideImage from "../../Components/SideImage/SideImage";
import api from '../../Utils/Api/Api'

const LoginPage = () => {

  const [ showPassword, setShowPassword ] = useState(false)
  const history = useHistory()

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if(token){
      history.replace('/posts')
    }
  })

  const goToSignup = () => {
    history.push('/signup')
  }

  const { form, onChange, clear } = useForm({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const body = {
    email: form.email,
    password: form.password
  }

  const onClickLogin = (e) => {
    e.preventDefault()
    clear()
    api.post('/login', body).then(response => {
      alert('Login feito com sucesso')
      window.localStorage.setItem('token', response.data.token)
      history.push('/posts')
    })
  }

  return (
    <LoginContainer>
      
      <SideImage />

      <HalfScreen>
        <LoginFieldsContainer>
          <Typography 
            variant='h5' 
            align='center'
          >
            Login
          </Typography>
          <Form type='post'>
            <FieldsContainer>
              <TextField
                name='email'
                value={form.email}
                onChange={handleChange}
                variant='outlined' 
                label='Email' 
              />

              <TextField 
                name='password'
                value={form.password}
                onChange={handleChange}
                variant='outlined' 
                label='Password' 
                type={showPassword ? 'text' : 'password'} 
                InputProps={{
                    endAdornment: (   
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    )
                }} 
              />
              <Typography 
                variant='subtitle2' 
                align='right'
              >
                Esqueci minha senha
              </Typography>
            </FieldsContainer>

            <Button 
              variant='contained' 
              fullWidth
              onClick={onClickLogin}
              type='submit'
            >
              Entrar
            </Button>
          </Form>
          
          <Divider>ou</Divider>
          <Button 
            variant='contained' 
            fullWidth 
            onClick={goToSignup}
          >
            Criar conta com e-mail
          </Button>
        </LoginFieldsContainer>
      </HalfScreen>
    </LoginContainer>
  );
}

export default LoginPage