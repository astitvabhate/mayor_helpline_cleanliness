import React from "react";
import { useNavigate } from "react-router-dom";
import modijiImage from "../assets/modi_boss.jpg";
import mohanYadavImage from "../assets/mohan_yadav.webp";
import banner1 from "../assets/banner/1.jpeg";
import banner2 from "../assets/banner/2.jpeg";
import mayorImage from "../assets/images.jpeg";
import commissionerImage from "../assets/priti_yadav.jpg";
import videoSrc from "../assets/video/video.mp4";

const Home = () => {
  const navigate = useNavigate();

    const images = [banner1, banner2];
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000); // change every 3 seconds
      return () => clearInterval(interval);
    }, []);


  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-br from-emerald-400 via-cyan-200 to-lime-300 flex items-center justify-center px-6 py-6 relative scroll-smooth">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <div className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-40 rounded-full top-[-80px] left-[-80px] blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-l from-lime-400 to-yellow-300 opacity-30 rounded-full bottom-[-100px] right-[-100px] blur-3xl animate-pulse delay-300"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-br from-cyan-400 to-blue-300 opacity-25 rounded-full top-1/2 left-1/4 blur-2xl animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute w-2 h-2 bg-white/60 rounded-full top-1/4 left-1/3 animate-bounce delay-100"></div>
        <div className="absolute w-3 h-3 bg-emerald-300/70 rounded-full top-2/3 right-1/4 animate-bounce delay-700"></div>
        <div className="absolute w-1 h-1 bg-lime-400/80 rounded-full bottom-1/3 left-1/2 animate-bounce delay-1000"></div>
      </div>

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl backdrop-blur-2xl bg-white/80 border border-white/40 shadow-2xl p-6 flex flex-col gap-6 transition-all duration-300">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-lime-600 bg-clip-text text-transparent mb-3 drop-shadow-lg animate-pulse">
           Mayor HelpLine
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full mx-auto animate-pulse"></div>
        </div>

          {/* Green section as auto-play carousel */}
          <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 rounded-2xl mb-8 shadow-lg border border-green-300/50 overflow-hidden">
            <div className="absolute inset-0 z-0" />
            <img
              src={images[current]}
              alt={`Banner ${current + 1}`}
              className="w-full h-full object-cover rounded-2xl relative z-10 transition-opacity duration-700 ease-in-out"
            />
          </div>



        {/* Description */}
        <div className="text-center mb-2">
          <p className="text-gray-700 text-lg font-semibold px-2 leading-relaxed">
            Let’s build a <span className="text-emerald-600 font-bold">cleaner city</span> — take action or manage progress.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Action Buttons (your logic restored) */}
        <div className="grid grid-cols-2 gap-8 mb-5 flex-1 items-center">
          {/* Report Button */}
          <div
            onClick={() => navigate("/client/report")}
            className="group aspect-square bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex flex-col items-center justify-center rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:rotate-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-6xl mb-3 filter drop-shadow-lg group-hover:animate-bounce">🧹</span>
            <span className="text-base font-bold tracking-wide relative z-10">Report an Issue</span>
          </div>

          {/* Admin Button */}
          <div
            onClick={() => navigate("/admin/login")}
            className="group aspect-square bg-gradient-to-br from-white to-gray-50 text-gray-700 flex flex-col items-center justify-center rounded-3xl border-2 border-gray-200/50 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-rotate-1 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="text-6xl mb-3 filter drop-shadow-lg group-hover:animate-bounce">🔐</span>
            <span className="text-base font-bold tracking-wide relative z-10">Admin Login</span>
          </div>
        </div>
        {/* Leaders Section */}
<div className="w-full flex items-center justify-center gap-4 flex-wrap px-4">
  <img
    src={modijiImage}
    alt="Leader"
    className="w-25 h-20 object-cover rounded-full border-2 border-white shadow-lg"
  />
  <img
    src={mohanYadavImage}
    alt="Leader"
    className="w-25 h-20 object-cover rounded-full border-2 border-white shadow-lg"
  />
  <img
    src={mayorImage}
    alt="Leader"
    className="w-25 h-20 object-cover rounded-full border-2 border-white shadow-lg"
  />
  <img
    src={commissionerImage}
    alt="Commissioner"
    className="w-25 h-20 object-cover rounded-full border-2 border-white shadow-lg"
  />
</div>


        

        {/* Footer */}
        <div className="text-center">
          <p className="text-base text-gray-600 font-medium tracking-wider flex items-center justify-center gap-2">
            <span className="animate-spin">🌟</span>
            <span className="bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent font-bold">
            Cleanliness Drive
            </span>
            <span className="animate-spin">🌟</span>
            
          </p>
          
        </div>

        
        




        {/* Corner sparkles */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400/30 to-lime-400/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full blur-sm animate-pulse delay-500"></div>
      </div>
      
    </div>
  );
};

export default Home;
