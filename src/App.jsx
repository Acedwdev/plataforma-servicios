import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Services from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import Favorites from "./pages/Favorites"
import Contact from "./pages/Contact"
import CreateService from "./pages/CreateService"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create" element={<CreateService />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App