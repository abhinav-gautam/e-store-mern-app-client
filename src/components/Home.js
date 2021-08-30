import Footer from './Footer';
import FooterOptions from './FooterOptions';
import HomeCarousel from './HomeCarousel';
import ProductCards from './ProductCards';

const Home = () => {
    return (
        <div className="parent">

            {/* Carousel */}
            <HomeCarousel />

            {/* Cards Grid */}
            <div className="container-fliud w-75 mx-auto">
                <div className="row mt-5">
                    <h2>Today's Deals</h2>
                    <ProductCards />
                </div>
            </div>

            {/* Footer */}

            <FooterOptions />
            <Footer />
        </div >


    );
}

export default Home;