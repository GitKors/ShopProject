import React from 'react';

const AdminLink: React.FC = () => {
  return (
    <button onClick={() => window.open('/admin', '_blank')}>Перейти в систему администрирования</button>
  );
};

export default AdminLink;
