import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/crousal.css'; // Import your CSS file for styling

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slide-content">
          <h2>Slide 1</h2>
          <button onClick={() => ('Button clicked on Slide 1')}>Click Me</button>
        </div>
        <div className="slide-content">
          <h2>Slide 2</h2>
          <button onClick={() => console.log('Button clicked on Slide 2')}>Click Me</button>
        </div>
        <div className="slide-content">
          <h2>Slide 3</h2>
          <button onClick={() => console.log('Button clicked on Slide 3')}>Click Me</button>
        </div>
        <div className="slide-content">
          <h2>Slide 4</h2>
          <button onClick={() => console.log('Button clicked on Slide 4')}>Click Me</button>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default Carousel;
