import { Carousel } from "react-bootstrap"


const CarouselHome = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d block w-100"
                    style={{ maxHeight: "500px", objectFit: 'cover' }}
                    src="imagenes/home.webp"
                    alt="slide3"
                />

            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d block w-100"
                    style={{ maxHeight: "500px", objectFit: 'cover' }}
                    src="imagenes/imagen_1.webp"
                    alt="slide3"
                />

                <Carousel.Caption>
                    <h3>"Explorando rincones, descubriendo historias."</h3>
                    <p>"No cuentes los días, haz que los días cuenten."</p>
                </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
                <img
                    className="d block w-100"
                    style={{ maxHeight: "500px", objectFit: 'cover' }}
                    src="imagenes/imagen_2.webp"
                    alt="slide3"
                />

                <Carousel.Caption >
                    <h3>"Rincones que inspiran, viajes que transforman."</h3>
                    <p>"Descubre el mundo fuera de tu zona de confort."</p>
                </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
                <img
                    className="d block w-100"
                    style={{ maxHeight: "500px", objectFit: 'cover' }}
                    src="imagenes/imagen_3.webp"
                    alt="slide3"
                />

                <Carousel.Caption>
                    <h3>"Donde los rincones se convierten en destinos inolvidables."</h3>
                    <p>"Viajar es la mejor forma de aprender sobre la vida, la cultura y sobre ti mismo."</p>
                </Carousel.Caption>
            </Carousel.Item>




        </Carousel>
    )
}

export default CarouselHome