import React from 'react'
import Style from './Subscribe.module.css'
import { RiSendPlaneFill } from 'react-icons/ri'
import Image from 'next/image'
import Images from '../../img'

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
        <div className={Style.subscribe_box}>
            <div className={Style.subscribe_box_left}>
                <h2>Never Miss a Drop</h2>
                <p>Subscribe to our super exclusive drop list and be the first person to know about upcoming drops</p>
                <div className={Style.subscribe_box_left_box}>
                    <span>01</span>
                    <small>Normal</small>
                </div>
                <div className={Style.subscribe_box_left_box}>
                    <span>02</span>
                    <small>Premium</small>
                </div>

                <div className={Style.subscribe_box_left_input}>
                    <input type="email" placeholder='Enter Email' />
                    <RiSendPlaneFill className={Style.subscribe_box_left_input_icon}/>
                </div>
            </div>

            <div className={Style.subscribe_box_right}>
                <Image src={Images.update} alt='get update' height={600} width={800}/>
            </div>
        </div>
    </div>
  )
}

export default Subscribe