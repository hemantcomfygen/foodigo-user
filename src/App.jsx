import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  
  return (
    <div className="">
      <div className="">
        <Routes>
          <Route
            path="/*"
            element={
              <Layout />
            }
          />
        </Routes>
      </div>


      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App