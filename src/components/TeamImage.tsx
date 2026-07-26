import React, {useState, useEffect, useRef} from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import './TeamImage.css';

type Member = {
    name: string;
    role: string;
    image? : string | null
};
type TeamImageProps = {
    id: string;
    title: string;
    tagline: string;
    members: Member[];
    useCarousel?: boolean;
    itemsPerSlide?: number;
    rowPerSlide?: number
};

function TeamImage({id, title, tagline, members, useCarousel = true, itemsPerSlide = 3, rowPerSlide = 1}:TeamImageProps) {
    const itemsPerPage = itemsPerSlide * rowPerSlide;
    const totalSlides = Math.ceil(members.length / itemsPerPage);
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () =>
        setCurrentSlide((prev) => (prev+1)%totalSlides)
    const prevSlide = () =>
        setCurrentSlide((prev) => (prev-1+totalSlides) %totalSlides)
    
    const getSlideMembers = (index:number) =>
        members.slice(
            index*itemsPerPage,
            index*itemsPerPage+itemsPerPage
        );
    const slideMembers = getSlideMembers(currentSlide);

    //Get image FUnction:
    const resolveImage = (name: string) => {
        if (!name) return "/images/team_images/default.png";   // fallback
        const formatted = name.toLowerCase().replace(/\s+/g, "_");
        const extensions = ["png", "jpg", "jpeg"];
        for (const ext of extensions) {
            try {
                return require(`../images/team_images/${formatted}.${ext}`);
            } catch {}
        }
        return "/images/team_images/default.png";
        };
        
    return(
        <div className='team-wrapper' id={id}>
            <div className='team-title'>{title}</div>
            <div className='team-tagline'>{tagline}</div>

            {/*Carousel*/}
            {useCarousel ? (
                <div className='carousel-wrapper'>
                    <button className="carousel-btn" onClick={prevSlide}>
                        <ArrowLeftIcon />
                    </button>

                    <div className='carousel-slide'>
                        {Array.from({length: rowPerSlide}).map((_,rowIndex) => {
                            const rowItems = slideMembers.slice(
                                rowIndex * itemsPerSlide,
                                (rowIndex + 1) * itemsPerSlide
                            );

                            return(
                                <div className='team-row' key={`row-${rowIndex}`}>
                                    {rowItems.map((m, idx) => (
                                        <div className='team-card' key={`item-${rowIndex}-${idx}`}>
                                            <img
                                                src={resolveImage(m.image || m.name)} 
                                                alt={m.name} 
                                                loading="lazy"
                                            />
                                            <div className='member-name'>{m.name}</div>
                                            <div className='member-role'>{m.role}</div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <button className='carousel-btn' onClick={nextSlide}>
                        <ArrowRightIcon/>
                    </button>
                </div>
            ):(
                // no carousel: show full grid
                <div className='grid-wrapper'>
                    {members.map((m, idx) => (
                        <div className='team-card' key={idx}>
                            <img src={resolveImage(m.image || m.name)} alt={m.name} loading='lazy'/>
                            <div className='member-name'>{m.name}</div>
                            <div className='member-role'>{m.role}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default TeamImage;

