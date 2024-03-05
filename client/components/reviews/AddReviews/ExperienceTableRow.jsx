/* eslint-disable react/prop-types */
import React from 'react';

function ExperienceTableRow({
  name, descriptions, newReviewData, handleNewReviewChange,
}) {
  const change = (e) => {
    handleNewReviewChange(e);
  };
  return (
    <tr>
      <td>{name}</td>
      { descriptions.map((des, index) => (
        <td key={index}>
          <label htmlFor={name.toLowerCase()}>
            {des}
            <input className="charSelect" type="radio" name={name.toLowerCase()} value={index + 1} onChange={(e) => { change(e); }} checked={newReviewData.name} />
          </label>
        </td>
      ))}
    </tr>
  );
}
export default ExperienceTableRow;
