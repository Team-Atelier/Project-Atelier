import React from 'react';
import ExperienceTableRow from './ExperienceTableRow.jsx';

function ExperienceTable({ newReviewData, handleNewReviewChange }) {
  return (
    <table className="rating">
      <caption>
        Your Experience
      </caption>
      <thead>
        <tr>
          <th scope="col">Characteristic</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
        </tr>
      </thead>
      <tbody>
        <ExperienceTableRow name="Size" descriptions={['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
        <ExperienceTableRow name="Width" descriptions={['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
        <ExperienceTableRow name="Comfort" descriptions={['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
        <ExperienceTableRow name="Quality" descriptions={['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
        <ExperienceTableRow name="Length" descriptions={['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
        <ExperienceTableRow name="Fit" descriptions={['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']} newReviewData={newReviewData} handleNewReviewChange={handleNewReviewChange} />
      </tbody>
    </table>
  );
}

export default ExperienceTable;