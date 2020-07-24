import React from 'react'
import { CardContainer, InfoBars, ContentContainer, Text, TextArea } from '../../Styled'
import { Typography } from '@material-ui/core'
import { useForm } from '../../Hooks/UseForm'
import api from '../../Utils/Api/Api'
import { useParams } from 'react-router-dom'


const CommentPostCreate = (props) => {

  const { postId } = useParams()

  const { form, onChange, clear } = useForm({
    title:'',
    text: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  const postBody = {
    title: form.title,
    text: form.text
  }

  const commentBody = {
    text: form.text
  }

  const isPost = props.isPost

  const axiosConfig = {
    headers: {
      Authorization: props.token
    }
  }


  const handleData = async() => {
    clear()
    if(isPost){
      await api.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts', postBody, axiosConfig)
      props.getPosts()
    } else {
      await api.post(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${postId}/comment`, commentBody, axiosConfig)
      props.getDetails()
    }
  }

  return (
    <CardContainer>
        <ContentContainer>
          <Typography>{props.question}</Typography>
          {isPost ?
          <Text isPost={isPost} name='title' placeholder='Escreva aqui o titulo...' value={form.title} onChange={handleChange}/> :
          null
          }
          <TextArea name='text' placeholder='Escreva aqui....' value={form.text} onChange={handleChange}>kkkk</TextArea>
        </ContentContainer>
        <InfoBars>
            <Typography 
              align='center'
              onClick={handleData}>{props.name}</Typography>
        </InfoBars>
      </CardContainer>
  );
}

export default CommentPostCreate
