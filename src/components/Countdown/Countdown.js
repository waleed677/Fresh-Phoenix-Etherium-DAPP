import React, {useState,useEffect  } from "react";
import { Count, CountText, Timer, Value, Wrapper,Digit } from "./Countdown.element";


function Countdown() {
    let countDownDate = new Date("Feb 12, 2022 20:00:00 GMT -6:00").getTime();

    let now = new Date().getTime();
  
    let timeleft = countDownDate - now;
  
    const [days, setDays] = useState();
    const [hours, setHour] = useState();
    const [minutes, setMint] = useState();
    const [seconds, setSec] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
          setDays(Math.floor(timeleft / (1000 * 60 * 60 * 24)));
          setHour(
            Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          );
          setMint(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
          setSec(Math.floor((timeleft % (1000 * 60)) / 1000));
        }, 1000);
        return () => clearInterval(interval);
      }, [days, hours, minutes, seconds]);

  return (
    <>

    <Wrapper>
        <CountText>COUNTDOWN TO LAUNCH</CountText>
        <Timer>
            <Count>
                <Digit>{days}</Digit>
                <Value>DAYS</Value>
            </Count>
            <Count>
                <Digit>{hours}</Digit>
                <Value>HOURS</Value>
            </Count>
            <Count>
                <Digit>{minutes}</Digit>
                <Value>MINS</Value>
            </Count>
            <Count>
                <Digit>{seconds}</Digit>
                <Value>SEC</Value>
            </Count>
        </Timer>
    </Wrapper>
    </>
  )
}

export default Countdown