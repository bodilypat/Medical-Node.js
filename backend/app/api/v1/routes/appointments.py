#app/api/v1/routes/appointments.py

from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.appointment import (
    AppointmentCreate, 
    AppointmentResponse,
    AppointmentUpdate,
    AppointmentStatusUpdate,
)
from app.services import appointment_service as AppointmentService
from app.core.dependencies import get_current_user, require_roles
from app.core.constants import UserRole

router = APIRouter(prefix="/appointments", tags=["Appointments"])

# Book Appointment (Patient)
@router.post(
    "/", 
    response_model=AppointmentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles([UserRole.PATIENT]))],
    summary="Book a new appointment (Patient only)",
)
def book_appointment(
    appointment: AppointmentCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
   
):
    new_appointment = AppointmentService.create_appointment(
        db, appointment, current_user.id
    )
    # Schedule reminder email
    background_tasks.add_task(
            AppointmentService.send_appointment_reminder, 
            new_appointment.id
        )
    return new_appointment

# Approve / Reject / Complete (Doctor)
@router.put(
    "/{appointment_id}/status",
    response_model=AppointmentResponse,
    dependencies=[Depends(require_roles([UserRole.DOCTOR]))],
    summary="Update appointment status (Doctor only)",
)
def update_appointment_status(
    appointment_id: int,
    status_update: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_appointment = AppointmentService.update_appointment_status(
        db, appointment_id, status_update.status, current_user.id
    )
    if not updated_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated_appointment  

# Reschedule / Cancel (Patient)
@router.put(
    "/{appointment_id}",
    response_model=AppointmentResponse,
    dependencies=[Depends(require_roles([UserRole.PATIENT]))],
    summary="Reschedule or cancel an appointment (Patient only)",
)
def reschedule_or_cancel_appointment(
    appointment_id: int,
    appointment_update: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    updated_appointment = AppointmentService.reschedule_or_cancel_appointment(
        db, appointment_id, appointment_update, current_user.id
    )
    if not updated_appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return updated_appointment

# Cancel  Appointment (Patient)
@router.delete(
    "/{appointment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_roles([UserRole.PATIENT]))],
    summary="Cancel an appointment (Patient only)",
)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    success = AppointmentService.cancel_appointment(
        db, appointment_id, current_user.id
    )
    if not success:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return None

# Calender-Based Time Slots 
@router.get(
    "/timeslots",
    response_model=list[str],
    summary="Get available time slots for appointments",
)
def get_available_time_slots(
    db: Session = Depends(get_db),
):
    time_slots = AppointmentService.get_available_time_slots(db)
    return time_slots



