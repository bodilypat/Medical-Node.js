//src/features/patients/hooks/usePatients.js 
import { useQuery } from "@tanstack/react-query";

import { getPatients } from "../api/patients.api";
import { patientKeys } from "../api/patient.keys" 

export function usePatients(filters = {}) {
    const query = useQuery({
        queryKey: patientKeys.list(filters),

        queryFn: () => getPatients(filters),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
    });

    return {
        patients: query.data?.patients || [],
        meta: query.data?.meta || {},

        totalPatients: query.data?.total || 0,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isSuccess: query.isSuccess,
        isError: query.isError,

        error: query.error,

        refetch: query.refetch,
    }
}
