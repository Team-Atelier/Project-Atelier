/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function Outfit() {
  const [outfit, setOutfit] = useState([]);

  useEffect(() => {
    const userOutfit = JSON.parse(localStorage.getItem('outfitList'));
    if (userOutfit) {
      setOutfit(userOutfit);
    }
  });

  return (
    <div />
  );
}
