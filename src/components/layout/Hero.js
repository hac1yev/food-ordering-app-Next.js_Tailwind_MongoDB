import Image from "next/image";
import Right from "../icons/Right";

const Hero = () => {
    return (
        <section className="grid grid-cols-2 my-3">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything is better with
                    <span className="text-primary"> Pizza</span>
                </h1>
                <p className="my-4 text-gray-500 text-sm">Pizza is the missing piece that makes every day complet, a single yet delicious joy in life</p>
                <div className="flex items-center gap-4 text-sm">
                    <button className="flex max-w-40 gap-2 items-center uppercase bg-primary text-white px-4 py-2 rounded-full">
                        Order now
                        <Right />
                    </button>
                    <button className="border-0 max-w-40 flex py-2 gap-2 text-gray-600 font-semibold">
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} layout="fill" objectFit="contain" alt="pizza" />
            </div>
        </section>
    );
};

export default Hero;