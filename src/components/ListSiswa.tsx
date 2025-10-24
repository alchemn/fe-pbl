import { deleteSiswa, getUser } from "@/api/siswa"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useSWR,{useSWRConfig} from 'swr'
 import {SquarePen, Trash2} from 'lucide-react'
 import {Link} from "react-router-dom"
import { toast } from "sonner"

interface Siswa {
    id:string;
    kodesiswa: string;
    namasiswa: string;
    tanggal_lahir: string;
    jurusan_siswa: string
}

const ListSiswa = () => {
    const fetcher = () => getUser().then((res) => res.data.data)
    const {mutate} = useSWRConfig();
    const {data,error,isLoading} = useSWR<Siswa[]>("/siswa",fetcher)

    const hapusSiswa = async (id:string) => {
        try {
            const res = await deleteSiswa(id)
                        mutate('/siswa')
            toast.success(res.data.message)
        } catch (error) {
            console.error(error)
        }
    }

    if(error) return <h1 className="text-red-500 text-center mt-10">Data Error</h1>
    if(isLoading) return <h1 className="text-gray-500 text-center mt-10">Loading ....</h1>
    if(!data || data.length === 0) return <h1 className="text-gray-500 text-center mt-10">Data Siswa Masih Kosong</h1>

  return (
    <Table>
        <TableCaption>Daftar Siswa</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Kode Siswa</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Tanggal Lahir</TableHead>
                <TableHead>Jurusan Siswa</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data && data.map((siswa,index) => (
            <TableRow key={siswa.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{siswa.kodesiswa}</TableCell>
                    <TableCell>{siswa.namasiswa}</TableCell>
                     <TableCell>
        {new Date(siswa.tanggal_lahir).toLocaleDateString("id-ID")}
      </TableCell>
                    <TableCell>{siswa.jurusan_siswa}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => hapusSiswa(siswa.id)}>
                                <Trash2 />
                            </button>
                         <Link to={`/edit/${siswa.id}`}>
                         <SquarePen/></Link>
                        </div>
                    </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </Table>
  )
}

export default ListSiswa