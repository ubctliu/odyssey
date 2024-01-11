import { useState } from 'react';

const Collapsible = ({ children, title }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <div onClick={toggleCollapse} style={{ cursor: 'pointer', borderBottom: '1px solid #ccc' }}>
        <h3>{title}</h3>
      </div>
      {!isCollapsed && <div>{children}</div>}
    </div>
  );
};

export default Collapsible;