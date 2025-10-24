import { useState,useEffect } from "react"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
 import { Spinner } from "./ui/spinner";
import {updateSiswa, getUserById } from "@/api/siswa";
import type { DataSiswa } from "@/api/siswa";
import { toast } from "sonner";
import { useParams, useNavigate } from 'react-router-dom';
interface Siswa {
    kodesiswa:string;
    namasiswa:string;
    tanggal_lahir:string;
    jurusan_siswa: string
}
interface IdSiswa extends Siswa {
    id:string
}
const AddSiswa = () => {
    const [form,setForm] = useState<IdSiswa>({id: "",kodesiswa: "",namasiswa:"",tanggal_lahir: "",jurusan_siswa:""})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()


    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getUserById(id!)
                const siswa = res.data.data
                setForm({
                    id:siswa.id,
                    kodesiswa:siswa.kodesiswa,
                    namasiswa:siswa.namasiswa,
                    tanggal_lahir:siswa.tanggal_lahir,
                    jurusan_siswa:siswa.jurusan_siswa
                })
            } catch (error) {
                console.error(error)
            }
        }
        getData()
    },[id])
    const updateSiswaData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
        const dataTosend: DataSiswa = {
            kodesiswa: form.kodesiswa,
            namasiswa: form.namasiswa,
            tanggal_lahir:form.tanggal_lahir,
            jurusan_siswa: form.jurusan_siswa
        }
        const res = await updateSiswa(form.id, dataTosend) // ✅ kirim id
        toast.success(res.data.message)
        navigate("/")
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
        <form className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-6" onSubmit={updateSiswaData}>
            <div className="space-y-2">
                <Label htmlFor="kode" className="text-gray-700 font-medium">
                    Masukkan Kode Siswa
                </Label>
                <Input type="text" name="kodesiswa" value={form.kodesiswa} onChange={(e) => setForm({...form, kodesiswa:e.target.value})}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="kode" className="text-gray-700 font-medium">
                    Masukkan Nama Siswa
                </Label>
                <Input type="text" name="namasiswa" value={form.namasiswa} onChange={(e) => setForm({...form, namasiswa:e.target.value})}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="kode" className="text-gray-700 font-medium">
                    Masukkan Tanggal Lahir Siswa
                </Label>
                <Input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={(e) => setForm({...form, tanggal_lahir:e.target.value})}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="kode" className="text-gray-700 font-medium">
                    Masukkan Jurusan Siswa
                </Label>
                <Input type="text" name="jurusan_siswa" value={form.jurusan_siswa} onChange={(e) => setForm({...form, jurusan_siswa:e.target.value})}/>
            </div>
<Button disabled={loading}>{loading ? (
    <>
    <Spinner/></>
): (
    "Mengupdate"
)}</Button>
        </form>
    </div>
  )
}

export default AddSiswa