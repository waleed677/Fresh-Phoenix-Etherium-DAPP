import React, { useState } from 'react'
import { HeroContainer, HeroBg,ImageBg, VideoBg, HeroContent,HeroH1,HeroP,HeroBtnWrapper,ArrowForward,ArrowRight,Button } from './HeroSection.elements';
function HeroSection() {


    const [hover,setHover]= useState(false);
    const onHover = () => {
        setHover(!hover);
    }
    return (
        <>
           <HeroContainer>
                <HeroContent>
             
                    {/* <HeroP>early supporters can mint upto 5 jungle cats nfts at a discounted price of 0.04 eth.
learn how to get access in <span style={{color:"#dbac36"}}>our discord</span> </HeroP> */}
                </HeroContent>
           </HeroContainer> 
        </>
    )
}

export default HeroSection
