declare module '@microlink/react' {
    import * as React from 'react';
  
    interface MicrolinkProps {
      url: string;
      as?: 'a' | 'div' | 'iframe';
      size?: 'small' | 'normal' | 'large';
      media?: boolean;
      style?: React.CSSProperties;
    }
  
    const Microlink: React.FC<MicrolinkProps>;
    export default Microlink;
  }
  