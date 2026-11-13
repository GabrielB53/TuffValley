
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import SalaoImage from '../../assets/images/salao.jpeg';
import SalaArtesImage from '../../assets/images/SalaArtes.jpeg';
import RecepcaoImage from '../../assets/images/recepcao.jpeg';

import './CarouselStyle.css';

const slides = [
    {
        imagem: SalaoImage,
        alt: 'Ambiente do salão da TuffValley',
        categoria: 'NOSSOS AMBIENTES',
        titulo: 'Um espaço para desacelerar.',
        descricao:
            'Encontre um ambiente acolhedor para aproveitar o tempo, descansar e viver novas experiências.'
    },
    {
        imagem: SalaArtesImage,
        alt: 'Ambiente dedicado às atividades artísticas',
        categoria: 'CRIATIVIDADE E EXPRESSÃO',
        titulo: 'Descubra novas possibilidades.',
        descricao:
            'Explore sua criatividade, experimente atividades diferentes e permita-se aprender algo novo.'
    },
    {
        imagem: RecepcaoImage,
        alt: 'Recepção e entrada da TuffValley',
        categoria: 'SEJA BEM-VINDO',
        titulo: 'Sua experiência começa aqui.',
        descricao:
            'Um ambiente pensado para receber você e proporcionar momentos longe da rotina digital.'
    }
];

function CustomCarousel() {
    const [index, setIndex] = useState(0);

    return (
        <section className="tuff-carousel" aria-label="Conheça os ambientes da TuffValley">

            <Carousel
                activeIndex={index}
                onSelect={setIndex}
                interval={5000}
                pause="hover"
                wrap
                touch
                fade
                indicators
                controls
                className="tuff-carousel-inner"
            >
                {slides.map((slide, i) => (
                    <Carousel.Item key={slide.titulo}>
                        <div className="tuff-carousel-image-wrapper">
                            <img
                                src={slide.imagem}
                                alt={slide.alt}
                                className="tuff-carousel-image"
                            />

                            <div className="tuff-carousel-overlay" />

                            <Carousel.Caption className="tuff-carousel-caption">
                                <span className="tuff-carousel-category">
                                    {slide.categoria}
                                </span>

                                <h3>{slide.titulo}</h3>

                                <p>{slide.descricao}</p>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <div className="tuff-carousel-footer">
                <span className="tuff-carousel-counter">
                    <strong>0{index + 1}</strong>
                    <span className="tuff-carousel-counter-divider">/</span>
                    0{slides.length}
                </span>

                <span className="tuff-carousel-footer-text">
                    DESCUBRA A TUFFVALLEY
                </span>
            </div>

        </section>
    );
}

export default CustomCarousel;
