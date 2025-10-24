import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "sonner"
import ListSiswa from "./components/ListSiswa"
import AddSiswa from "./components/AddSiswa"
import EditSiswa from "./components/EditSiswa"


function App () {
  return(
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Navbar />
    <Routes>
      <Route path="/" element={<ListSiswa />}/>
      <Route path="/add" element={<AddSiswa />}/>
      <Route path="/edit/:id" element={<EditSiswa />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App