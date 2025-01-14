const Banner = ({ title }: { title: string }) => {
  return (
    <div className="bg-gradient-to-r from-pink-600 to-pink-700 w-full  minmd:3/4  md:px-8 px-6 py-16 rounded-lg overflow-hidden relative">
      <h1 className="dark:text-white text-white md:text-3xl text-2xl  text-center leading-10 font-poppins font-semibold">
        {title}
      </h1>

     <div className="absolute w-48 h-48 rounded-full bg-white opacity-20 -top-10 -left-10" />
     <div className="absolute w-72 h-72 rounded-full bg-white opacity-20 -bottom-52 -right-10" />
    </div>
  );
};

export default Banner;
