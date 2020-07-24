export const initialState = {
  userInfo: [],
  posts: [],
  comments: []
}

export const storeDataReducer = (state, action) => {
  switch(action.type){
    case 'SET_USER_INFO':
      const info = action.info
      return {...state, userInfo: info}

    case 'SET_POSTS':
      const post = action.posts
      return {...state, posts: post}
    
    case 'SET_COMMENTS':
      const comment = action.comments
      return {...state, posts: comment}
    
      default:
        return state
  }
}