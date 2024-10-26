import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import {Provider} from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Video from './components/Video.jsx'
import SignIn from './components/SignIn.jsx'
import { PersistGate } from 'redux-persist/lib/integration/react.js'
import Search from './components/Search.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element: <App type="random" />
  },
  {
    path:"/explore",
    element: <App type="trend" />
  },
  {
    path:"/subscriptions",
    element: <App type="sub" />
  },
  {
    path:"/video/:id",
    element: <Video />
  },
  {
    path:"/signin",
    element: <SignIn />
  },
  {
    path:"/search",
    element: <Search />
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
    </Provider>
  // </StrictMode>,
)
