import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import Starrating from "../components/Starrating";
import { assets } from "../assets/assets";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const room = roomsDummyData.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, []);

  return (
    room && (
      <div className="md:py-35 py-28 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="text-xs font-inter">({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1 mt-2">
          <Starrating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Room Address */}

        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location icon" />
          <span>
            {room.hotel.address}, {room.hotel.city}
          </span>
        </div>

        {/* Room Images */}

        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="main Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          {/* other images */}
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer
                     ${mainImage === image && "outline-3 outline-orange-500"}`}
                />
              ))}
          </div>
        </div>
        {/* Room Higlights */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Expirience Luxury like never Before
            </h1>

            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/* room Price */}
          <p className="text-2xl font-medium">${room.pricePerNight} /night </p>
        </div>
        {/* CheckIn Checkout Form */}
        <form
          className="flex flex-col md:flex-row items-start md:items-center
         justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div
            className="flex flex-col flex-wrap md:flex-row items-start md:items-center 
          gap-4 md:gap-10 text-gray-500 "
          >
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check IN
              </label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-In"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Check-Out"
                required
              />
            </div>

            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guest
              </label>
              <input
                type="number"
                id="guests"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
                placeholder="Guests"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull active:scale-95 transition-all
          text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availavility
          </button>
        </form>

        {/* comman Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Room Description */}
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guest will be allocating to the ground floor according to the
            availability. You get a Comfortable two bedroom apartment has true
            city feeling. The Price is quoted for two guest , at the guest slot
            please mark the number of guest to get the exact price for group .
            The guest will be allocated to ground floor according to the
            availability.
          </p>
        </div>

        {/* Hosted by */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="Host"
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted By {room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <Starrating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button
            className="px-6 py-2.5 mt-4 bg-primary hover:bg-primary-dull transition-all
          text-white rounded cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
