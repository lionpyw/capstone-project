import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { AppRequest } from "../types/AppRequest";

interface updateAppReqVariables {
    id: number
    info: object
  }

export const useAppReqDelete = () => {
    const queryclient = useQueryClient()
    return useMutation({
        mutationFn: (id:number) =>
        axios.delete(`consult/app_req/${id}/`)
        .then(res => res.data),
        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey:["requests"]
            })
        }
    })
}

const useAppReqMutate = () => {
    const queryclient = useQueryClient()
    return useMutation<AppRequest[], Error, updateAppReqVariables>({
        mutationFn: ({id,info}:updateAppReqVariables) =>
            axios
            .put(`consult/app_req/${id}/`, info)
            .then(res => res.data),
        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey: ["requests"]
            })
        }
})
}

export default useAppReqMutate