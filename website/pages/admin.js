import { useEffect } from 'react';

export default function Admin() {
  useEffect(() => {
    // 重定向到静态 admin 页面
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <p>正在跳转到管理后台...</p>
    </div>
  );
}
