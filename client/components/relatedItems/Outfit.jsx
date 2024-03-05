import React, { useState, useEffect } from 'react';

const Outfit = function Outfit() {

  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    const userOutfit = JSON.parse(localStorage.getItem('outfitList'));
    if (userOutfit) {
      setOutfit(userOutfit);
    }
  })

  return (
    
  )
};

export default Outfit;
