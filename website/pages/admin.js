import { useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#333', marginBottom: '30px' }}>管理后台</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>欢迎使用设计能管理后台</p>
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#888', fontSize: '14px' }}>
            管理后台功能开发中...
          </p>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link href="/" style={{
            color: '#0070f3',
            textDecoration: 'none'
          }}>
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
