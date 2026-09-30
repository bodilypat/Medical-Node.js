Fullstack-Medical-Management System(MMS)  React => Features => Service(Axios) => FastAPI API => Service Layer => SQLAlchemy => PostgreSQL/ MySQL
│
├── medical-management-frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── app/                                                     # application setup & routing 
│   │   │   ├── App.jsx 
│   │   │   ├── AppRouter.jsx 
│   │   │   ├── routes/
│   │   │   │   ├── publicRoutes.jsx 
│   │   │   │   ├── ProtectedRoutes.jsx
│   │   │   │   ├── adminRoutes.jsx
│   │   │   │   ├── doctorRoutes.jsx 
│   │   │   │   └── patientRoutes.jsx 
│   │   │   ├── guards/
│   │   │   │   ├── ProtectedRoute.jsx 
│   │   │   │   ├── RoleRoute.jsx 
│   │   │   │   └── PermissionRoute.jsx 
│   │   │   └── providers/
│   │   │       ├── AppProviders.jsx  
│   │   │       ├── AuthProvider.jsx 
│   │   │       └── QueryProvider.jsx 
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/ 
│   │   │   └── styles/
│   │   │       ├── variables.css 
│   │   │       ├── theme.css 
│   │   │       ├── utitities.css 
│   │   │       └── index.css
│   │   ├── components/                                              # reusable global UI
│   │   │   ├── ui/                                                   
│   │   │   │   ├── Button.jsx 
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx 
│   │   │   │   ├── Modal.jsx 
│   │   │   │   ├── Table.jsx 
│   │   │   │   ├── Badge.jsx 
│   │   │   │   ├── Card.jsx 
│   │   │   │   ├── Spinner.jsx 
│   │   │   │   ├── Skeleton.jsx 
│   │   │   │   ├── EmptyState.jsx 
│   │   │   │   └── ErrorState.jsx
│   │   │   │
│   │   │   ├── navigation/
│   │   │   │   ├── Navbar.jsx 
│   │   │   │   ├── Sidebar.jsx 
│   │   │   │   ├── Breadcrumbs.jsx 
│   │   │   │   └── MobileBoundary.jsx
│   │   │   │
│   │   │   └── feedback/
│   │   │       ├── Toast.jsx 
│   │   │       ├── ConfirmDialog.jsx 
│   │   │       └── ErrorBoundary.jsx
│   │   │
│   │   ├── layouts/                                                 # Admin/Doctor/Patient layouts 
│   │   │   ├── AuthLayout.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── DoctorLayout.jsx
│   │   │   ├── PatientLayout.jsx 
│   │   │   └── components/
│   │   │       ├── Header.jsx 
│   │   │       ├── Sidebar.jsx 
│   │   │       └── LayoutContent.jsx
│   │   │
│   │   ├── features/                                                # business domains
│   │   │   ├── auth/
│   │   │   │   ├── api/
│   │   │   │   │   └── authApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── LoginForm.jsx 
│   │   │	│   │   ├── RegisterForm.jsx  
│   │   │   │   │   └── ForgotPasswordForm.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useAuth.js 
│   │   │   │   │   └── useLogin.js 
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Login.jsx 
│   │   │	│   │   ├── Register.jsx 
│   │   │   │   │   └── ForgotPassword.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │   │   │   └── authSchema.js 
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── components/
│   │   │	│   │   ├── dashboard/
│   │   │	│   │   │   ├── StatsCards.jsx 
│   │   │	│   │   │   ├── AppointmentOverview.jsx 
│   │   │	│   │   │   ├── PatientOverview.jsx 
│   │   │	│   │   │   ├── RevenueOverview.jsx 
│   │   │   │   │   │   └── RecentAppointments.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── doctors/ 
│   │   │	│   │   │   ├── DoctorTable.jsx 
│   │   │	│   │   │   ├── DoctorForm.jsx 
│   │   │	│   │   │   ├── DoctorDetails.jsx 
│   │   │   │   │   │   └── DoctorFilters.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── appointments/
│   │   │	│   │   │   ├── AppointmentTable.jsx 
│   │   │	│   │   │   ├── AppointmentDetails.jsx 
│   │   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   │   └── AppointmetStatus.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── reports/ 
│   │   │	│   │       ├── ReportFilters.jsx 
│   │   │	│   │       ├── ReportCard.jsx 
│   │   │	│   │       ├── ReportTable.jsx 
│   │   │   │   │       └── ReportChart.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useDashboard.js 
│   │   │	│   │   ├── useStats.js  
│   │   │	│   │   ├── useDoctors.js 
│   │   │	│   │   ├── useAppointments.js  
│   │   │   │   │   └── useReports.js 
│   │   │   │   │
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Dashboard.jsx
│   │   │	│   │   ├── Doctors.jsx
│   │   │	│   │   ├── Appointments.jsx
│   │   │   │   │   └── Reports.jsx
│   │   │   │   │
│   │   │   │   ├── services/
│   │   │	│   │   ├── dashboardService.js 
│   │   │	│   │   ├── doctorService.js 
│   │   │	│   │   ├── appointmentService.js 
│   │   │   │   │   └── reportService.js 
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │	│   │   ├── doctorSchema.js 
│   │   │   │   │   └── appointmentSchema.js
│   │   │   │   │
│   │   │   │   ├── constants/
│   │   │   │   │   └── adminConstants.js
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── api/
│   │   │   │   │   └── patientApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── PatientTable.jsx
│   │   │	│   │   ├── PatientCard.jsx
│   │   │	│   │   ├── PatientForm.jsx
│   │   │	│   │   ├── PatientProfile.jsx 
│   │   │	│   │   ├── PatientFilters.jsx 
│   │   │	│   │   ├── PatientStats.jsx 
│   │   │   │   │   └── PatientActions.jsx 
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── usePatients.js 
│   │   │	│   │   ├── usePatient.js
│   │   │	│   │   ├── useCreatePatient.js 
│   │   │   │   │   └── usePatientActions.js 
│   │   │   │   ├── pages/
│   │   │	│   │   ├── Patients.jsx 
│   │   │   │   │   └── PatientDetails.jsx
│   │   │   │   ├── schemas/
│   │   │   │   │   └── patientSchema.js
│   │   │   │   ├── constants/
│   │   │   │   │   └── patientConstants.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── doctors/
│   │   │   │   ├── components/
│   │   │	│   │   ├── dashboard/
│   │   │	│   │   │   ├── DoctorStats.jsx 
│   │   │	│   │   │   ├── TodayAppointments.jsx  
│   │   │	│   │   │   ├── UpcomingAppointments.jsx 
│   │   │   │   │   │   └── RecentPatients.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── appointments/ 
│   │   │	│   │   │   ├── AppointmentTable.jsx 
│   │   │	│   │   │   ├── AppointmentCard.jsx 
│   │   │	│   │   │   ├── AppointmentFilters.jsx 
│   │   │   │   │   │   └── AppointmentStatus.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── patients/
│   │   │	│   │   │   ├── PatientTable.jsx 
│   │   │	│   │   │   ├── PatientCard.jsx 
│   │   │   │   │   │   └── PatientSearch.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── medical-records/
│   │   │	│   │   │   ├── MedicalRecordForm.jsx 
│   │   │	│   │   │   ├── MedicalRecordTable.jsx 
│   │   │	│   │   │   ├── MedicalRecordDetails.jsx 
│   │   │   │   │   │   └── DiagnosistForm.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── prescriptions/ 
│   │   │	│   │       ├── PrescriptionForm.jsx 
│   │   │	│   │       ├── PrescriptionTable.jsx 
│   │   │	│   │       ├── MedicineRecords.jsx 
│   │   │   │   │       └── PrescriptionDetails.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useDoctorDashboard.js 
│   │   │	│   │   ├── useMyAppointments.js 
│   │   │	│   │   ├── useDoctorPatients.js 
│   │   │	│   │   ├── useMedicalRecords.js 
│   │   │   │   │   └── usePrescriptions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Dashboard.jsx
│   │   │	│   │   ├── MyAppointments.jsx
│   │   │	│   │   ├── Patients.jsx
│   │   │	│   │   ├── MedicalRecords.jsx
│   │   │   │   │   └── Prescriptions.jsx
│   │   │   │   │
│   │   │   │   ├── schemas/
│   │   │	│   │   ├── medicalRecordSchema.js
│   │   │   │   │   └── prescriptionSchema.js 
│   │   │   │   ├── constants/
│   │   │   │   │   └── doctorConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── appointmentApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── AppointmentTable.jsx 
│   │   │	│   │   ├── AppointmentCard.jsx  
│   │   │	│   │   ├── AppointmentForm.jsx 
│   │   │	│   │   ├── AppointmentDetails.jsx
│   │   │	│   │   ├── AppointmentFilters.jsx  
│   │   │	│   │   ├── AppointmentStatus.jsx 
│   │   │	│   │   ├── AppointmentCalendar.jsx 
│   │   │	│   │   ├── AppointmentSummary.jsx
│   │   │   │   │   └── AppointmentActions.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useAppointments.js 
│   │   │	│   │   ├── useAppointment.js 
│   │   │	│   │   ├── useCreateAppointment.js 
│   │   │   │   │   └── useAppointmentActions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Appointments.jsx  
│   │   │	│   │   ├── AppointmentDetails.jsx  
│   │   │   │   │   └── BookingAppointment.jsx  
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── appointmentSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── appointmentConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── medical-records/
│   │   │   │   ├── services/ 
│   │   │   │   │   └── medicalRecordApi.js 
│   │   │   │   ├── components/
│   │   │	│   │   ├── MedicalRecordTable.jsx 
│   │   │	│   │   ├── MedicalRecordCard.jsx 
│   │   │	│   │   ├── MedicalRecordForm.jsx 
│   │   │	│   │   ├── MedicalRecordDetails.jsx 
│   │   │	│   │   ├── MedicalRecordFilters.jsx 
│   │   │	│   │   ├── DiagnosisForm.jsx 
│   │   │	│   │   ├── ClinicalNotes.jsx  
│   │   │	│   │   ├── TreatmentPlan.jsx 
│   │   │   │   │   └── RecordTimeline.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useMedicalRecords.js 
│   │   │	│   │   ├── useMedicalRecord.js 
│   │   │	│   │   ├── useCreateMedicalRecord.js 
│   │   │   │   │   └── useMedicalRecordActions.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── MedicalRecords.jsx 
│   │   │	│   │   ├── MedicalRecordDetails.jsx
│   │   │   │   │   └── CreateMedicalRecord.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── medicalRecordSchema.js 
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── medicalRecordConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── prescriptions/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── prescriptionApi.js 
│   │   │   │   ├── components/
│   │   │	│   │   ├── PrescriptionTable.jsx 
│   │   │	│   │   ├── PrescriptionCard.jsx 
│   │   │	│   │   ├── PrescriptionForm.jsx  
│   │   │	│   │   ├── PrescriptionDetails.jsx 
│   │   │	│   │   ├── PrescriptionSearch.jsx
│   │   │	│   │   ├── PrescriptionFilters.jsx  
│   │   │	│   │   ├── PrescriptionStatus.jsx 
│   │   │	│   │   ├── MedicineSelector.jsx 
│   │   │	│   │   ├── MedicineRow.jsx 
│   │   │   │   │   └── PrintPrescription.jsx  
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── usePrescriptions.js 
│   │   │	│   │   ├── usePrescription.js 
│   │   │	│   │   ├── useCreatePrescription.js 
│   │   │   │   │   └── usePrescrptionActions.js 
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Prescriptions.jsx  
│   │   │	│   │   ├── CreatePrescription.jsx  
│   │   │	│   │   ├── EditPrescription.jsx
│   │   │   │   │   └── PrescriptionDetails.jsx  
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │   │   │   └── prescriptionSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── prescriptionConstants.js 
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── laboratory/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── LaboratoryApi.js
│   │   │   │   ├── components/
│   │   │	│   │   ├── tests/
│   │   │	│   │   │   ├── LabTestTable.jsx 
│   │   │	│   │   │   ├── LabTestCard.jsx 
│   │   │	│   │   │   ├── LabTestForm.jsx
│   │   │	│   │   │   ├── LabTestDetails.jsx 
│   │   │	│   │   │   ├── LabTestFilters.jsx
│   │   │   │   │   │   └── LabTestStatus.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── orders/
│   │   │	│   │   │   ├── LabOrderForm.jsx 
│   │   │   │   │   │   └── LabOrderDetails.jsx
│   │   │   │   │   │
│   │   │	│   │   ├── results/
│   │   │	│   │   │   ├── TestResultForm.jsx 
│   │   │   │   │   │   └── TestResultDetails.jsx  
│   │   │   │   │   │
│   │   │   │   │   └── reports/
│   │   │	│   │       ├── LabReport.jsx 
│   │   │   │   │       └── PrintLabReport.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useLabTests.js 
│   │   │	│   │   ├── useLabTest.js
│   │   │	│   │   ├── useLabOrders.js 
│   │   │	│   │   ├── useLabResults.js
│   │   │   │   │   └── useLabActions.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Laboratory.jsx 
│   │   │	│   │   ├── LabTestDetails.jsx 
│   │   │	│   │   ├── LabOrders.jsx 
│   │   │	│   │   ├── LabResults.jsx 
│   │   │   │   │   └── CreateLabOrder.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │	│   │   ├── labTestSchema.js 
│   │   │	│   │   ├── labOrderSchema.js 
│   │   │   │   │   └── labResultSchema.js
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── laboratoryConstants.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── pharmacy/
│   │   │   │   ├── api/ 
│   │   │   │   │   └── pharmacyApi.js 
│   │   │   │   │
│   │   │   │   ├── components/
│   │   │	│   │   ├── medicines/
│   │   │	│   │   │   ├── MedicineTable.jsx 
│   │   │	│   │   │   ├── MedicineCard.jsx 
│   │   │	│   │   │   ├── MedicineForm.jsx 
│   │   │	│   │   │   ├── MedicineDetails.jsx  
│   │   │   │   │   │   └── MedicineFilters.jsx 
│   │   │   │   │   │
│   │   │	│   │   ├── inventory/
│   │   │	│   │   │   ├── InventoryTable.jsx 
│   │   │	│   │   │   ├── InventoryForm.jsx 
│   │   │	│   │   │   ├── StockStatus.jsx 
│   │   │   │   │   │   └── StockAdjustmentForm.jsx  
│   │   │   │   │   │
│   │   │	│   │   ├── dispensing/
│   │   │	│   │   │   ├── PrescriptionQueue.jsx 
│   │   │	│   │   │   ├── PrescriptionCard.jsx 
│   │   │	│   │   │   ├── DispenseForm.jsx 
│   │   │   │   │   │   └── DispensingDetails.jsx 
│   │   │   │   │   │
│   │   │   │   │   └── orders/
│   │   │	│   │       ├── PharmacyOrderTable.jsx 
│   │   │	│   │       ├── PharmacyOrderDetails.jsx
│   │   │   │   │       └── PharmacySummary.jsx 
│   │   │   │   │
│   │   │   │   ├── hooks/
│   │   │	│   │   ├── useMedicines.js 
│   │   │	│   │   ├── useMedicine.js   
│   │   │	│   │   ├── useInventory.js 
│   │   │	│   │   ├── usePrescriptionQueue.js 
│   │   │	│   │   ├── useDispensing.js 
│   │   │   │   │   └── usePharmacyOrders.js
│   │   │   │   │
│   │   │   │   ├── pages/ 
│   │   │	│   │   ├── Dashboard.jsx    
│   │   │	│   │   ├── Medicines.jsx 
│   │   │	│   │   ├── MedicineDetails.jsx   
│   │   │	│   │   ├── Inventory.jsx  
│   │   │	│   │   ├── Prescriptions.jsx 
│   │   │	│   │   ├── DispensePrescription.jsx 
│   │   │   │   │   └── PharmacyOrders.jsx 
│   │   │   │   │
│   │   │   │   ├── schemas/ 
│   │   │	│   │   ├── medicineSchema.js 
│   │   │	│   │   ├── inventorySchema.js
│   │   │   │   │   └── dispensingSchema.js
│   │   │   │   │
│   │   │   │   ├── constants/ 
│   │   │   │   │   └── PharmacyConstants.js
│   │   │   │   │
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── billing/
│   │   │       ├── api/ 
│   │   │       │   └── billingApi.js 
│   │   │       ├── components/
│   │   │	    │   ├── InvoiceTable.jsx  
│   │   │	    │   ├── InvoiceCard.jsx
│   │   │	    │   ├── InvoiceForm.jsx  
│   │   │	    │   ├── InvoiceDetails.jsx  
│   │   │	    │   ├── InvoiceFilters.jsx 
│   │   │	    │   ├── InvoiceStatus.jsx 
│   │   │	    │   │   
│   │   │	    │   ├── BillingSummary.jsx  
│   │   │	    │   ├── BillingTable.jsx
│   │   │	    │   ├── BillingForm.jsx 
│   │   │	    │   │   
│   │   │	    │   ├── PaymentForm.jsx 
│   │   │	    │   ├── PaymentTable.jsx    
│   │   │	    │   ├── PaymentDetails.jsx 
│   │   │	    │   ├── PaymentStatus.jsx  
│   │   │	    │   │   
│   │   │	    │   ├── RefundForm.jsx 
│   │   │	    │   ├── RefundDetails.jsx    
│   │   │	    │   │   
│   │   │	    │   ├── PatientBilling.jsx 
│   │   │	    │   ├── OutstandingBalance.jsx 
│   │   │       │   └── PrintInvoice.jsx 
│   │   │       │
│   │   │       ├── hooks/
│   │   │	    │   ├── useInvoices.js 
│   │   │	    │   ├── useInvoice.js   
│   │   │	    │   ├── useBilling.js  
│   │   │	    │   ├── usePayments.js 
│   │   │	    │   ├── usePayment.js 
│   │   │	    │   ├── useRefunds.js 
│   │   │       │   └── useBillingActions.js
│   │   │       │
│   │   │       ├── pages/ 
│   │   │	    │   ├── Dashboard.jsx 
│   │   │	    │   ├── Invoices.jsx     
│   │   │	    │   ├── CreateInvoice.jsx 
│   │   │	    │   ├── Payments.jsx 
│   │   │       │   └── refunds.jsx 
│   │   │       │
│   │   │       ├── schemas/ 
│   │   │	    │   ├── invoiceSchema.js 
│   │   │	    │   ├── paymentSchema.js  
│   │   │       │   └── refundSchema.js  
│   │   │       │
│   │   │       ├── constants/ 
│   │   │       │   └── billingConstants.js
│   │   │       │
│   │   │       └── index.js
│   │   │
│   │   ├── services/                                                # Axios/API infrastructure 
│   │   │   ├── httpClient.js
│   │   │   ├── apiClient.js
│   │   │   ├── interceptors.js
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── hooks/                                                   # global hooks 
│   │   │   ├── useDebounce.js
│   │   │   ├── usePagination.js 
│   │   │   ├── useModal.js 
│   │   │   └── usePermissions.js 
│   │   │
│   │   ├── context/                                                 # global React context 
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── utils/                                                   # shared utitities 
│   │   │   ├── formatCurrency.js 
│   │   │   ├── formatDate.js 
│   │   │   ├── formatPhone.js
│   │   │   ├── validation.js  
│   │   │   └── helpers.js 
│   │   │
│   │   ├── constants/                                               # shared constants
│   │   │   ├── routes.js 
│   │   │   ├── status.js 
│   │   │   └── config.js 
│   │   │
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example 
│   ├── .gitignore 
│   ├── .eslint.config.js 
│   ├── packabe.json 
│   ├── vite.config.js 
│   └── README.md
│
├── medical-management-backend/
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── app.js
│   │   │   ├── routes.js
│   │   │   └── providers/
│   │   │       ├── database.js
│   │   │       └── middleware.js
│   │   │
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   ├── database.js
│   │   │   ├── cors.js
│   │   │   ├── logger.js
│   │   │   └── security.js
│   │   │
│   │   ├── modules/
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   ├── auth.repository.js
│   │   │   │   ├── auth.routes.js
│   │   │   │   ├── auth.validation.js
│   │   │   │   ├── auth.constants.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── user.controller.js
│   │   │   │   ├── user.service.js
│   │   │   │   ├── user.repository.js
│   │   │   │   ├── user.routes.js
│   │   │   │   ├── user.validation.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── patients/
│   │   │   │   ├── patient.controller.js
│   │   │   │   ├── patient.service.js
│   │   │   │   ├── patient.repository.js
│   │   │   │   ├── patient.routes.js
│   │   │   │   ├── patient.validation.js
│   │   │   │   ├── patient.mapper.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── doctors/
│   │   │   │   ├── doctor.controller.js
│   │   │   │   ├── doctor.service.js
│   │   │   │   ├── doctor.repository.js
│   │   │   │   ├── doctor.routes.js
│   │   │   │   ├── doctor.validation.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── appointments/
│   │   │   │   ├── appointment.controller.js
│   │   │   │   ├── appointment.service.js
│   │   │   │   ├── appointment.repository.js
│   │   │   │   ├── appointment.routes.js
│   │   │   │   ├── appointment.validation.js
│   │   │   │   ├── appointment.constants.js
│   │   │   │   ├── appointment.mapper.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── medical-records/
│   │   │   │   ├── medicalRecord.controller.js
│   │   │   │   ├── medicalRecord.service.js
│   │   │   │   ├── medicalRecord.repository.js
│   │   │   │   ├── medicalRecord.routes.js
│   │   │   │   ├── medicalRecord.validation.js
│   │   │   │   ├── medicalRecord.mapper.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── prescriptions/
│   │   │   │   ├── prescription.controller.js
│   │   │   │   ├── prescription.service.js
│   │   │   │   ├── prescription.repository.js
│   │   │   │   ├── prescription.routes.js
│   │   │   │   ├── prescription.validation.js
│   │   │   │   ├── prescription.mapper.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── laboratory/
│   │   │   │   ├── labTest/
│   │   │   │   ├── labOrder/
│   │   │   │   ├── labResult/
│   │   │   │   ├── laboratory.controller.js
│   │   │   │   ├── laboratory.service.js
│   │   │   │   ├── laboratory.routes.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── pharmacy/
│   │   │   │   ├── medicines/
│   │   │   │   ├── inventory/
│   │   │   │   ├── dispensing/
│   │   │   │   ├── orders/
│   │   │   │   ├── pharmacy.controller.js
│   │   │   │   ├── pharmacy.service.js
│   │   │   │   ├── pharmacy.routes.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── billing/
│   │   │   │   ├── invoices/
│   │   │   │   ├── payments/
│   │   │   │   ├── refunds/
│   │   │   │   ├── billing.controller.js
│   │   │   │   ├── billing.service.js
│   │   │   │   ├── billing.routes.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   ├── report.controller.js
│   │   │   │   ├── report.service.js
│   │   │   │   ├── report.repository.js
│   │   │   │   ├── report.routes.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── notifications/
│   │   │       ├── notification.controller.js
│   │   │       ├── notification.service.js
│   │   │       ├── notification.repository.js
│   │   │       ├── notification.routes.js
│   │   │       └── index.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authenticate.js
│   │   │   ├── authorize.js
│   │   │   ├── validate.js
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   ├── rateLimiter.js
│   │   │   ├── requestLogger.js
│   │   │   └── auditLogger.js
│   │   │
│   │   ├── database/
│   │   │   ├── prisma/
│   │   │   │   ├── schema.prisma
│   │   │   │   ├── migrations/
│   │   │   │   └── seed.js
│   │   │   └── database.js
│   │   │
│   │   ├── shared/
│   │   │   ├── errors/
│   │   │   │   ├── AppError.js
│   │   │   │   ├── ValidationError.js
│   │   │   │   ├── NotFoundError.js
│   │   │   │   └── UnauthorizedError.js
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   ├── pagination.js
│   │   │   │   ├── date.js
│   │   │   │   ├── crypto.js
│   │   │   │   └── response.js
│   │   │   │
│   │   │   ├── constants/
│   │   │   │   ├── roles.js
│   │   │   │   ├── permissions.js
│   │   │   │   └── status.js
│   │   │   │
│   │   │   └── types/
│   │   │       └── common.js
│   │   │
│   │   ├── jobs/
│   │   │   ├── appointmentReminders.js
│   │   │   ├── prescriptionExpiry.js
│   │   │   └── billingReminders.js
│   │   │
│   │   ├── docs/
│   │   │   └── openapi.yaml
│   │   │
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── uploads/
│   │   └── .gitkeep
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── prisma.config.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
