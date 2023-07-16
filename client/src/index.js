import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import { ContextProvider } from './SocketContext'
import './style.css'

ReactDom.render(
    <ContextProvider>
        <App/>
    </ContextProvider>, 
    document.getElementById('root')
); 