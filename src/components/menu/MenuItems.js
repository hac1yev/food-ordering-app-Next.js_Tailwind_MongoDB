import Image from "next/image";

const MenuItems = () => {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
            <div className="relative">
                <Image className="mx-auto" width={130} height={130} src={"/pizza.png"} alt="pizza" layout />
            </div>
            <h4 className="font-semibold text-xl my-3">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">
                Lorem impsum dolar sit amet, consectedur addessimo elit
            </p>
            <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                Add to cart $12
            </button>
        </div>
    );
};

export default MenuItems;