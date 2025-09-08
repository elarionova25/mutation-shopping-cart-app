// App.tsx
import React from 'react';
import { ConfigProvider } from 'antd';
import { CartDemo } from './components/CartDemo';
import 'antd/dist/reset.css';

const App: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1890ff',
                    borderRadius: 8,
                },
            }}
        >
            <div className="app">
                <CartDemo />
            </div>
        </ConfigProvider>
    );
};

export default App;