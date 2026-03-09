import React, { useEffect } from "react";
import Overlay from "../UI/Overlay/Overlay";
import { useModal } from "../../context/ModalContext";
import Slider from "../UI/Slider/Slider";
import WorksImagesStore from "../../store/WorksImagesStore";
import { observer } from "mobx-react-lite";

const ModalSlider = observer(() => {
  const { modals, closeModal, sliderStartPos } = useModal();

  return (
    <Overlay isOpen={modals.slider} closeModal={() => closeModal("slider")}>
      <Slider
        slides={WorksImagesStore.images}
        startPos={sliderStartPos}
        loadNextWorks={async () => await WorksImagesStore.loadNextPage(6)}
        isModal={true}
      />
    </Overlay>
  );
});

export default ModalSlider;
