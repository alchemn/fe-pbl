import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || "http://localhost"

const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type" : "application/json"
    }
})

export interface DataSiswa {
    kodesiswa: string;
    namasiswa: string;
    tanggal_lahir: string;
    jurusan_siswa: string
}


export const getUser = () => apiClient.get<{data:DataSiswa[]}>('/siswa')
export const getUserById = (id:string) => apiClient.get(`/siswa/${id}`)
export const addSiswa = (data:DataSiswa) => apiClient.post('/siswa',data)
export const updateSiswa = (id:string,data:DataSiswa) => apiClient.put(`/siswa/${id}`,data)
export const deleteSiswa = (id:string) => apiClient.delete(`/siswa/${id}`)