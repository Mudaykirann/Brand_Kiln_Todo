import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AllTasks from './pages/AllTasks.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='alltasks' element={<AllTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
