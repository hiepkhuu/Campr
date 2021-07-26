import React, {useEffect, useState} from 'react';
import { useHistory, Redirect, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Comments.css';
import { getComments, editComment ,uploadComment, deleteComment} from '../../store/comments'
// import CommentEditModal from '../../context/CommentEditModal';// for MODAL

const Comments = () =>{
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const [comment, setComment]= useState('')
  const [commentToDeleteId, setCommentToDeleteId] = useState('')
  const [editedComment, setEditedComment] = useState('')
  const [editedCommentId, setEditedCommentId] = useState('')
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  let {id} = useParams()
  id = Number(id)


  const comments = useSelector(state =>{
    return Object.values( state.comments)
  })

  // const filteredComments = comments.filter(eachComment => eachComment.userId === sessionUser.id)
  const filteredComments = comments.filter(eachComment => eachComment.photoId === id)


  useEffect(()=>{
    dispatch(getComments(id))

    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('submit', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch,id, showMenu])


  if(!comments) return null;

  if(!sessionUser){
    return(
      <Redirect to='/login' />
    )
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const commentData = {
      comment: comment,
      userId: sessionUser.id,
      photoId: id
    }
      const newComment = await dispatch(uploadComment(commentData))
      if (newComment){
        setComment('')
      }
    }

    const handleEditSubmit = async (e)=>{
      e.preventDefault();
      const editData = {
        comment: editedComment,
        userId: sessionUser.id,
        photoId: id,
        id: editedCommentId
      }
        const newComment = await dispatch(editComment(editData))
        if (newComment){
          setEditedComment('')
          console.log(newComment)
          // history.push(`/photos/${Number(id)}}`)
        }
      }

  const handleDelete = async (e)=>{
    e.preventDefault()
    await dispatch(deleteComment(commentToDeleteId))

  }



  return(
    <div>
      <div clsssName='comment-container'>
        {filteredComments.map((comment)=>(
          <div className='comment-box'>
          <div className='comment-box-username'>
            <Link className='user-link' to={`/${comment.User?.username}/${comment.userId}`}>{comment.User?.username}</Link>
          </div>
          <div className='comment-content'>
            <p>{comment.comment}</p>
            <div className='modify-section'>
              <form onSubmit={handleDelete} hidden={comment.userId !== sessionUser.id}>
                <button className='trash-icon' type='submit' onClick={e=> setCommentToDeleteId(comment.id)}>
                {/* <i class="fas fa-trash-alt"></i> */}
                delete
                </button>

                {/* <CommentEditModal /> */}
                {/* <EditSingleComment /> */}
                <div>

                </div>
              </form>
              <button  className='edit-icon'hidden={comment.userId !== sessionUser.id} onClick={openMenu}>
                {/* <i class="far fa-edit"></i> */}
                edit
              </button>
            </div>

              <div className='edit-form-container'>
                  {showMenu && (
                    <form className='comment-edit-form' onSubmit={handleEditSubmit} hidden={comment.userId !== sessionUser.id}>
                      <textarea
                      placeholder=''
                      type='textarea'
                      value={editedComment}
                      onChange={e => setEditedComment(e.target.value)}
                      style={{width:200}}
                      ></textarea>
                      <button type='submit' onClick={e=> setEditedCommentId(comment.id)}>submit</button>
                    </form>
                  )}
              </div>

          </div>
          </div>
        ))}

      </div>
      <div>
        <form className='comment-form' onSubmit={handleSubmit}>
            <textarea placeholder='Add a comment'
            type='textarea'
            value={comment}
            onChange={e => setComment(e.target.value)}
            style={{width:480,height: 100}}
            ></textarea>
            <button onClick={handleSubmit}>Comment</button>
        </form>

      </div>
    </div>
  )
}

export default Comments;
