import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Index from './routes'
import { StrictMode } from 'react'

function App() {


  return (
    <>

      <BrowserRouter>
        <Index />
      </BrowserRouter>

    </>
  )
}

export default App
