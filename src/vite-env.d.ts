/// <reference types="vite/client" />

import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps;
    }
  }
}

interface ModelViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  src?: string;
  poster?: string;
  alt?: string;
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'auto-rotate-delay'?: string;
  'rotation-per-second'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'field-of-view'?: string;
  exposure?: string;
  'environment-image'?: string;
  'shadow-intensity'?: string;
  'interaction-prompt'?: string;
  reveal?: string;
  style?: React.CSSProperties;
}

export {};
