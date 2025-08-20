import React from 'react'
import './NewsLetter.css'
export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className="newsletter-form">
        <input
          type="email"
          className="newsletter-input"
          placeholder="Your Email ID"
        />
        <button>Subscribe</button>
      </div>
    </div>

  )
}
export default NewsLetter