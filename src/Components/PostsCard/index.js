import React, { useEffect, useState } from "react";
import {
  CardContainer,
  InfoBars,
  ContentContainer,
  BottomDetails,
} from "../../Styled";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import api from "../../Utils/Api/Api";

const PostCard = (props) => {

  const postInfo = props.post;
  const history = useHistory();
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const vote = postInfo.userVoteDirection
 
  const token = localStorage.getItem('token')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const goToDetails = (id) => {
    history.push(`/posts/${id}`);
  };

  const handleVote = async(decision, id) => {

    const axiosConfig = { headers: { Authorization: token } };

    const body = {
      direction: decision ? 1 : -1
    };

    await api.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`, body, axiosConfig)
    if(props.isDetails){
      props.getDetails()
    }else {
      props.getPosts()
    }
  };  

  return (
    <CardContainer>
      <InfoBars>
        <Typography variant="h5">
          {isLoading ? (
            <Skeleton height={"auto"} width={200} />
          ) : (
            postInfo.username
          )}
        </Typography>
      </InfoBars>
      <ContentContainer>
        <Typography variant="h5">
          {isLoading ? <Skeleton width={200} /> : postInfo.title}
        </Typography>
        <Typography variant="h6">
          {isLoading ? <Skeleton width={200} /> : postInfo.text}
        </Typography>
      </ContentContainer>
      <InfoBars>
        <BottomDetails>
          <ArrowUpward
            onClick={() => handleVote(true, postInfo.id)}
            style={{color: vote === 1 ? '#00FF00' : '#000000'}}
          />
          <Typography>
            {isLoading ? (
              <Skeleton height={16} width={20} />
            ) : (
              postInfo.votesCount
            )}
          </Typography>
          <ArrowDownward
            onClick={() => handleVote(false, postInfo.id)}
            style={{color: vote === -1 ? '#FF0000' : '#000000'}}
          />
        </BottomDetails>
        <BottomDetails>
          {postId ? (
            <Typography>
              {isLoading ? (
                <Skeleton height={16} width={20} />
              ) : (
                postInfo.commentsCount
              )}{" "}
              comentários
            </Typography>
          ) : (
            <Typography onClick={() => goToDetails(postInfo.id)}>
              {isLoading ? (
                <Skeleton height={16} width={20} />
              ) : (
                postInfo.commentsCount
              )}{" "}
              comentários
            </Typography>
          )}
        </BottomDetails>
      </InfoBars>
    </CardContainer>
  );
};

export default PostCard;
