import React, { useEffect, useState } from "react";
import "./playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, valueConverter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

export const PlayVideo = () => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const {videoId} = useParams();

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setComments(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData?.snippet?.channelId) {
      fetchOtherData();
    }
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video controls autoPlay muted src={video1}></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="playvideo-info">
        <p>
          {apiData ? valueConverter(apiData.statistics.viewCount) : "16K"}{" "}
          &bull; {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {valueConverter(apiData?.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
            {apiData?.statistics.dislikeCount}
          </span>
          <span>
            <img src={share} alt="" />
            {apiData?.statistics.shareCount}
          </span>
          <span>
            <img src={save} alt="" />
            {apiData?.statistics.saveCount}
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet.thumbnails.default.url} alt="" />
        <div>
          <p>{apiData?.snippet.channelTitle}</p>
          <span>{valueConverter(channelData?.statistics.subscriberCount)}</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-desc">
        <p>{apiData?.snippet.description}</p>
        <hr />
        <h4>{valueConverter(apiData?.statistics.commentCount)} Comments</h4>
        {comments.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                </h3>
                <p>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                </p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{valueConverter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
