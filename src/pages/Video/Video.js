import React from 'react'
import { useParams } from 'react-router-dom';
import { PlayVideo } from '../../components/PlayVideo/PlayVideo';
import { RecommendedVids } from '../../components/RecommendedVids/RecommendedVids';
import './video.css';

export const Video = () => {

    const {videoId, categoryId} = useParams();

  return (
    <div className='play-container'>
        <PlayVideo videoId={videoId} categoryId={categoryId} />
        <RecommendedVids categoryId={categoryId }/>
        
    </div>
  )
}
