import React from 'react';
import Carousel from 'react-material-ui-carousel';

type ImageItem = {
    name?: string;
    url: string;
};

type ImageCarouselProps = {
    items: ImageItem[];
};

function ImageCarousel({ items }: ImageCarouselProps) {

    return (
        <div>
            <Carousel
                autoPlay={false}
                navButtonsProps={{
                    style: {
                        height: '40px',
                        width: '40px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        color: 'white'
                    }
                }}
                indicatorIconButtonProps={{
                    style: {
                        padding: '4px',
                        color: '#C9CDD6'
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#2F6BFF'
                    }
                }}
            >
                {items.map((item, i) => (
                    <div key={i} className='faq-video-wrapper'>
                        <img
                            src={item.url}
                            alt={item.name || `Slide ${i + 1}`}
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                display: 'block'
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageCarousel;