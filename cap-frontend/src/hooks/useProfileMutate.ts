import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Consultants } from "../types/Consultants"



export const useProfileImageMutate = () => {
    const queryclient = useQueryClient()
  return useMutation<Consultants,Error, FormData>({
    mutationFn: (formData) => 
        axios.put('consult/consultant/me/', formData)
        .then(res => res.data),
    onSuccess: () => {
        queryclient.invalidateQueries({
            queryKey: ["con"]
        })
        queryclient.refetchQueries()
    }
  })
}


const useProfileMutate = () => {
    const queryclient = useQueryClient()
    return useMutation<Consultants,Error,object>({
        mutationFn: (info) => 
            axios
            .put('consult/consultant/me/', info)
            .then(res => res.data),
        onSuccess : () => {
            queryclient.invalidateQueries({
                queryKey: ["con"]
            })
            queryclient.refetchQueries()
        }
    })
}

export default useProfileMutate