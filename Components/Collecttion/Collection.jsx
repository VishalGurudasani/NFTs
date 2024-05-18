"use client"
import React, { useState } from 'react';
import Style from './Collecion.module.css';
import { BsFillAlarmFill,BsFillCalendarDateFill,BsCalendar3, BsCalendarDateFill } from 'react-icons/bs';
import DaysComponent from './DaysComponent/DaysComponent';
const Collection = () => {
    const [popular,setPopular] = useState(true);
    const [following,setFollowing] = useState(false);
    const [news,setNews] = useState(false);

    const CardArray = [1,2,3,4,5,6,7,8];
    const followingArray = [1,2,3,4];
    const newsArray = [1,2,3,4,5,6];

    const openPopular = ()=>{
        if(!popular){
            setPopular(true);
            setFollowing(false);
            setNews(false);
        }
    }

    const openFollower = ()=>{
        if(!following){
            setPopular(false);
            setFollowing(true);
            setNews(false);
        }
    }
    const openNews = ()=>{
        if(!news){
            setPopular(false);
            setFollowing(false);
            setNews(true);
            
        }
    }

  return (
    <div className={Style.collection}>
        <div className={Style.collection_title}>
            <h2>Top List Creators</h2>
            <div className={Style.collection_collections}>
                <div className={Style.collection_collections_btn}>
                    <button onClick={()=>openPopular()}>
                        <BsFillAlarmFill/> last 24 hrs
                    </button>
                    <button onClick={()=>openFollower()}>
                        <BsCalendar3/>last 7 days
                    </button>
                    <button onClick={()=>openNews()}>
                        <BsCalendarDateFill/>last month
                    </button>
                    
                </div>
            </div>
        </div>
        {
            popular && (
                <div className={Style.collection_box}>
                    {CardArray.map((el,i)=>(
                        <DaysComponent key = {i}/>
                    ))}
                </div>
            )
        }
        {
            following && (
                <div className={Style.collection_box}>
                    {followingArray.map((el,i)=>(
                        <DaysComponent key = {i}/>
                    ))}
                </div>
            )
        }
        {
            news && (
                <div className={Style.collection_box}>
                    {newsArray.map((el,i)=>(
                        <DaysComponent key = {i}/>
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default Collection;