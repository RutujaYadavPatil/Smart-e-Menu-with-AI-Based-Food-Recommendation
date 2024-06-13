import React, { useState } from 'react';
import burger from '../images/burger.jpg';
import Pizza from '../images/pizza.jpg';
import roll from '../images/roll.jpg';
import logo from '../images/logo.jpg';

// Images
const images = [Pizza, burger, roll, logo];

// Gallery component
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (index) => {
    if (selectedImage !== images[index]) {
      setSelectedImage(images[index]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginTop: '20px', position: 'relative' }}>
        Image Gallery
        <span style={{ display: 'inline-block', width: 'auto', height: '2px', backgroundColor: 'lightgreen', position: 'absolute', bottom: '-2px', left: 0, right: 0 }}></span>
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <img key={index} src={image}  onClick={() => handleSelect(index)} style={{ cursor: 'pointer', width: '250px', height: '250px', objectFit: 'cover', margin: '0 10px' }} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
