import React, { useContext, useEffect, useRef } from "react";
import { GiEarthAsiaOceania, GiWorld } from "react-icons/gi";
import {
  FaGlobeAfrica,
  FaGlobeAmericas,
  FaGlobeAsia,
  FaGlobeEurope,
} from "react-icons/fa";
import { ThemeContext } from "../../ThemeContext/themeContext";
import Option from "./Option";
import styled from "styled-components";

const RegionList = [
  { icon: GiWorld, value: "All" },
  { icon: FaGlobeAfrica, value: "Africa" },
  { icon: FaGlobeAmericas, value: "Americas" },
  { icon: FaGlobeAsia, value: "Asia" },
  { icon: FaGlobeEurope, value: "Europe" },
  { icon: GiEarthAsiaOceania, value: "Oceania" },
];
function Options({isShowOptions}) {
  const themeContext = useContext(ThemeContext);
  const refOptions = useRef(null);

  useEffect(() => {
    const ShowOption = () => {
        if(isShowOptions){
            refOptions.current.style.maxHeight = `${refOptions.current.scrollHeight}px`;
            refOptions.current.style.transform = `scareY(1)`
        }else{
            refOptions.current.style.maxHeight = `0`;
            refOptions.current.style.transform = `scareY(0)`
        }
    }
    ShowOption();
    document.addEventListener('resize', ShowOption);
    return () => {
        document.removeEventListener('resize', ShowOption)
    }
  }, [isShowOptions])

  return (
    <OptionsPane className={themeContext.theme} ref={refOptions}>
      {RegionList.map((region, index) => (
        <Option region={region} key={index} />
      ))}
    </OptionsPane>
  );
}

export default Options;

const OptionsPane = styled.ul`
  width: 100%;
  margin-top: 2px;
  border-radius: 4px;
  position: absolute;
  overflow: hidden;
  z-index: 10;
`;
