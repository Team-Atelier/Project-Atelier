import React, {useState, useEffect} from 'react'
import ReviewTile from './ReviewTile.jsx'
const Reviews = ()=>{



    let review = {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": true,
      "response": "We are glad that you like our product!",
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
        // ...
      ]
    }

  return <ReviewTile review = {review}/>



}
export default Reviews;