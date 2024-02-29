import React from 'react';
import styled from 'styled-components';
import StarRating from './starRating.jsx'

const Title = styled.h1`
  margin: 0px;
  font-family: Helvetica, Sans-Serif;
  font-size: 1.5em;
  text-align: left;
  color: #BF4F74;
`;

const FlexRow = styled.section`
  display: flex;
  justify-content: space-between;
  background: papayawhip;
`;

const MainBox = styled.section`
  padding-left: 0em;
  padding-right: 0em;
  margin-left: 20em;
  margin-right: 20em;
  background: papayawhip;
  border-bottom: .25rem solid
`;

const ResponseBox = styled.section`
  display: inline-block;
  justify-content: space-between;
  padding-left: 0em;
  padding-right: 0em;
  margin-left: 5em;
  margin-right: 5em;
  padding-left: 0%;
  padding-right: 70%;
  background: grey !important;
`;

const Right = styled.section`
display: inline-block;
`

const ReviewTile = ({})=>{

  return (
    <article className = "reviewTile">
      <MainBox>
      <FlexRow>
      <div className = "left"><StarRating/></div>
      <Right><aside className = "username">{`[Username]`} 04 March 2018</aside></Right>
      </FlexRow>
      <FlexRow><Title>Review title</Title></FlexRow>
      <FlexRow>Review summary</FlexRow>
      <FlexRow>...summary continued (if nessessary)</FlexRow>
      <br/>
      <FlexRow>Review body</FlexRow>
      <br/>
      <FlexRow>✓ I recommend this product</FlexRow>
      <br/>
      <br/>
      <FlexRow><ResponseBox>Response: <br/>
      Response here</ResponseBox></FlexRow>
      <br/>
      <FlexRow>Was this review helpful? (Yes 10) | Report</FlexRow>


      </MainBox>
    </article>
  )
}

export default ReviewTile;