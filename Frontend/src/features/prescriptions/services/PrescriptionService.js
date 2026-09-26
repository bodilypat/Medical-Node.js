/* ***************************************************************** */
/* File: #src/features/prescriptions/services/prescriptionService.js */ 
/* ***************************************************************** */

import api from "../../../services/api";

const normalizeId = (id, name = "Prescription ID") => {
    if (id === undefined || id === null || String(id).trim() === "") {
        throw new TypeError(`${name} is required`);
    }

    return encodeURIComponent(String(id).trim());
};

const prescriptionService = {
    getAll(params = {}){
        return api.get(
            "/prescriptions",
            {params}
        );
    },
    getById(id){
        return api.get(
            `/prescriptions/${normalizeId(id)}`
        );
    },
    create(data){
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new TypeError("Prescription data must be an object");
        }

        return api.post(
            "/prescriptions",
            data
        );

    },
    update(id,data){
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new TypeError("Prescription data must be an object");
        }

        return api.put(
            `/prescriptions/${normalizeId(id)}`,
            data
        );
    },
    remove(id){
        return api.delete(
            `/prescriptions/${normalizeId(id)}`
        );
    },
    getPatientHistory(patientId){
        return api.get(
            `/patients/${normalizeId(patientId, "Patient ID")}/prescriptions`
        );
    },
    print(id){
        return api.get(
            `/prescriptions/${normalizeId(id)}/print`,
            {
                responseType:"blob"
            }
        );
    }
};

export default prescriptionService;
