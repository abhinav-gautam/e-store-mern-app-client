import carouselImage from '../media/carouselImage.jpg'


const HomeCarousel = () => {
    return (
        <div className="container-fluid">
            <div className="carousel slide carousel-fade" data-bs-ride="carousel" id="cr">

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button data-bs-target="#cr" data-bs-slide-to="0" className="active"></button>
                    <button data-bs-target="#cr" data-bs-slide-to="1"></button>
                    <button data-bs-target="#cr" data-bs-slide-to="2"></button>
                </div>

                {/* Carousel Content */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={carouselImage} alt="" className="w-100" height="600px" />
                        <div className="carousel-caption text-dark">
                            <h2>Fresh Vegetables</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={carouselImage} alt="" className="w-100" height="600px" />
                        <div className="carousel-caption text-dark">
                            <h2>Latest Gadgets</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={carouselImage} alt="" className="w-100" height="600px" />
                        <div className="carousel-caption text-dark">
                            <h2>Sale!!!</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <button className="carousel-control-prev" data-bs-target="#cr" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" data-bs-target="#cr" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>
        </div>
    );
}

export default HomeCarousel;
