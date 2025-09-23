import Image from "next/image";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaUndo, FaRedo, FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";

const MediaViewer = ({
  mediaList,
  currentMediaId,
  onClose,
  flipUpAndDown,
  flipLeftAndRight,
  rotateClockwise,
  rotateCounterClockwise,
}) => {
  const [currentId, setCurrentId] = useState(currentMediaId);

  const currentIndex = mediaList.findIndex((item) => item.id === currentId);
  const media = mediaList[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === mediaList.length - 1;
  const isSingle = mediaList.length === 1;
  // Zoom, pan, rotation, flip states
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  const resetAll = () => {
    setRotation(0);
    setScale(1.2);
    setFlipX(1);
    setFlipY(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setDragging(true);
      setOrigin({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - origin.x,
        y: e.clientY - origin.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const transformStyle = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${
      scale * flipX
    }, ${scale * flipY}) rotate(${rotation}deg)`,
    transition: dragging ? "none" : "transform 0.3s ease",
    cursor: scale > 1 ? "grab" : "default",
    maxWidth: "100%",
    maxHeight: "80vh",
    display: "block",
    margin: "0 auto",
  };

  const nextMedia = () => {
    if (!isLast) {
      const nextIndex = (currentIndex + 1) % mediaList.length;
      setCurrentId(mediaList[nextIndex].id);
      resetAll();
    }
  };

  const prevMedia = () => {
    if (!isFirst) {
      const prevIndex =
        (currentIndex - 1 + mediaList.length) % mediaList.length;
      setCurrentId(mediaList[prevIndex].id);
      resetAll();
    }
  };

  return (
    <Modal
      show
      onHide={() => {
        onClose();
        resetAll();
      }}
      fullscreen
      centered
      className="gallery_modal_main_div"
    >
      <Modal.Header closeButton />
      <Modal.Body className="text-center" style={{ overflow: "hidden" }}>
        <div
          className="gallery_contains_main_div"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {media?.video && (
            <video
              src={media?.video}
              controls
              autoPlay
              playsInline
              loop
              muted
              style={{ width: 1920, height: 1080, ...transformStyle }}
            />
          )}
          {media?.image && (
            <Image
              unoptimized
              src={media?.image || ""}
              alt={`Media ${currentId}`}
              width={1920}
              height={1080}
              style={transformStyle}
            />
          )}
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center flex-wrap gap-2">
        {/* Rotation and Flip Controls */}

        {flipUpAndDown && (
          <Button
            variant="outline-secondary bottom_control_btn"
            onClick={() => setFlipY(flipY * -1)}
            title="Flip Up/Down"
          >
            <FaArrowsAltV />
          </Button>
        )}
        {flipLeftAndRight && (
          <Button
            variant="outline-secondary bottom_control_btn"
            onClick={() => setFlipX(flipX * -1)}
            title="Flip Left/Right"
          >
            <FaArrowsAltH />
          </Button>
        )}
        {rotateClockwise && (
          <Button
            variant="outline-secondary bottom_control_btn"
            onClick={() => setRotation(rotation + 90)}
            title="Rotate Clockwise"
          >
            <FaRedo />
          </Button>
        )}
        {rotateCounterClockwise && (
          <Button
            variant="outline-secondary bottom_control_btn"
            onClick={() => setRotation(rotation - 90)}
            title="Rotate Counter-Clockwise"
          >
            <FaUndo />
          </Button>
        )}
        {!isSingle && (
          <Button
            variant="outline-secondary"
            className={
              isFirst ? "gallery_left_icon_disabled" : "gallery_left_icon"
            }
            onClick={prevMedia}
          >
            <BiSolidLeftArrow />
          </Button>
        )}

        <Button
          variant={`outline-secondary ${
            scale >= 3 ? "bottom_control_btn_disabled" : "bottom_control_btn"
          }`}
          onClick={() => {
            if (scale >= 3) return;
            setScale(scale + 0.2);
          }}
          title="Zoom In"
        >
          <FiZoomIn />
        </Button>
        <Button
          variant={`outline-secondary ${
            scale <= 1 ? "bottom_control_btn_disabled" : "bottom_control_btn"
          }`}
          onClick={() => {
            if (scale <= 1) return;
            const newScale = Math.max(1, scale - 0.2);
            setScale(newScale);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
          }}
          title="Zoom Out"
        >
          <FiZoomOut />
        </Button>
        {!isSingle && (
          <Button
            variant="outline-secondary"
            className={
              isLast ? "gallery_right_icon_disabled" : "gallery_right_icon"
            }
            onClick={nextMedia}
          >
            <BiSolidRightArrow />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MediaViewer;
