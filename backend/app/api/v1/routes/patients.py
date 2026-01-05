# app/api/v1/routes/patients.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.patient import (
    PatientCreate,
    PatientDetail,
    PatientUpdate,
    PatientResponse,
)
from app.services import patient_service as PatientService
from app.core.dependencies import get_current_user, require_roles, doctor_owns_patient
from app.core.constants import UserRole

router = APIRouter()

#  Admin/Doctor -> POST / patients 
@router.post(
    "/",
    response_model=PatientResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.DOCTOR]))],
)
def create_patient(
    patient_in: PatientCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Create a new patient record.
    Accessible by Admin and Doctor roles.
    """
    patient = PatientService.create_patient(
        db=db,
        patient_in=patient_in,
        created_by=current_user.id,
    )
    return patient

# Doctor/Admin -> GET / patients/{patient_id}
@router.get(
    "/{patient_id}",
    response_model=PatientDetail,
    dependencies=[Depends(doctor_owns_patient)],
)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    """
    Retrieve patient details by ID.
    Accessible by assigned Doctor and Admin roles.
    """
    patient = PatientService.get_patient_by_id(db=db, patient_id=patient_id)
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient

# Admin -> All patients, 
# Doctor -> only assigned patients
@router.get(
    "/",
    response_model=list[PatientResponse],
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.DOCTOR]))],
)
def list_patients(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    List all patients.
    Admin can see all patients; Doctors see only their assigned patients.
    """
    if current_user.role == UserRole.ADMIN:
        patients = PatientService.get_all_patients(db=db)
    else:
        patients = PatientService.get_patients_by_doctor(
            db=db, doctor_id=current_user.id
        )
    return patients

# Doctor/Admin -> PUT / patients/{patient_id}
@router.put(
    "/{patient_id}",
    response_model=PatientResponse,
    dependencies=[Depends(doctor_owns_patient)],
)
def update_patient(
    patient_id: int,
    patient_in: PatientUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a patient record.
    Accessible by assigned Doctor and Admin roles.
    """
    patient = PatientService.update_patient(
        db=db,
        patient_id=patient_id,
        patient_in=patient_in,
    )
    if not patient:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return patient

# Admin/Doctor -> DELETE / patients/{patient_id}
@router.delete(
    "/{patient_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles([UserRole.ADMIN, UserRole.DOCTOR]))],
)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    """
    Delete a patient record.
    Accessible by Admin and Doctor roles.
    """
    success = PatientService.delete_patient(db=db, patient_id=patient_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Patient not found",
        )
    return None

