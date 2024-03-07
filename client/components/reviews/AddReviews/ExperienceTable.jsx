import React from 'react';
import ExperienceTableRow from './ExperienceTableRow.jsx';

const descriptions = {
  size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
  width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
  comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
  quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
  length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
  fit: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
};

function ExperienceTable({ newReviewData, handleNewReviewChange, metadata }) {
  const { characteristics } = metadata || {};
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
        {Object.keys(characteristics || []).map(
          (characteristic) => {
            const desc = descriptions[characteristic.toLowerCase()] || [1, 2, 3, 4, 5];
            return (
              <>
                <button onClick={() => {console.log(characteristics[characteristic].id)}}> Test </button>
                <ExperienceTableRow
                  key={characteristics[characteristic].id}
                  id={characteristics[characteristic].id}
                  name={characteristic}
                  descriptions={desc}
                  newReviewData={newReviewData}
                  handleNewReviewChange={handleNewReviewChange}
                />
              </>
            );
          },
        )}
      </tbody>
    </table>
  );
}

export default ExperienceTable;
