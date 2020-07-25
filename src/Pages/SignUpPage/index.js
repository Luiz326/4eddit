import React, { useState, useEffect } from 'react'
import { 
	SignUpContainer, 
	Divider, 
	SignUpFields,
  FullContainer,
  HalfScreen,
  Form
} from './Styled'
import { TextField, Button, IconButton } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from '../../Hooks/UseForm'
import { useHistory } from 'react-router-dom'
import SideImage from '../../Components/SideImage/SideImage'
import api from '../../Utils/Api/Api'


const SignUpPage = () => {

  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if(token){
      history.replace('/posts')
    }
  })

  const [ showPassword, setShowPassword ] = useState(false)
  const history = useHistory()
  const { form, onChange, clear } = useForm({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    onChange(name, value)
  }

  const body = {
    email: form.email,
    password: form.password,
    username: form.username
  }

  const loginBody = {
    email: form.email,
    password: form.password
  }

  const onClickRegister = async(e) => {
    e.preventDefault()
    clear()
    await api.post('/signup', body).then(response => {
      alert('criado com sucesso.')
    }).catch(e => {
      alert('Algo aconteceu' + e)
    })
    api.post('/login', loginBody).then(response => {
      window.localStorage.setItem('token', response.data.token)
      history.push('/posts')
    })
  }

	return(
		<FullContainer>

			<SideImage />

      <HalfScreen>
        <SignUpContainer>
          <Button 
            variant='contained' 
            style={{background: '#2F5ABA', color: '#FFFFFF'}}
          >
            Cadastre-se com o facebook
          </Button>

					<Divider>ou</Divider>

          <Form>
            <SignUpFields>
              <TextField 
                name='username' 
                value={form.username}
                onChange={handleChange}
                variant='outlined' 
                label='Nome de usuário'
              />

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
                }} />
            </SignUpFields>
            <Button type='submit' onClick={onClickRegister} variant='contained' >Cadastrar</Button>
          </Form>
						<Button onClick={() => history.goBack()}>Voltar para login</Button>

				</SignUpContainer>
      </HalfScreen>
		</FullContainer>
	)
}

export default SignUpPage