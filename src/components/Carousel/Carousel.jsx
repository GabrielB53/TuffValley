import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../../assets/images/salao.jpeg';
import ExampleCarouselImage2 from '../../assets/images/SalaArtes.jpeg';
import ExampleCarouselImage3 from '../../assets/images/recepcao.jpeg';
import './CarouselStyle.css'

function CustomCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='width-100 height-100'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={ExampleCarouselImage} alt="Slide 1"  className='img'/>
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={ExampleCarouselImage2} alt="Slide 2" className='img' />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
            <Carousel.Item>
        <img src={ExampleCarouselImage3} alt="Slide 3" className='img' />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CustomCarousel;
