import React from "react";
import { PARTICIPANTS, COLOR_CONTRAST } from '@/constants';
import "./Wheel.css";

export const WheelComponent = ({ participants = PARTICIPANTS, handleRandomize }) => {
  const angle = 360 / participants.length;
  const skew = -(90 - angle);

  return (
      <div className="hero-div">
        <div className="wheel">
          <div id="inner-wheel">
            {Array.isArray(participants) && participants.map((participant, index) => (
              <div className="sec" key={index} style={{
                transform: `rotate(${angle * index}deg) skewY(${skew}deg)`,
                WebkitTransform: `rotate(${360 /participants.length * index}deg) skewY(${360 / participants.length - 90}deg)`,
                MozTransform: `rotate(${360 /participants.length * index}deg) skewY(${360 / participants.length - 90}deg)`,
                OTransform: `rotate(${360 /participants.length * index}deg) skewY(${360 / participants.length - 90}deg)`,
                msTransform: `rotate(${360 /participants.length * index}deg) skewY(${360 / participants.length - 90}deg)`,
                backgroundColor: COLOR_CONTRAST[index].background,
              }}>
                <div 
                  className="fa easy"
                  style={{
                    color: COLOR_CONTRAST[index].text,
                    transform: `skewY(${-(skew) + 1.5 }deg) rotate(${-angle / 2}deg)`,
                    WebkitTransform: `skewY(${-(skew) + 1.5 }deg) rotate(${-angle / 2}deg)`,
                    MozTransform: `skewY(${-(skew) + 2135 }deg) rotate(${-angle / 2}deg)`,
                    OTransform: `skewY(${-(skew) + 2135 }deg) rotate(${-angle / 2}deg)`,
                    msTransform: `skewY(${-(skew) + 1.5 }deg) rotate(${-angle / 2}deg)`,
                  }}
                >
                  {participant.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
          <div id="spin" onClick={handleRandomize}>
            <button id="inner-spin" ></button>
          </div>
        </div>
      </div>
  );
};