import React, { useEffect } from 'react';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePhoto } from '../../store/photos';
import Comments from './Comments.js'
import EditPhotoModal from '../../context/EditPhotoModal';// for MODAL

import './PhotoDetail.css'
import './Comments.css'


const PhotoDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  id = Number(id)

  const sessionUser = useSelector(state => state.session.user)
  const singlePhoto = useSelector(state => state.photos[id]);


  useEffect(() => {
    dispatch(getSinglePhoto(id))
    dispatch(getComments(id))
  }, [dispatch])

  if (!sessionUser) {
    return (
      <Redirect to='/login' />
    )
  }


  if (!singlePhoto) {
    return null;
  }

  const directToEditPage = () => {
    history.push(`/edit/${singlePhoto.id}`)
  }



  let showEditButton;
  if (singlePhoto.userId === sessionUser.id) {
    showEditButton = (
      <div className='edit-photo-button' >
        < EditPhotoModal />
      </div>
    )
  }


  return (
    <div className='singlephoto-detail-page'>
      <div className='singlephoto-container'>
        <div className='explore-link'>
          <Link className='explore-link link' to='/explore'>Back to Explore</Link>
          {/* <Link to={`/photos/${singlePhoto.id - 1}`}> previous </Link> */}
        </div>
        <div className='single-photo'>
          <img src={singlePhoto.imageUrl}></img>

        </div>
        {showEditButton}
        {/* <div className='btn-edit'>
            <Link
            className='btn-edit link'
            to={`/edit/${singlePhoto.id}`}
            hidden={singlePhoto.userId !== sessionUser.id}
            >Edit Photo</Link>
        </div> */}
      </div>

      <div className='photo-detail-container'>
        <div className='photo-details'>
          <div className='details-header'>

            <div>
              <Link className='user-link-header' to={`/${singlePhoto.User?.username}/${singlePhoto.userId}`}>{singlePhoto.User?.username}</Link>
            </div>
            <div>
              <h4 className='photo-title'>{singlePhoto.title}</h4>
            </div>
            <div>
              <p className='photo-description'>{singlePhoto.description}</p>
            </div>
          </div>
          <div className='comment-container'>
            <Comments />
          </div>
        </div>
        <div className='photo-stats-column'>
          <div className='photo-stats'>
            <span>0</span>
            <p>faves</p>

          </div>
          <div className='photo-stats-comments'>
            <span>0</span>
            <p>comments</p>

          </div>

        </div>
      </div>


    </div>

  )
}

export default PhotoDetail;
