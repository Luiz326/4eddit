import React, { useState, useEffect } from 'react'
import { CardContainer, InfoBars, ContentContainer, BottomDetails } from '../../Styled'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import Skeleton from 'react-loading-skeleton'
import api from '../../Utils/Api/Api'
import { useParams } from 'react-router-dom'

const CommentsCard = (props) => {

  const comment = props.comment
  const [ isLoading, setIsLoading ] = useState(true)
  const token = localStorage.getItem('token')
  const { postId } = useParams()
  const vote = comment.userVoteDirection

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)

  },[])

  const handleVote = async(decision, id) => {

    const axiosConfig = { headers: { Authorization: token } };

    const body = {
      direction: decision ? 1 : -1
    };
  
      await api.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${postId}/comment/${id}/vote`, body, axiosConfig)
      props.getDetails()
    }; 

		return(
      <CardContainer>
        <InfoBars>
          <Typography variant='h5'>{ isLoading ? <Skeleton width={200} height={'auto'} /> : comment.username}</Typography>
        </InfoBars>
        <ContentContainer>
          <Typography variant='h5'>{isLoading ? <Skeleton /> : comment.title}</Typography>
          <Typography variant='h6'>{isLoading ? <Skeleton /> : comment.text}</Typography>
        </ContentContainer>
        <InfoBars>
          <BottomDetails>
            <ArrowUpward
              onClick={() => handleVote(true, comment.id)}
              style={{color: vote === 1 ? '#00FF00' : '#000000'}}
            />
            <Typography>{isLoading ? <Skeleton width={20} height={16} /> : comment.votesCount}</Typography>
            <ArrowDownward
              onClick={() => handleVote(false, comment.id)}
              style={{color: vote === -1 ? '#FF0000' : '#000000'}}
            />
          </BottomDetails>
        </InfoBars>
      </CardContainer>
		)
}

export default CommentsCard;
