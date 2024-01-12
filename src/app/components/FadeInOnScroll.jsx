import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const FadeInOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <VisibilitySensor
      partialVisibility
      onChange={(isVisible) => {
        setIsVisible(isVisible);
      }}
    >
      <div className={`transition-opacity duration-3000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </VisibilitySensor>
  );
};

export default FadeInOnScroll;