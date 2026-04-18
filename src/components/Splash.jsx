import React from "react";
import lehzatLogo from "../assets/pictures/lehzatcolor.png";
import BgIcon from "../assets/icons/bgicon.png";

function Splash() {
  return (
    <div className="bg-[#fefef6] min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Watermark - Clipped in Top Right */}
      <div className="absolute -top-[40%] -right-[55%] w-[100%] h-[100%]  invert ">
        <img src={BgIcon} alt="" className="w-full h-full object-contain" />
      </div>
       <div className="absolute -top-[1%] right-[55%] w-[100%] h-[100%]  invert ">
        <img src={BgIcon} alt="" className="w-full h-full object-contain" />
      </div>
       <div className="absolute top-[40%] left-[55%] w-[100%] h-[100%]  invert ">
        <img src={BgIcon} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Main Logo */}
      <div className="relative z-10 w-30 sm:w-38 animate-in fade-in zoom-in duration-1000">
        <img
          src={lehzatLogo}
          alt="lehzatLogo"
          className="w-full h-auto object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
}

export default Splash;
