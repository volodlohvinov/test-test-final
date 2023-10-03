import React from 'react'
import ReactDOM  from 'react-dom/client'
import App from './App.jsx'
import SmoothieConstructor from './components/Constructor.jsx'
import About from './components/About.jsx'
import Cart from './components/Cart.jsx'
import Special from './components/Special.jsx'
import {  RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'


const rootEl = document.getElementById("root")
const root = ReactDOM.createRoot(rootEl)


const router = createBrowserRouter([{
    path: '/',
    element: <Provider store={store}>
    <App/>
    </Provider>
},
{
    path: '/smoothie',
    element: <Provider store={store}>
         <SmoothieConstructor />
    </Provider>
},
{path: '/about',
    element: <Provider store={store}>
    <About />
    </Provider>
},
{path: '/cart',
    element: <Provider store={store}>
    <Cart />
    </Provider>
},
{path: '/special-smoothie',
    element: <Provider store={store}>
    <Special />
    </Provider>
},
])

root.render(
    <RouterProvider router={router} />
)