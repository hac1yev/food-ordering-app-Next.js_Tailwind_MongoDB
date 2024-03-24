import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
   <>
    <Hero />
    <HomeMenu />
    <section className="text-center my-16">
      <SectionHeaders 
        subHeader={'Our Story'}
        mainHeader={'About us'}
      />
      <div className="text-gray-500 flex flex-col gap-3">
        <p className="max-w-2xl mx-auto">
          Lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet 
          lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet!
        </p>
        <p className="max-w-2xl mx-auto">
          Lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet 
          lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar!
        </p>
        <p className="max-w-2xl mx-auto">
          Lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet lorem ipsum dolar sit amet!
        </p>
      </div>
    </section>
    <section className="text-center">
      <SectionHeaders
        subHeader={"Dont'n hesitate"}
        mainHeader={'Contact us'}
      />
      <div className="mt-8">
        <a className="text-4xl underline text-gray-500" href="tel:+994553521198">
          +994 55 352 11 98
        </a>
      </div>
    </section>
   </>
  );
}
