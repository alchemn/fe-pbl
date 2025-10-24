import { Button } from "./ui/button"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-4">
        <h1 className="font-bold italic text-black text-4-xl">Daftar Siswa</h1>
        <Button>
            <Link to="/add">Add Siswa</Link>
        </Button>
    </div>
  )
}

export default Navbar