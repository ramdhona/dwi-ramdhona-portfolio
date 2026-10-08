"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Dynamically import yet-another-react-lightbox and its Zoom plugin only when opened
const DynamicLightbox = dynamic(
  async () => {
    const [{ default: Lightbox }, { default: Zoom }] = await Promise.all([
      import("yet-another-react-lightbox"),
      import("yet-another-react-lightbox/plugins/zoom"),
    ]);

    return function LightboxWithZoom(props: {
      open: boolean;
      close: () => void;
      index?: number;
      slides: Slide[];
      render?: {
        buttonPrev?: () => React.ReactNode;
        buttonNext?: () => React.ReactNode;
      };
    }) {
      return (
        <Lightbox
          {...props}
          plugins={[Zoom]}
          controller={{ closeOnBackdropClick: true }}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleClickMaxStops: 2,
            scrollToZoom: true,
          }}
          render={props.render}
        />
      );
    };
  },
  { ssr: false }
);

export interface LightboxModalProps {
  open: boolean;
  close: () => void;
  index?: number;
  slides: Slide[];
  render?: {
    buttonPrev?: () => React.ReactNode;
    buttonNext?: () => React.ReactNode;
  };
}

export function LightboxModal({
  open,
  close,
  index = 0,
  slides,
  render,
}: LightboxModalProps) {
  if (!open) return null;

  return (
    <DynamicLightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      render={render}
    />
  );
}
