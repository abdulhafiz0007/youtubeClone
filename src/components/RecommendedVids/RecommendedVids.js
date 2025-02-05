import React, { useEffect, useState } from "react";
import "./recommendedVids.css";
import { API_KEY, valueConverter } from "../../data";
import { Link } from "react-router-dom";


export const RecommendedVids = ({ categoryId }) => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    const relatedVidoe_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVidoe_url)
      .then((res) => res.json())
      .then((data) => setCategoryData(data.items));
  };

  useEffect(() => {
    if(categoryId) {
        fetchData();
    }
  }, []);

  return (
    <div className="recommended">
      {categoryData.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="video-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{valueConverter(item.statistics.viewCount)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
