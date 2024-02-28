import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"


const useUserLogout = () => {
    const queryclient = useQueryClient()
  return useMutation({
    mutationFn: async() => {
    const res = await axios.post('api/token/delete/')
    return res.data
    }
    ,
    onSuccess: () => {
        queryclient.invalidateQueries({
            queryKey: ["user"]
        })
        queryclient.setQueryData(["user"], () => [undefined])
    }
  })
}

export default useUserLogout