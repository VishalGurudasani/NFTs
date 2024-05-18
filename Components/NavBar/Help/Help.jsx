import React from 'react'
import Style from './Help.module.css'
import Link from "next/link";

const Help = () => {
  const help =[{
    name:"About",
    link:"about"
  },
  {
    name:"Contact Us",
    link:"contact-us"
  },
  {
    name:"Sign Up",
    link:"sign-up"
  },
  {
    name:"Login",
    link:"login"
  },
  {
    name:"Subscription",
    link:"subscription"
  }
]
  return (
    <div className={Style.box}>
      {help.map((el,i)=>(
        <div key={i} className={Style.help}>
          <Link href ={{pathname:`${el.link}`}}>{el.name}</Link>
        </div>
      ))}

    </div>
  )
}

export default Help