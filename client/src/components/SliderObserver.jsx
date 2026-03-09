import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import SlidesStore from "../store/SlidesStore";
import Slider from "./UI/Slider/Slider";

const SliderObserver = observer(() => {
  useEffect(() => {
    SlidesStore.getSlides();
  }, []);

  return <Slider slides={SlidesStore.slides} endPos={9} />;
});

export default SliderObserver;
