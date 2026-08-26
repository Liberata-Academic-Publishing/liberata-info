import React, {useState} from 'react';
import Carousel from 'react-material-ui-carousel';

function FAQCarousel() {
  const items = [
    {
        name: "Do contribution shares have financial value?",
        url: "https://pub-c93f131df06d44f88212bf9bdb396d2c.r2.dev/Q1_Chloe_Final.mp4"
    },
    {
        name: "Can I trade my shares on papers?",
        url: "https://pub-c93f131df06d44f88212bf9bdb396d2c.r2.dev/Q2_Dr_Brinson_Final.mp4"
    },
    {
        name: "What are relative citations?",
        url: "https://pub-c93f131df06d44f88212bf9bdb396d2c.r2.dev/Q3_Imani_Final.mp4"
    }
  ];

  return (
    <div>
       <Carousel 
        autoPlay={false}
        // Change the sizing and radius of nav buttons
        navButtonsProps={{          
        style: {
            height: '40px',
            width: '40px',
            borderRadius: '20px',
        }
        }} >
          {
            items.map((item, i) => (
            <div className='faq-video-wrapper'>
              <video key={i} src={item.url} className="faq-video" style={{ borderRadius: '10px'}} width="100%" controls muted/>
            </div>
            ))}
        </Carousel>
    </div>
  )
}

export default FAQCarousel