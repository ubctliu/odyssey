import Image from "next/image";

const Banner = () => {
    const mountains = "/images/mountainsBanner.png";
    const logo = "/images/odysseylogonew.png";

    return (
        <section className="relative w-screen h-full bg-banner bg-center mx-0">
            <div className="relative w-screen h-full overflow-hidden">
                <img
                className="animate-zoomInOut overflow-hidden" 
                src={mountains} 
                style={{ 
                    width: '100%', 
                    filter: 'grayscale(100%) saturate(0%) sepia(1) hue-rotate(197.768deg) saturate(104%) brightness(40%)', 
                     background: 'linear-gradient(to right, rgba(37, 38, 58, 0.6), rgba(37, 38, 58, 0.6)',
                    transformOrigin: 'center'
                    }}
                alt='A mountain background'/>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 z-10 resize">
                <Image src={logo}
                width={300}
                height={300}
                alt="Odyssey Logo"
                className="mx-auto"
                />
                </div>
        </section>
    )
}

export default Banner;