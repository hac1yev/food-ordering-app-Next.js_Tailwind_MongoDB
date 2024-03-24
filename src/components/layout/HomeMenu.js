import Image from "next/image";
import MenuItems from "../menu/MenuItems";
import SectionHeaders from "./SectionHeaders";

const HomeMenu = () => {
    return (
        <section>
            {/* <div className="relative">
                <div className="absolute -left-12 w-48 h-48">
                    <Image src={'/sallad1.png'} layout="fill" objectFit="contain" alt="sallad" />
                </div>
                <div className="absolute -right-12 w-48 h-48">
                    <Image src={'/sallad2.png'} layout="fill" objectFit="contain" alt="sallad" />
                </div>
            </div> */}
            <SectionHeaders subHeader={'Check Out'} mainHeader={"Menu"} />
            <div className="grid grid-cols-3 gap-4">
                <MenuItems />
                <MenuItems />
                <MenuItems />
                <MenuItems />
                <MenuItems />
                <MenuItems />
            </div>
        </section>
    );
};

export default HomeMenu;