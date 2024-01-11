import { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const Collapsible = ({ children, title, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div>
      <div onClick={() => {toggleCollapse();  setIsRotated(!isRotated);}} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}>
        <h3 className={className}> {title} <IoIosArrowDown onClick={() => setIsRotated(!isRotated)} className={`inline-block pointer-events-auto transform transition-transform duration-300 ${isRotated ? 'rotate-180' : ''}`}/></h3>
      </div>
      {!isCollapsed && <div>{children}</div>}
    </div>
  );
};

export default Collapsible;