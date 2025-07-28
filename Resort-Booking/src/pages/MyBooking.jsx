import React, { useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBooking = () => {
  const [booking, setBooking] = useState(userBookingsDummyData);
  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subTitle="Easily Manage Your Past, current ,and upcomming hotel reservations in one place. 
        Plan your trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div
          className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full 
        border-b border-gray-300 font-medium text-base py-3"
        >
          <div className="w-1/2">Hotels</div>
          <div className="w-1/2">Date & Timings</div>
          <div className="w-full">Payment Status</div>
        </div>
        {booking.map((booking) => (
          <div
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t"
            key={booking._id}
          >
            {/* Hotel details */}
            <div className="flex flex-col md:flex-row ">
              <img
                src={booking.room.images[0]}
                alt="hotel-image"
                className="min-md:w-44 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span> ({booking.room.roomType})</span>
                </p>
                <div className="flex items-center text-gray-500 gap-1 text-sm">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span className="font-inter text-sm">
                    {booking.hotel.address}
                  </span>
                </div>
                {/* Number of Guest */}
                <div className="flex items-center text-gray-500 gap-1 text-sm">
                  <img src={assets.guestsIcon} alt="location-icon" />
                  <span className="font-inter text-sm">
                    Guests:
                    {booking.guests}
                  </span>
                </div>
                <p className="text-base"> Total: ${booking.totalPrice}</p>
              </div>
            </div>
            {/* Date and Timings */}
            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p>Check-In :</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>

              <div>
                <p>Check-Out :</p>
                <p className="text-sm text-gray-500">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {" "}
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!booking.isPaid && (
                <button
                  className="px-4 py-1.5 mt-4 text-xs border border-gray-400 hover:bg-gray-50 transition-all
          rounded-full cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
