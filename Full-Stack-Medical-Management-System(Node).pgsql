Full-Stack-Medical-Management System-Directory-Structure
├── frontend(HTML, CSS, JavaScript, React)    
medical-management-system/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── App.jsx
│   │   │   ├── Provider.jsx
│   │   │   └── store.jsx
│   │   ├── routes/
│   │   │   ├── index.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── RoleRoute.jsx
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── AuthLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │	│   │   ├── api/
│   │	│   │   │   ├── dashboard.api.js
│   │	│   │   │   ├── dashboard.queries.js
│   │	│   │   │   ├── dashboard.endpoints.js
│   │	│   │   │   ├── dashboard.mapper.js
│   │	│   │   │   ├── dashboard.adapter.js
│   │	│   │   │   ├── dashboard.keys.js
│   │   │   │   │   └── dashboard.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── DashboardPage.jsx
│   │	│   │   │   ├── AdminDashboard.jsx
│   │	│   │   │   ├── DoctorDashboard.jsx
│   │	│   │   │   ├── NurseDashboard.jsx
│   │	│   │   │   ├── ReceptionistDashboard.jsx
│   │	│   │   │   ├── PharmacistDashboard.jsx
│   │   │   │   │   └── LaboratoryDashboard.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── StatCard.jsx
│   │	│   │   │   │   ├── RevenueCard.jsx
│   │	│   │   │   │   ├── AppointmentCard.jsx
│   │	│   │   │   │   ├── PatientCard.jsx
│   │	│   │   │   │   ├── DoctorCard.jsx
│   │	│   │   │   │   ├── LabTestCard.jsx
│   │	│   │   │   │   ├── InventoryCard.jsx
│   │   │   │   │   │   └── InsuranceCard.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── RevenueChart.jsx
│   │	│   │   │   │   ├── AppointmentChart.jsx
│   │	│   │   │   │   ├── PatientGrowthChart.jsx
│   │	│   │   │   │   ├── DepartmentChart.jsx
│   │	│   │   │   │   ├── DoctorPerformanceChart.jsx
│   │	│   │   │   │   ├── PrescriptionChart.jsx
│   │	│   │   │   │   ├── LabAnalyticsChart.jsx
│   │   │   │   │   │   └── InventoryChart.jsx
│   │	│   │   │   ├── widgets/
│   │	│   │   │   │   ├── QuickActions.jsx
│   │	│   │   │   │   ├── RecentAppointments.jsx
│   │	│   │   │   │   ├── RecentPatients.jsx
│   │	│   │   │   │   ├── RecentInvoices.jsx
│   │	│   │   │   │   ├── UpcomingSchedules.jsx
│   │	│   │   │   │   ├── NotificationsWidget.jsx
│   │	│   │   │   │   ├── PendingLabTests.jsx
│   │	│   │   │   │   ├── LowStockMedicines.jsx
│   │   │   │   │   │   └── RecentActivities.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── RecentPatientsTable.jsx
│   │	│   │   │   │   ├── AppointmentTable.jsx
│   │	│   │   │   │   ├── InvoiceTable.jsx
│   │	│   │   │   │   ├── PrescriptionTable.jsx
│   │   │   │   │   │   └── LabResultsTable.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── DashboardAnalytics.jsx
│   │	│   │   │   │   ├── RevenueAnalytics.jsx
│   │	│   │   │   │   ├── AppointmentAnalytics.jsx
│   │	│   │   │   │   ├── PatientAnalytics.jsx
│   │	│   │   │   │   ├── DoctorAnalytics.jsx
│   │	│   │   │   │   ├── LaboratoryAnalytics.jsx
│   │   │   │   │   │   └── InventoryAnalytics.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── DashboardFilterBar.jsx
│   │	│   │   │   │   ├── DateRangeFilter.jsx
│   │	│   │   │   │   ├── DepartmentFilter.jsx
│   │   │   │   │   │   └── BranchFilter.jsx
│   │	│   │   │   ├── shares/
│   │	│   │   │   │   ├── DashboardHeader.jsx
│   │	│   │   │   │   ├── DashboardToolbar.jsx
│   │	│   │   │   │   ├── DashboardSkeleton.jsx
│   │	│   │   │   │   ├── DashboardError.jsx
│   │	│   │   │   │   ├── EmptyDashboard.jsx
│   │   │   │   │   │   └── LastUpdatedBadge.jsx
│   │   │   │   │   └── Layout/
│   │	│   │   │       ├── DashboardGrid.jsx
│   │	│   │   │       ├── DashboardSection.jsx
│   │   │   │   │       └── DashboardContainer.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useDashboard.js
│   │	│   │   │   ├── useDashboardStats.js
│   │	│   │   │   ├── useDashboardCharts.js
│   │	│   │   │   ├── useRecentActivities.js
│   │	│   │   │   ├── useNotifications.js
│   │   │   │   │   └── useDashboardFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── dashboardSlice.js
│   │   │   │   │   └── dashboardSelectors.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── dashboard.roles.js
│   │	│   │   │   ├── dashboard.widgets.js
│   │   │   │   │   └── dashboard.permissions.js 
│   │	│   │   ├── utils/
│   │	│   │   │   ├── dashboard.helpers.js
│   │	│   │   │   ├── dashboard.formatters.js 
│   │   │   │   │   └── dashboard.calculations.js
│   │   │   │   └── types/
│   │   │   │       └── dashboard.types.js 
│   │   │   ├── patients/
│   │	│   │   ├── api/
│   │	│   │   │   ├── patients.api.js
│   │	│   │   │   ├── patients.queries.js
│   │	│   │   │   ├── patients.mutations.js
│   │	│   │   │   ├── patients.endpoints.js
│   │	│   │   │   ├── patients.mapper.js
│   │	│   │   │   ├── patients.adapter.js
│   │	│   │   │   ├── patients.keys.js
│   │	│   │   │   ├── patients.schema.js
│   │   │   │   │   └── patients.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── PatientsPage.jsx
│   │	│   │   │   ├── PatientDetailsPage.jsx
│   │	│   │   │   ├── CreatePatientPage.jsx
│   │	│   │   │   ├── EditPatientPage.js
│   │	│   │   │   ├── PatientMedicalHistoryPage.jsx
│   │	│   │   │   ├── PatientAppointmentsPage.jsx
│   │	│   │   │   ├── PatientPrescriptionsPage.jsx
│   │	│   │   │   ├── PatientBillingPage.jsx
│   │	│   │   │   ├── PatientDocumentsPage.jsx
│   │   │   │   │   └── PatientInsurancePage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── PatientCard.jsx
│   │	│   │   │   │   ├── PatientProfileCard.jsx
│   │	│   │   │   │   ├── PatientSummaryCard.jsx
│   │	│   │   │   │   ├── InsuranceCard.jsx
│   │	│   │   │   │   ├── AllergyCard.jsx
│   │   │   │   │   │   └── EmergencyContactCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── PatientsTable.jsx
│   │	│   │   │   │   ├── PatientsTableHeader.jsx
│   │	│   │   │   │   ├── PatientsTableRow.jsx
│   │	│   │   │   │   ├── AppointmentsTable.jsx
│   │	│   │   │   │   ├── PrescriptionsTable.jsx
│   │	│   │   │   │   ├── BillingTable.jsx
│   │   │   │   │   │   └── DocumentsTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── PatientForm.jsx
│   │	│   │   │   │   ├── PersonalInfoForm.jsx
│   │	│   │   │   │   ├── ContactInfoForm.jsx
│   │	│   │   │   │   ├── MedicalHistoryForm.jsx
│   │	│   │   │   │   ├── InsuranceForm.jsx
│   │	│   │   │   │   ├── EmergencyContactForm.jsx
│   │   │   │   │   │   └── PatientSearchForm.jsx
│   │	│   │   │   ├── profile/
│   │	│   │   │   │   ├── PatientProfile.jsx
│   │	│   │   │   │   ├── PatientAvatar.jsx
│   │	│   │   │   │   ├── PatientInformation.jsx
│   │	│   │   │   │   ├── PatientTimeline.jsx
│   │   │   │   │   │   └── PatientStatusBadge.jsx
│   │	│   │   │   ├── medical/
│   │	│   │   │   │   ├── MedicalHistory.jsx
│   │	│   │   │   │   ├── Allergieslist.jsx
│   │	│   │   │   │   ├── ChronicConditions.jsx
│   │	│   │   │   │   ├── VaccinationRecord.jsx
│   │	│   │   │   │   ├── VitalSigns.jsx
│   │   │   │   │   │   └── FamilyHistory.jsx
│   │	│   │   │   ├── appointments/
│   │	│   │   │   │   ├── PatientAppointments.jsx
│   │	│   │   │   │   ├── UpcommingApointments.jsx
│   │	│   │   │   │   ├── AppointmentHistory.jsx
│   │   │   │   │   │   └── AppointmentSummary.jsx
│   │	│   │   │   ├── prescriptions/
│   │	│   │   │   │   ├── PatientPrescriptions.jsx
│   │	│   │   │   │   ├── PrescriptionHistory.jsx
│   │	│   │   │   │   ├── ActiveMedications.jsx
│   │   │   │   │   │   └── PrescriptionDetails.jsx
│   │	│   │   │   ├── billing/
│   │	│   │   │   │   ├── PatientBilling.jsx
│   │	│   │   │   │   ├── OutstandingInvoices.jsx
│   │	│   │   │   │   ├── PaymentHistory.jsx
│   │   │   │   │   │   └── BillingSummary.jsx
│   │	│   │   │   ├── documents/
│   │	│   │   │   │   ├── PatientDocuments.jsx
│   │	│   │   │   │   ├── DocumentUploader.jsx
│   │	│   │   │   │   ├── DocumentPreview.jsx
│   │   │   │   │   │   └── MedicalReports.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── PatientAnalytics.jsx
│   │	│   │   │   │   ├── VisitFrequencyChart.jsx
│   │	│   │   │   │   ├── TreatmentAnalytics.jsx
│   │	│   │   │   │   ├── AgeDistributionChart.jsx
│   │   │   │   │   │   └── GenderDistributionChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── PatientFilterBar.jsx
│   │	│   │   │   │   ├── PatientSearch.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │	│   │   │   │   ├── GenderFilter.jsx
│   │   │   │   │   │   └── AgeFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreatePatientModel.jsx
│   │	│   │   │   │   ├── EditPatientModal.jsx
│   │	│   │   │   │   ├── DeletePatientModal.jsx
│   │	│   │   │   │   ├── UploadDocumentModal.jsx
│   │   │   │   │   │   └── ViewPatientModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── PatientHeader.jsx
│   │	│   │   │   │   ├── PatientToolbar.jsx
│   │	│   │   │   │   ├── PatientSkeleton.jsx
│   │	│   │   │   │   ├── PatientError.jsx
│   │	│   │   │   │   ├── EmptyPatients.jsx
│   │   │   │   │   │   └── LastVisitBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── PatientsContainer.jsx
│   │	│   │   │       ├── PatientsGrid.jsx
│   │	│   │   │       ├── PatientsSection.jsx
│   │   │   │   │       └── PatientDetailsLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── usePatients.jsx
│   │	│   │   │   ├── usePatient.js
│   │	│   │   │   ├── useCreatePatient.js
│   │	│   │   │   ├── useUpdatePatient.js
│   │	│   │   │   ├── useDeletePatient.js
│   │	│   │   │   ├── usePatientSearch.js
│   │	│   │   │   ├── usePatientFilters.js
│   │	│   │   │   ├── usePatientDocuments.js
│   │	│   │   │   ├── usePatientAnalytics.js
│   │   │   │   │   └── useMedicalHistory.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── patientsSlice.js
│   │	│   │   │   ├── patientsSelectors.js
│   │	│   │   │   ├── patientsThunks.js
│   │   │   │   │   └── patientsInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── patientStatus.js
│   │	│   │   │   ├── patientTypes.js
│   │	│   │   │   ├── bloodGroups.js
│   │	│   │   │   ├── genders.js
│   │   │   │   │   └── patientPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── patientHelpers.js
│   │	│   │   │   ├── patientFormatters.js
│   │	│   │   │   ├── patientCalculations.js
│   │	│   │   │   ├── patientValidators.js
│   │	│   │   │   ├── patientExporters.js
│   │   │   │   │   └── patientTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── patientExport.service.js
│   │	│   │   │   ├── patientDocument.servie.js
│   │	│   │   │   ├── patientAnalytics.service.js
│   │   │   │   │   └── patientNotification.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── patient.types.js
│   │	│   │   │   ├── patient.enums.js
│   │   │   │   │   └── patient.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── patients.mock.js
│   │	│   │   │   ├── patientDetails.mock.js
│   │   │   │   │   └── medicalHistory.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── patientAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── patient.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── doctors/
│   │	│   │   ├── api/
│   │	│   │   │   ├── doctors.api.js
│   │	│   │   │   ├── doctors.queries.js
│   │	│   │   │   ├── doctors.mutations.js
│   │	│   │   │   ├── doctors.endpoints.js
│   │	│   │   │   ├── doctors.mapper.js
│   │	│   │   │   ├── doctors.adapter.js
│   │	│   │   │   ├── doctors.keys.js
│   │	│   │   │   ├── doctors.schema.js
│   │   │   │   │   └── doctors.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── DoctorsPage.jsx
│   │	│   │   │   ├── DoctorDetailsPage.jsx
│   │	│   │   │   ├── CreateDoctorPage.jsx
│   │	│   │   │   ├── EditDoctorPage.js
│   │	│   │   │   ├── DoctorSchedulePage.jsx
│   │	│   │   │   ├── DoctorAppointmentsPage.jsx
│   │	│   │   │   ├── DoctorPatientsPage.jsx
│   │	│   │   │   ├── DoctorConsultationPage.jsx
│   │	│   │   │   ├── DoctorPerformancePage.jsx
│   │   │   │   │   └── DoctorAvailabilityPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── DoctorCard.jsx
│   │	│   │   │   │   ├── DoctorProfileCard.jsx
│   │	│   │   │   │   ├── DoctorSummaryCard.jsx
│   │	│   │   │   │   ├── AvailabilityCard.jsx
│   │	│   │   │   │   ├── DepartmentCard.jsx
│   │   │   │   │   │   └── PerformanceCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── DoctorsTable.jsx
│   │	│   │   │   │   ├── DoctorsTableHeader.jsx
│   │	│   │   │   │   ├── DoctorsTableRow.jsx
│   │	│   │   │   │   ├── ScheduleTable.jsx
│   │	│   │   │   │   ├── PatientsTable.jsx
│   │	│   │   │   │   ├── ConsultationsTable.jsx
│   │   │   │   │   │   └── AppointmentTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── DoctorForm.jsx
│   │	│   │   │   │   ├── DoctorProfileForm.jsx
│   │	│   │   │   │   ├── DoctorScheduleForm.jsx
│   │	│   │   │   │   ├── AvailabilityForm.jsx
│   │	│   │   │   │   ├── DepartmentAssignmentForm.jsx
│   │   │   │   │   │   └── DoctorSearchForm.jsx
│   │	│   │   │   ├── profile/
│   │	│   │   │   │   ├── DoctorProfile.jsx
│   │	│   │   │   │   ├── DoctorAvatar.jsx
│   │	│   │   │   │   ├── DoctorInformation.jsx
│   │	│   │   │   │   ├── DoctorQualifications.jsx
│   │	│   │   │   │   ├── DoctorExperience.jsx
│   │   │   │   │   │   └── DoctorStatusBadge.jsx
│   │	│   │   │   ├── Schedules/
│   │	│   │   │   │   ├── DoctorSchedule.jsx
│   │	│   │   │   │   ├── WeeklySchedule.jsx
│   │	│   │   │   │   ├── CalendarSchedule.jsx
│   │	│   │   │   │   ├── AvailabilityCalendar.jsx
│   │   │   │   │   │   └── ShiftManagement.jsx
│   │	│   │   │   ├── appointments/
│   │	│   │   │   │   ├── DoctorAppointments.jsx
│   │	│   │   │   │   ├── UpcommingApointments.jsx
│   │	│   │   │   │   ├── AppointmentHistory.jsx
│   │   │   │   │   │   └── AppointmentSummary.jsx
│   │	│   │   │   ├── patients/
│   │	│   │   │   │   ├── DoctorPatients.jsx
│   │	│   │   │   │   ├── ActivePatients.jsx
│   │	│   │   │   │   ├── PatientHistory.jsx
│   │   │   │   │   │   └── PatientOverview.jsx
│   │	│   │   │   ├── consultations/
│   │	│   │   │   │   ├── ConsultationList.jsx
│   │	│   │   │   │   ├── ConsultationDetails.jsx
│   │	│   │   │   │   ├── ConsultationNote.jsx
│   │   │   │   │   │   └── ConsultationSummary.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── DoctorAnalytics.jsx
│   │	│   │   │   │   ├── PerformanceAnalytics.jsx
│   │	│   │   │   │   ├── Appointmentnalytic.jsx
│   │	│   │   │   │   ├── PatientAnalytic.jsx
│   │	│   │   │   │   ├── RevenueAnalytics.jsx
│   │   │   │   │   │   └── ConsultationAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── AppointmentTrendChart.jsx
│   │	│   │   │   │   ├── PatientGrowthChart.jsx
│   │	│   │   │   │   ├── RevenueChart.jsx
│   │	│   │   │   │   ├── ConsultationChart.jsx
│   │	│   │   │   │   ├── SatisfactionChart.jsx
│   │   │   │   │   │   └── PerformanceChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── DoctorFilterBar.jsx
│   │	│   │   │   │   ├── DoctorSearch.jsx
│   │	│   │   │   │   ├── DepartmentFilter.jsx
│   │	│   │   │   │   ├── SpecializationFilter.jsx
│   │   │   │   │   │   └── AvailabilityFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateDoctorModal.jsx
│   │	│   │   │   │   ├── EditDoctorModal.jsx
│   │	│   │   │   │   ├── DeleteDoctorModal.jsx
│   │	│   │   │   │   ├── AssignDepartmentModal.jsx
│   │   │   │   │   │   └── ScheduleModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── DoctorHeader.jsx
│   │	│   │   │   │   ├── DoctorToolbar.jsx
│   │	│   │   │   │   ├── DoctorSkeleton.jsx
│   │	│   │   │   │   ├── DoctorError.jsx
│   │	│   │   │   │   ├── EmptyDoctors.jsx
│   │   │   │   │   │   └── LastActiveBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── DoctorsContainer.jsx
│   │	│   │   │       ├── DoctorsGrid.jsx
│   │	│   │   │       ├── DoctorsSection.jsx
│   │   │   │   │       └── DoctorDetailsLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useDoctors.jsx
│   │	│   │   │   ├── useDoctor.js
│   │	│   │   │   ├── useCreateDoctor.js
│   │	│   │   │   ├── useUpdateDoctor.js
│   │	│   │   │   ├── useDeleteDoctor.js
│   │	│   │   │   ├── useDoctorSchedule.js
│   │	│   │   │   ├── useDoctorAvailability.js
│   │	│   │   │   ├── useDoctorPatients.js
│   │	│   │   │   ├── useDoctorAnalytics.js
│   │   │   │   │   └── useDoctorFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── doctorsSlice.js
│   │	│   │   │   ├── doctorsSelectors.js
│   │	│   │   │   ├── doctorsThunks.js
│   │   │   │   │   └── doctorsInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── doctorRole.js
│   │	│   │   │   ├── specializations.js
│   │	│   │   │   ├── departments.js
│   │	│   │   │   ├── doctorStatuses.js
│   │   │   │   │   └── doctorPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── doctorHelpers.js
│   │	│   │   │   ├── doctorFormatters.js
│   │	│   │   │   ├── doctorCalculations.js
│   │	│   │   │   ├── doctorValidators.js
│   │	│   │   │   ├── doctorExporters.js
│   │   │   │   │   └── doctorTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── doctorSchedule.service.js
│   │	│   │   │   ├── doctorAnalytics.servie.js
│   │	│   │   │   ├── doctorNotification.service.js
│   │   │   │   │   └── doctorPerformance.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── doctor.types.js
│   │	│   │   │   ├── doctor.enums.js
│   │   │   │   │   └── doctor.interfaces.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── doctorAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── doctor.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── appointments/
│   │	│   │   ├── api/
│   │	│   │   │   ├── appointments.api.js
│   │	│   │   │   ├── appointments.queries.js
│   │	│   │   │   ├── appointments.mutations.js
│   │	│   │   │   ├── appointments.endpoints.js
│   │	│   │   │   ├── appointments.adapter.js
│   │	│   │   │   ├── appointments.mapper.js
│   │	│   │   │   ├── appointments.keys.js
│   │	│   │   │   ├── appointments.schema.js
│   │   │   │   │   └── appointments.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── AppointmentsPage.jsx
│   │	│   │   │   ├── AppointmentDetailsPage.jsx
│   │	│   │   │   ├── CreateAppointmentPage.jsx
│   │	│   │   │   ├── EditAppointmentPage.js
│   │	│   │   │   ├── CalendarPage.jsx
│   │	│   │   │   ├── QueueManagementPage.jsx
│   │	│   │   │   ├── TelemedicinePage.jsx
│   │	│   │   │   ├── DoctorSchedulePage.jsx
│   │	│   │   │   ├── PatientAppointmentsPage.jsx
│   │   │   │   │   └── AppoinmentAnalyticsPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── AppointmentCard.jsx
│   │	│   │   │   │   ├── AppointmentsSummaryCard.jsx
│   │	│   │   │   │   ├── UpcomingAppointmentCard.jsx
│   │	│   │   │   │   ├── QueueCard.jsx
│   │	│   │   │   │   ├── TelemedicineCard.jsx
│   │   │   │   │   │   └── DoctorScheduleCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── AppointmentsTable.jsx
│   │	│   │   │   │   ├── AppointmentsTableHeader.jsx
│   │	│   │   │   │   ├── AppointmentsTableRow.jsx
│   │	│   │   │   │   ├── QueueTable.jsx
│   │	│   │   │   │   ├── DoctorAppointmentsTable.jsx
│   │   │   │   │   │   └── PatientAppointmentsTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── AppointmentForm.jsx
│   │	│   │   │   │   ├── AppointmentBookingForm.jsx
│   │	│   │   │   │   ├── AppointmentRescheduleForm.jsx
│   │	│   │   │   │   ├── AppointmentCancelForm.jsx
│   │	│   │   │   │   ├── DoctorSelectionForm.jsx
│   │   │   │   │   │   └── AppointmentSearchForm.jsx
│   │	│   │   │   ├── calendar/
│   │	│   │   │   │   ├── AppointmentCalendar.jsx
│   │	│   │   │   │   ├── CalendarToolbar.jsx
│   │	│   │   │   │   ├── DayView.jsx
│   │	│   │   │   │   ├── WeekView.jsx
│   │	│   │   │   │   ├── MonthView.jsx
│   │   │   │   │   │   └── CalendarEvent.jsx
│   │	│   │   │   ├── scheduling/
│   │	│   │   │   │   ├── DoctorSchedule.jsx
│   │	│   │   │   │   ├── TimeSlotPicker.jsx
│   │	│   │   │   │   ├── AvailabilityViewer.jsx
│   │	│   │   │   │   ├── ScheduleManager.jsx
│   │   │   │   │   │   └── SlotAvailabilityBadge.jsx
│   │	│   │   │   ├── queue/
│   │	│   │   │   │   ├── QueueManagement.jsx
│   │	│   │   │   │   ├── QueueList.jsx
│   │	│   │   │   │   ├── QueueItem.jsx
│   │	│   │   │   │   ├── WaitingPatients.jsx
│   │   │   │   │   │   └── QueueStatusBadge.jsx
│   │	│   │   │   ├── telemedicine/
│   │	│   │   │   │   ├── TelemedicineSession.jsx
│   │	│   │   │   │   ├── VideoConsultation.jsx
│   │	│   │   │   │   ├── SessionControls.jsx
│   │	│   │   │   │   ├── MeetingInformation.jsx
│   │   │   │   │   │   └── ConsultationNotes.jsx
│   │	│   │   │   ├── reminders/
│   │	│   │   │   │   ├── ReminderSettings.jsx
│   │	│   │   │   │   ├── ReminderHistory.jsx
│   │	│   │   │   │   ├── SMSReminder.jsx
│   │	│   │   │   │   ├── EmailReminder.jsx
│   │   │   │   │   │   └── RemindersStatusBadge.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── AppointmentAnalytics.jsx
│   │	│   │   │   │   ├── BookingAnalytics.jsx
│   │	│   │   │   │   ├── CancellationAnalytics.jsx
│   │	│   │   │   │   ├── DoctorUtilizationAnalytics.jsx
│   │   │   │   │   │   └── PatientAttendanceAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── AppointmentTrendChart.jsx
│   │	│   │   │   │   ├── DailyBookingChart.jsx
│   │	│   │   │   │   ├── DoctorUtilizationChart.jsx
│   │	│   │   │   │   ├── CancellationChart.jsx
│   │	│   │   │   │   ├── AttendancelChart.jsx
│   │   │   │   │   │   └── QueueAnalyticsChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── AppointmentFilterBar.jsx
│   │	│   │   │   │   ├── AppointmentSearch.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │	│   │   │   │   ├── DoctorFilter.jsx
│   │	│   │   │   │   ├── DepartmentFilter.jsx
│   │   │   │   │   │   └── DateRangeFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateAppointmentModal.jsx
│   │	│   │   │   │   ├── EditAppointmentModal.jsx
│   │	│   │   │   │   ├── CancelAppointmentModal.jsx
│   │	│   │   │   │   ├── RescheduleAppointmentModal.jsx
│   │   │   │   │   │   └── AppointmentDetailsMadal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── AppointmentHeader.jsx
│   │	│   │   │   │   ├── AppointmentToolbar.jsx
│   │	│   │   │   │   ├── AppointmentSkeleton.jsx
│   │	│   │   │   │   ├── AppointmentError.jsx
│   │	│   │   │   │   ├── EmptyAppointments.jsx
│   │   │   │   │   │   └── AppointmentStatusBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── AppointmentsContainer.jsx
│   │	│   │   │       ├── AppointmentsGrid.jsx
│   │	│   │   │       ├── AppointmentsSection.jsx
│   │   │   │   │       └── AppointmentDetailsLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useAppointments.jsx
│   │	│   │   │   ├── useAppointment.js
│   │	│   │   │   ├── useCreateAppointment.js
│   │	│   │   │   ├── useUpdateAppointment.js
│   │	│   │   │   ├── useCancelAppointment.js
│   │	│   │   │   ├── useRescheduleAppointment.js
│   │	│   │   │   ├── useAppointmentCalendar.js
│   │	│   │   │   ├── useDoctorAvailability.js
│   │	│   │   │   ├── useAppointmentAnalytics.js
│   │   │   │   │   └── useAppointmentFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── appointmentsSlice.js
│   │	│   │   │   ├── appointmentsSelectors.js
│   │	│   │   │   ├── appointmentsThunks.js
│   │   │   │   │   └── appointmentInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── appointmentStatuses.js
│   │	│   │   │   ├── appointmentTypes.js
│   │	│   │   │   ├── reminderTypes.js
│   │	│   │   │   ├── queueStatuses.js
│   │   │   │   │   └── appointmentPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── appointmentHelpers.js
│   │	│   │   │   ├── appointmentFormatters.js
│   │	│   │   │   ├── appointmentCalculations.js
│   │	│   │   │   ├── appointmentValidators.js
│   │	│   │   │   ├── appointmentExporters.js
│   │   │   │   │   └── appointmentTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── scheduling.service.js
│   │	│   │   │   ├── reminder.service.js
│   │	│   │   │   ├── telemedicine.servie.js
│   │	│   │   │   ├── queue.service.js
│   │   │   │   │   └── appointmentAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── appointment.types.js
│   │	│   │   │   ├── appointment.enums.js
│   │   │   │   │   └── appointment.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── appointments.mock.js
│   │	│   │   │   ├── calendar.mock.js
│   │   │   │   │   └── queue.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── appointmentAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── appointment.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── consultations/
│   │	│   │   ├── api/
│   │	│   │   ├── pages/
│   │	│   │   ├── components/
│   │   │   │   └── hooks/
│   │   │   ├── prescription/
│   │	│   │   ├── api/
│   │	│   │   │   ├── prescriptions.api.js
│   │	│   │   │   ├── prescriptions.queries.js
│   │	│   │   │   ├── prescriptions.mutations.js
│   │	│   │   │   ├── prescriptions.endpoints.js
│   │	│   │   │   ├── prescriptions.adapter.js
│   │	│   │   │   ├── prescriptions.mapper.js
│   │	│   │   │   ├── prescriptions.keys.js
│   │	│   │   │   ├── prescriptions.schema.js
│   │   │   │   │   └── prescriptions.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── PrescriptionsPage.jsx
│   │	│   │   │   ├── PrescriptionDetailsPage.jsx
│   │	│   │   │   ├── CreatePrescriptionPage.jsx
│   │	│   │   │   ├── EditPrescriptionPage.jsx
│   │	│   │   │   ├── PrescriptionHistoryPage.jsx
│   │	│   │   │   ├── ActivePrescriptionsPage.jsx
│   │	│   │   │   ├── RefillRequestsPage.jsx
│   │	│   │   │   ├── PrescriptionTemplatePage.jsx
│   │   │   │   │   └── PrescriptionPrintPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── PrescriptionCard.jsx
│   │	│   │   │   │   ├── MedicationCardCard.jsx
│   │	│   │   │   │   ├── ActivePrescriptionCard.jsx
│   │	│   │   │   │   ├── RefillRequestCard.jsx
│   │	│   │   │   │   ├── ControlledMedicationCard.jsx
│   │   │   │   │   │   └── PrescriptionSummaryCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── PrescriptionsTable.jsx
│   │	│   │   │   │   ├── PrescriptionTableHeader.jsx
│   │	│   │   │   │   ├── PrescriptionTableRow.jsx
│   │	│   │   │   │   ├── MedicationTable.jsx
│   │	│   │   │   │   ├── RefillRequestsTable.jsx
│   │   │   │   │   │   └── PrescriptionHistoryTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── prescriptionForm.jsx
│   │	│   │   │   │   ├── MedicationForm.jsx
│   │	│   │   │   │   ├── DosageForm.jsx
│   │	│   │   │   │   ├── RefillRequestForm.jsx
│   │	│   │   │   │   ├── PrescriptionTemplateForm.jsx
│   │   │   │   │   │   └── MedicationSearchForm.jsx
│   │	│   │   │   ├── medications/
│   │	│   │   │   │   ├── MedicationSelector.jsx
│   │	│   │   │   │   ├── MedicationList.jsx
│   │	│   │   │   │   ├── MedicationItem.jsx
│   │	│   │   │   │   ├── DosageInstructions.jsx
│   │	│   │   │   │   ├── DrugInteractionAlert.jsx
│   │   │   │   │   │   └── AllergyWarning.jsx
│   │	│   │   │   ├── history/
│   │	│   │   │   │   ├── PrescriptionHistory.jsx
│   │	│   │   │   │   ├── ActivePrescriptions.jsx
│   │	│   │   │   │   ├── ExpiredPrescriptions.jsx
│   │	│   │   │   │   ├── MedicationTimeline.jsx
│   │   │   │   │   │   └── RefillHistory.jsx
│   │	│   │   │   ├── templates/
│   │	│   │   │   │   ├── PrescriptionTemplates.jsx
│   │	│   │   │   │   ├── TemplateList.jsx
│   │	│   │   │   │   ├── TemplateCard.jsx
│   │   │   │   │   │   └── TemplateSelector.jsx
│   │	│   │   │   ├── pharmacy/
│   │	│   │   │   │   ├── PharmacyIntegration.jsx
│   │	│   │   │   │   ├── DispensingStatus.jsx
│   │	│   │   │   │   ├── PharmacyQueue.jsx
│   │	│   │   │   │   ├── PrescriptionTracking.jsx
│   │   │   │   │   │   └── DespensedMedicationList.jsx
│   │	│   │   │   ├── print/
│   │	│   │   │   │   ├── PrescriptionPrint.jsx
│   │	│   │   │   │   ├── PrescriptionPDF.jsx
│   │	│   │   │   │   ├── PrescriiptionPreview.jsx
│   │	│   │   │   │   ├── DoctorSignature.jsx
│   │   │   │   │   │   └── QRCodeSection.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── PrescriptionAnalytics.jsx
│   │	│   │   │   │   ├── MedicationUsageAnalytics.jsx
│   │	│   │   │   │   ├── RefillAnalytics.jsx
│   │	│   │   │   │   ├── DoctorPrescribingAnalytics.jsx
│   │   │   │   │   │   └── ControlledDrugAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── PrescriptionTrendChart.jsx
│   │	│   │   │   │   ├── MedicationUsageChart.jsx
│   │	│   │   │   │   ├── RefillRateChart.jsx
│   │	│   │   │   │   ├── DoctorPrescriptionChart.jsx
│   │   │   │   │   │   └── MedicationCategoryChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── PrescriptionFilterBar.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │	│   │   │   │   ├── DoctorFilter.jsx
│   │	│   │   │   │   ├── PatientFilter.jsx
│   │	│   │   │   │   ├── MedicationFilter.jsx
│   │   │   │   │   │   └── DateRangeFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreatePrescriptionModal.jsx
│   │	│   │   │   │   ├── EditPrescriptionModal.jsx
│   │	│   │   │   │   ├── DeletePrescriptionModal.jsx
│   │	│   │   │   │   ├── RefillRequestModal.jsx
│   │   │   │   │   │   └── PrescriptionDetailsMadal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── PrescriptionHeader.jsx
│   │	│   │   │   │   ├── PrescriptionToolbar.jsx
│   │	│   │   │   │   ├── PrescriptionSkeleton.jsx
│   │	│   │   │   │   ├── PrescriptionError.jsx
│   │	│   │   │   │   ├── EmptyPrescriptions.jsx
│   │   │   │   │   │   └── prescriptionStatusBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── prescriptionsContainer.jsx
│   │	│   │   │       ├── prescriptionsGrid.jsx
│   │	│   │   │       ├── PrescriptionsSection.jsx
│   │   │   │   │       └── PrescriptionDetailsLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── usePrescriptions.jsx
│   │	│   │   │   ├── usePrescription.js
│   │	│   │   │   ├── useCreatePrescription.js
│   │	│   │   │   ├── useUpdatePrescription.js
│   │	│   │   │   ├── useDeletePrescription.js
│   │	│   │   │   ├── usePrescriptionHistory.js
│   │	│   │   │   ├── useRefillRequests.js
│   │	│   │   │   ├── useMedicationSearch.js
│   │	│   │   │   ├── usePrescriptionAnalytics.js
│   │   │   │   │   └── usePrescriptionFilters.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── prescriptionStatuses.js
│   │	│   │   │   ├── medicationCategories.js
│   │	│   │   │   ├── dosageUnits.js
│   │	│   │   │   ├── refillStatuses.js
│   │   │   │   │   └── prescriptionPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── prescriptionHelpers.js
│   │	│   │   │   ├── prescriptionFormatters.js
│   │	│   │   │   ├── prescriptionCalculations.js
│   │	│   │   │   ├── prescriptionValidators.js
│   │	│   │   │   ├── prescriptionExporters.js
│   │   │   │   │   └── prescriptionTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── prescriptionPdf.service.js
│   │	│   │   │   ├── medicationInteraction.service.js
│   │	│   │   │   ├── refill.servie.js
│   │	│   │   │   ├── pharmacyIntegration.service.js
│   │   │   │   │   └── prescriptionAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── prescription.types.js
│   │	│   │   │   ├── prescription.enums.js
│   │   │   │   │   └── prescription.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── prescriptions.mock.js
│   │	│   │   │   ├── medications.mock.js
│   │   │   │   │   └── prescriptionHistory.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── prescriptionAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── prescription.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── pharmacy/
│   │	│   │   ├── api/
│   │	│   │   │   ├── pharmacy.api.js
│   │	│   │   │   ├── pharmacy.queries.js
│   │	│   │   │   ├── pharmacy.mutations.js
│   │	│   │   │   ├── pharmacy.endpoints.js
│   │	│   │   │   ├── pharmacy.adapter.js
│   │	│   │   │   ├── pharmacy.mapper.js
│   │	│   │   │   ├── pharmacy.keys.js
│   │	│   │   │   ├── pharmacy.schema.js
│   │   │   │   │   └── pharmacy.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── PharmacyDashboardPage.jsx
│   │	│   │   │   ├── MedicinesPage.jsx
│   │	│   │   │   ├── MedicineDetailsPage.jsx
│   │	│   │   │   ├── InventoryPage.jsx
│   │	│   │   │   ├── DispensingPage.jsx
│   │	│   │   │   ├── PrescriptionQueuePage.jsx
│   │	│   │   │   ├── SuppliersPage.jsx
│   │	│   │   │   ├── PurchaseOrdersPage.jsx
│   │	│   │   │   ├── ExpiryManagementPage.jsx
│   │   │   │   │   └── PharmacyAnalyticssPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── MedicineCard.jsx
│   │	│   │   │   │   ├── InventoryCard.jsx
│   │	│   │   │   │   ├── LowStockCard.jsx
│   │	│   │   │   │   ├── ExpiringMedicineCard.jsx
│   │	│   │   │   │   ├── SupplierCard.jsx
│   │   │   │   │   │   └── DispensingCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── MedicinesTable.jsx
│   │	│   │   │   │   ├── MedicinesTableHeader.jsx
│   │	│   │   │   │   ├── MedicinesTableRow.jsx
│   │	│   │   │   │   ├── InventoryTable.jsx
│   │	│   │   │   │   ├── SupplierTable.jsx
│   │	│   │   │   │   ├── PurchaseOrderTable.jsx
│   │	│   │   │   │   ├── PrescriptionQueueTable.jsx
│   │   │   │   │   │   └── DispensingHistoryTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── MedicineForm.jsx
│   │	│   │   │   │   ├── InventoryForm.jsx
│   │	│   │   │   │   ├── SupplierForm.jsx
│   │	│   │   │   │   ├── PurchaseOrderForm.jsx
│   │	│   │   │   │   ├── DispensingMedicineForm.jsx
│   │   │   │   │   │   └── StockAdjustmentForm.jsx
│   │	│   │   │   ├── Inventory/
│   │	│   │   │   │   ├── InventoryManagement.jsx
│   │	│   │   │   │   ├── StockLevels.jsx
│   │	│   │   │   │   ├── BatchManagement.jsx
│   │	│   │   │   │   ├── ExpiryTracking.jsx
│   │	│   │   │   │   ├── StockTransfer.jsx
│   │   │   │   │   │   └── InventoryStatusBadge.jsx
│   │	│   │   │   ├── medicines/
│   │	│   │   │   │   ├── MedicineProfile.jsx
│   │	│   │   │   │   ├── MedicineInformation.jsx
│   │	│   │   │   │   ├── DosageInformation.jsx
│   │	│   │   │   │   ├── SideEffectsPanel.jsx
│   │	│   │   │   │   ├── ContraindicationsPanel.jsx
│   │   │   │   │   │   └── MedicineCategoryBadge.jsx
│   │	│   │   │   ├── despensing/
│   │	│   │   │   │   ├── PrescriptionQueue.jsx
│   │	│   │   │   │   ├── DispensingWorkflow.jsx
│   │	│   │   │   │   ├── DispenseMedicine.jsx
│   │	│   │   │   │   ├── DispensingHistory.jsx
│   │   │   │   │   │   └── DispensingStatusBadge.jsx
│   │	│   │   │   ├── suppliers/
│   │	│   │   │   │   ├── SupplierList.jsx
│   │	│   │   │   │   ├── SupplierProfile.jsx
│   │	│   │   │   │   ├── SupplierContracts.jsx
│   │	│   │   │   │   ├── SupplierPerformance.jsx
│   │   │   │   │   │   └── SupplierContactCard.jsx
│   │	│   │   │   ├── purchase-order/
│   │	│   │   │   │   ├── PurchaseOrders.jsx
│   │	│   │   │   │   ├── PurchaseOrderDetails.jsx
│   │	│   │   │   │   ├── GoodsReceiving.jsx
│   │	│   │   │   │   ├── InvoiceMatching.jsx
│   │   │   │   │   │   └── PurchaseOrderStatusBadge.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── PharmacyAnalytics.jsx
│   │	│   │   │   │   ├── InventoryAnalytics.jsx
│   │	│   │   │   │   ├── DispensingAnalytics.jsx
│   │	│   │   │   │   ├── SupplierAnalytics.jsx
│   │   │   │   │   │   └── FinanceAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── InventoryTrendChart.jsx
│   │	│   │   │   │   ├── MedicineUsageChart.jsx
│   │	│   │   │   │   ├── DispensingTrendChart.jsx
│   │	│   │   │   │   ├── ExpiryRiskChart.jsx
│   │	│   │   │   │   ├── SupplierPerformanceChart.jsx
│   │   │   │   │   │   └── StockValueChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── PharmacyFilterBar.jsx
│   │	│   │   │   │   ├── MedicineSearch.jsx
│   │	│   │   │   │   ├── CategoryFilter.jsx
│   │	│   │   │   │   ├── SupplierFilter.jsx
│   │	│   │   │   │   ├── StockStatusFilter.jsx
│   │   │   │   │   │   └── ExpiryFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateMedicineModal.jsx 
│   │	│   │   │   │   ├── EditMedicineModal.jsx
│   │	│   │   │   │   ├── DeleteMedicineModal.jsx
│   │	│   │   │   │   ├── DispenseMedicineModal.jsx
│   │	│   │   │   │   ├── StockAdjustmentModel.jsx
│   │   │   │   │   │   └── PurchaseOrderModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── PharmacyHeader .jsx
│   │	│   │   │   │   ├── PharmacyToolbar.jsx
│   │	│   │   │   │   ├── PharmacySkeleton.jsx
│   │	│   │   │   │   ├── PharmacyError.jsx
│   │	│   │   │   │   ├── EmptyPharmacy.jsx
│   │   │   │   │   │   └── LastInventoryUpdateBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── pharmacyContainer.jsx
│   │	│   │   │       ├── pharmacyGrid.jsx
│   │	│   │   │       ├── PhamacySection.jsx
│   │   │   │   │       └── PharmacyDashboardLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useMedicine.jsx
│   │	│   │   │   ├── useMedicine.js
│   │	│   │   │   ├── useInventory.js
│   │	│   │   │   ├── useDispensing.js
│   │	│   │   │   ├── useDeletePrescriptionQueue.js
│   │	│   │   │   ├── useSuppliers.js
│   │	│   │   │   ├── usePurchaseOrders.js
│   │	│   │   │   ├── usePharmacyAnalytics.js
│   │	│   │   │   ├── useExpiryTracking.js
│   │   │   │   │   └── usePharmacyFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── pharmacySlice.js
│   │	│   │   │   ├── pharmacySelectors.js
│   │	│   │   │   ├── pharmacyThunks.js
│   │   │   │   │   └── pharmacyInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── medicineCategories.js
│   │	│   │   │   ├── inentoryStatuses.js
│   │	│   │   │   ├── depensingStatuses.js
│   │	│   │   │   ├── purchaseOrderStatuses.js
│   │	│   │   │   ├── supplierStatuses.js
│   │   │   │   │   └── pharmacyPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── pharmacyHelpers.js
│   │	│   │   │   ├── pharmacyFormatters.js
│   │	│   │   │   ├── pharmacyCalculations.js
│   │	│   │   │   ├── pharmacyValidators.js
│   │	│   │   │   ├── pharmacyExporters.js
│   │   │   │   │   └── pharmacyTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── inventory.service.js
│   │	│   │   │   ├── depensing.service.js
│   │	│   │   │   ├── supplier.service.js
│   │	│   │   │   ├── purchaseOrder.service.js
│   │	│   │   │   ├── expiryMonitoring.service.js
│   │   │   │   │   └── pharmacyAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── pharmacy.types.js
│   │	│   │   │   ├── pharmacy.enums.js
│   │   │   │   │   └── pharmacy.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── medicines.mock.js
│   │	│   │   │   ├── inventory.mock.js
│   │	│   │   │   ├── suppliers.mock.js
│   │   │   │   │   └── depensing.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── pharmacyAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── pharmacy.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── laboratory/
│   │	│   │   ├── api/
│   │	│   │   │   ├── laboratory.api.js
│   │	│   │   │   ├── laboratory.queries.js
│   │	│   │   │   ├── laboratory.mutations.js
│   │	│   │   │   ├── laboratory.endpoints.js
│   │	│   │   │   ├── laboratory.adapter.js
│   │	│   │   │   ├── laboratory.mapper.js
│   │	│   │   │   ├── laboratory.keys.js
│   │	│   │   │   ├── laboratory.schema.js
│   │   │   │   │   └── laboratory.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── LaboratoryDashboardPage.jsx
│   │	│   │   │   ├── LabTestsPage.jsx
│   │	│   │   │   ├── LabTestDetailsPage.jsx
│   │	│   │   │   ├── TestRequestsPage.jsx
│   │	│   │   │   ├── SpecimenTrackingPage.jsx
│   │	│   │   │   ├── ResultEntryPage.jsx
│   │	│   │   │   ├── LabReportsPage.jsx
│   │	│   │   │   ├── QualityControlPage.jsx
│   │	│   │   │   ├── EquipmentPage.jsx
│   │   │   │   │   └── LaboratoryAnalyticsPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── LabTestCard.jsx
│   │	│   │   │   │   ├── TestRequestCard.jsx
│   │	│   │   │   │   ├── SpecimenCard.jsx
│   │	│   │   │   │   ├── LabReportCard.jsx
│   │	│   │   │   │   ├── EquipmentCard.jsx
│   │   │   │   │   │   └── QualityControlCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── LabTestsTable.jsx
│   │	│   │   │   │   ├── LabTestsTableHeader.jsx
│   │	│   │   │   │   ├── LabTestsTableRow.jsx
│   │	│   │   │   │   ├── TestRequestsTable.jsx
│   │	│   │   │   │   ├── SpecimensTable.jsx
│   │	│   │   │   │   ├── LabResultsTable.jsx
│   │	│   │   │   │   ├── ReportsTable.jsx
│   │   │   │   │   │   └── EquipmentTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── LabTestForm.jsx
│   │	│   │   │   │   ├── TestRequestForm.jsx
│   │	│   │   │   │   ├── SpecimenForm.jsx
│   │	│   │   │   │   ├── ResultEntryForm.jsx
│   │	│   │   │   │   ├── RefreshceRangeForm.jsx
│   │   │   │   │   │   └── EquipmentForm.jsx
│   │	│   │   │   ├── tests/
│   │	│   │   │   │   ├── LabTestProfile.jsx
│   │	│   │   │   │   ├── TestCagories.jsx
│   │	│   │   │   │   ├── TestInformation.jsx
│   │	│   │   │   │   ├── RefreshRange.jsx
│   │	│   │   │   │   ├── TestPricing.jsx
│   │   │   │   │   │   └── TestStatusBadge.jsx
│   │	│   │   │   ├── Requests/
│   │	│   │   │   │   ├── TestRequests.jsx
│   │	│   │   │   │   ├── RequestDetails.jsx
│   │	│   │   │   │   ├── PendingRequests.jsx
│   │	│   │   │   │   ├── AssignedRequests.jsx
│   │   │   │   │   │   └── RequestStateBadge.jsx
│   │	│   │   │   ├── specimens/
│   │	│   │   │   │   ├── SpecimenTracking.jsx
│   │	│   │   │   │   ├── SpecimenCollection.jsx
│   │	│   │   │   │   ├── SpecimenProcessing.jsx
│   │	│   │   │   │   ├── SpecimenChainOfCustody.jsx
│   │   │   │   │   │   └── SpecimenStatusBadge.jsx
│   │	│   │   │   ├── results/
│   │	│   │   │   │   ├── LabReports.jsx
│   │	│   │   │   │   ├── ReportViewer.jsx
│   │	│   │   │   │   ├── ReportPreview.jsx
│   │	│   │   │   │   ├── ReportPDF.jsx
│   │	│   │   │   │   ├── ReportPrint.jsx
│   │   │   │   │   │   └── ReportQRCode.jsx
│   │	│   │   │   ├── equipment/
│   │	│   │   │   │   ├── EquipmentList.jsx
│   │	│   │   │   │   ├── EquipmentProfile.jsx
│   │	│   │   │   │   ├── MaintenanceSchedule.jsx
│   │	│   │   │   │   ├── CalibrationTracker.jsx
│   │   │   │   │   │   └── EquipmentStatusBadge.jsx
│   │	│   │   │   ├── quality-control/
│   │	│   │   │   │   ├── QualityControl.jsx
│   │	│   │   │   │   ├── QCResults.jsx
│   │	│   │   │   │   ├── QCAnalytics.jsx
│   │	│   │   │   │   ├── ComplianceTracker.jsx
│   │   │   │   │   │   └── QCStatusBadge.jsx
│   │	│   │   │   ├── Analytics/
│   │	│   │   │   │   ├── LaboratoryAnalytics.jsx
│   │	│   │   │   │   ├── TestVolumeAnalytics.jsx
│   │	│   │   │   │   ├── TurnaroundTimeAnalytics.jsx
│   │	│   │   │   │   ├── RevenueAnalytics.jsx
│   │	│   │   │   │   ├── EquipmentAnalytics.jsx
│   │   │   │   │   │   └── QualityAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── TestValueChart.jsx
│   │	│   │   │   │   ├── TurnaroundTimeChart.jsx
│   │	│   │   │   │   ├── RevenueChart.jsx
│   │	│   │   │   │   ├── SpecimenTrendChart.jsx
│   │	│   │   │   │   ├── EquipmentUsageChart.jsx
│   │   │   │   │   │   └── QualityMetricsChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── LaboratoryFilterBar.jsx
│   │	│   │   │   │   ├── TestCategoryFilter.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │	│   │   │   │   ├── TechnicianFilter.jsx
│   │	│   │   │   │   ├── DateRangeFilter.jsx
│   │   │   │   │   │   └── PriorityFilter.jsx 
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateLabTestModal.jsx
│   │	│   │   │   │   ├── EditLabTestModal.jsx
│   │	│   │   │   │   ├── DeleteLabTestModal.jsx
│   │	│   │   │   │   ├── ResultEntryModal.jsx
│   │	│   │   │   │   ├── ApproveResultModal.jsx
│   │   │   │   │   │   └── ReportPreviewModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── LaboratoryHeader.jsx
│   │	│   │   │   │   ├── LaboratoryToolbar.jsx
│   │	│   │   │   │   ├── LaboratorySkeleton.jsx
│   │	│   │   │   │   ├── LaboratoryError.jsx
│   │	│   │   │   │   ├── EmptyLabratory.jsx
│   │   │   │   │   │   └── LastUpdatedBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── LaboratoryContainer.jsx
│   │	│   │   │       ├── LaboratoryGrid.jsx
│   │	│   │   │       ├── LaboratorySection.jsx
│   │   │   │   │       └── LaboratoryDashboardLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useLabTests.jsx
│   │	│   │   │   ├── useLabTest.js
│   │	│   │   │   ├── useTestRequests.js
│   │	│   │   │   ├── useSpecimens.js
│   │	│   │   │   ├── useLabResults.js
│   │	│   │   │   ├── useLabReports.js
│   │	│   │   │   ├── useQualityControl.js
│   │	│   │   │   ├── useEquipment.js
│   │	│   │   │   ├── useLaboratoryAnalytics.js
│   │   │   │   │   └── useLaboratoryFilter.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── laboratorySlice.js
│   │	│   │   │   ├── laboratorySelectors.js
│   │	│   │   │   ├── laboratoryThunks.js
│   │   │   │   │   └── laboratoryInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── testCategories.js
│   │	│   │   │   ├── testStatuses.js
│   │	│   │   │   ├── specimenStatuses.js
│   │	│   │   │   ├── resultStatuses.js
│   │	│   │   │   ├── qcStatuses.js
│   │   │   │   │   └── laboratoryPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── loboratoryHelpers.js
│   │	│   │   │   ├── laboratoryFormatters.js
│   │	│   │   │   ├── laboratoryCalculations.js
│   │	│   │   │   ├── laboratoryValidators.js
│   │	│   │   │   ├── laboratoryExporters.js
│   │   │   │   │   └── laboratoryTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── specimenTracking.service.js
│   │	│   │   │   ├── resultValidation.service.js
│   │	│   │   │   ├── reportGeneration.service.js
│   │	│   │   │   ├── qualityControl.service.js
│   │	│   │   │   ├── equipmentManagement.service.js
│   │   │   │   │   └── laboratoryAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── laboratory.types.js
│   │	│   │   │   ├── laboratory.enums.js
│   │   │   │   │   └── laboratory.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── labTests.js
│   │	│   │   │   ├── specimens.mock.js
│   │	│   │   │   ├── report.mock.js
│   │   │   │   │   └── analytics.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── laboratoryAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── laboratory.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── billing/
│   │	│   │   ├── api/
│   │	│   │   │   ├── billing.api.js
│   │	│   │   │   ├── billing.queries.js
│   │	│   │   │   ├── billing.mutations.js
│   │	│   │   │   ├── billing.endpoints.js
│   │	│   │   │   ├── billing.adapter.js
│   │	│   │   │   ├── billing.mapper.js
│   │	│   │   │   ├── billing.keys.js
│   │	│   │   │   ├── billing.schema.js
│   │   │   │   │   └── billing.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── BillingDashboardPage.jsx
│   │	│   │   │   ├── InvoicePage.jsx
│   │	│   │   │   ├── InvoiceDetailsPage.jsx
│   │	│   │   │   ├── CreateInvoicePage.jsx
│   │	│   │   │   ├── PaymentsPage.jsx
│   │	│   │   │   ├── PaymentDetailsPage.jsx
│   │	│   │   │   ├── InsuranceClaimsPage.jsx
│   │	│   │   │   ├── RefundsPage.jsx
│   │	│   │   │   ├── RevenueReportsPage.jsx
│   │   │   │   │   └── FinancialAnalyticsPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── InvoiceCard.jsx
│   │	│   │   │   │   ├── PaymentCard.jsx
│   │	│   │   │   │   ├── RevenueCard.jsx
│   │	│   │   │   │   ├── OutstandingBalanceCard.jsx
│   │	│   │   │   │   ├── InsuranceClaimCard.jsx
│   │   │   │   │   │   └── RefundCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── InvoicesTable.jsx
│   │	│   │   │   │   ├── InvoicesTableHeader.jsx
│   │	│   │   │   │   ├── InvoiceTableRow.jsx
│   │	│   │   │   │   ├── PaymentsTable.jsx
│   │	│   │   │   │   ├── InsuranceClaimsTable.jsx
│   │	│   │   │   │   ├── RefundsTable.jsx
│   │	│   │   │   │   ├── RevenueTable.jsx
│   │   │   │   │   │   └── OutstandingInvoicesTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── InvoiceForm.jsx
│   │	│   │   │   │   ├── PaymentForm.jsx
│   │	│   │   │   │   ├── InsuranceClaimForm.jsx
│   │	│   │   │   │   ├── RefundForm.jsx
│   │	│   │   │   │   ├── BillingAdjustmentForm.jsx
│   │   │   │   │   │   └── PaymentMethodForm.jsx
│   │	│   │   │   ├── invoices/
│   │	│   │   │   │   ├── InvoiceList.jsx
│   │	│   │   │   │   ├── InvoiceDetails.jsx
│   │	│   │   │   │   ├── InvoiceItems.jsx
│   │	│   │   │   │   ├── InvoiceSummary.jsx
│   │	│   │   │   │   ├── InvoiceStatusBadge.jsx
│   │   │   │   │   │   └── InvoiceTimeline.jsx
│   │	│   │   │   ├── payments/
│   │	│   │   │   │   ├── PaymentList.jsx
│   │	│   │   │   │   ├── PaymentDetails.jsx
│   │	│   │   │   │   ├── PaymentHistory.jsx
│   │	│   │   │   │   ├── PaymentReceipt.jsx
│   │	│   │   │   │   ├── PaymentStatusBadge.jsx
│   │   │   │   │   │   └── PaymentGatewaySelector.jsx
│   │	│   │   │   ├── insurance/
│   │	│   │   │   │   ├── InsuranceClaims.jsx
│   │	│   │   │   │   ├── ClaimDetails.jsx
│   │	│   │   │   │   ├── ClaimSubmission.jsx
│   │	│   │   │   │   ├── ClaimTracking.jsx
│   │	│   │   │   │   ├── ClaimStatusBadge.jsx
│   │   │   │   │   │   └── CoverageSummary.jsx
│   │	│   │   │   ├── refunds/
│   │	│   │   │   │   ├── RefundList.jsx
│   │	│   │   │   │   ├── RefundDetails.jsx
│   │	│   │   │   │   ├── RefundRequest.jsx
│   │	│   │   │   │   ├── RefundApproval.jsx
│   │   │   │   │   │   └── RefundStatusBadge.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── billingAnalytics.jsx
│   │	│   │   │   │   ├── RevenueAnalytics.jsx
│   │	│   │   │   │   ├── CollectionsAnalytics.jsx
│   │	│   │   │   │   ├── InsuranceAnalytics.jsx
│   │	│   │   │   │   ├── RefundAnalytics.jsx
│   │   │   │   │   │   └── OutstandingBalanceAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── RevenueChart.jsx
│   │	│   │   │   │   ├── CollectionsChart.jsx
│   │	│   │   │   │   ├── ClaimChart.jsx
│   │	│   │   │   │   ├── OutstandingBalanceChart.jsx
│   │	│   │   │   │   ├── RefundTrendChart.jsx
│   │   │   │   │   │   └── PaymentMethodChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── BillingFilterBar.jsx
│   │	│   │   │   │   ├── InvoiceFilter.jsx
│   │	│   │   │   │   ├── PaymentFilter.jsx
│   │	│   │   │   │   ├── ClaimFilter.jsx
│   │	│   │   │   │   ├── DateRangeFilter.jsx
│   │   │   │   │   │   └── StatusFilter.jsx
│   │	│   │   │   ├── print/
│   │	│   │   │   │   ├── InvoicePDF.jsx
│   │	│   │   │   │   ├── ReceiptPDF.jsx
│   │	│   │   │   │   ├── BillingStatementPDF.jsx
│   │	│   │   │   │   ├── PrintInvoice.jsx
│   │   │   │   │   │   └── PrintReceipt.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateInvoiceModal.jsx 
│   │	│   │   │   │   ├── EditInvoiceModal.jsx
│   │	│   │   │   │   ├── RecordPaymentModal.jsx
│   │	│   │   │   │   ├── RefundModal.jsx
│   │	│   │   │   │   ├── ClaimSubmissionModel.jsx
│   │   │   │   │   │   └── InvoiceDetailsModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── BillingHeader .jsx
│   │	│   │   │   │   ├── BillingToolbar.jsx
│   │	│   │   │   │   ├── BillingSkeleton.jsx
│   │	│   │   │   │   ├── BillingError.jsx
│   │	│   │   │   │   ├── EmptyBilling.jsx
│   │   │   │   │   │   └── LastUpdateBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── BillingContainer.jsx
│   │	│   │   │       ├── BillingGrid.jsx
│   │	│   │   │       ├── BillingSection.jsx
│   │   │   │   │       └── BillingDashboardLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useInvoices.jsx
│   │	│   │   │   ├── useInvoice.js
│   │	│   │   │   ├── useCreateInvoice.js
│   │	│   │   │   ├── usePayments.js
│   │	│   │   │   ├── useRecordPayment.js
│   │	│   │   │   ├── useInsuranceClaims.js
│   │	│   │   │   ├── useRefunds.js
│   │	│   │   │   ├── useBillingAnalytics.js
│   │	│   │   │   ├── useRevenueReports.js
│   │   │   │   │   └── usebillingFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── billingSlice.js
│   │	│   │   │   ├── billingSelectors.js
│   │	│   │   │   ├── billingThunks.js
│   │   │   │   │   └── billingInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── invoiceStatuses.js
│   │	│   │   │   ├── paymentStatuses.js
│   │	│   │   │   ├── paymentMethods.js
│   │	│   │   │   ├── claimStatuses.js
│   │	│   │   │   ├── refundStatuses.js
│   │   │   │   │   └── billingPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── billingHelpers.js
│   │	│   │   │   ├── billingFormatters.js
│   │	│   │   │   ├── billingCalculations.js
│   │	│   │   │   ├── billingValidators.js
│   │	│   │   │   ├── billingExporters.js
│   │   │   │   │   └── billingTransformer.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── invoice.service.js
│   │	│   │   │   ├── payment.service.js
│   │	│   │   │   ├── insurance.service.js
│   │	│   │   │   ├── refund.service.js
│   │	│   │   │   ├── revenue.service.js
│   │   │   │   │   └── billingAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── billing.types.js
│   │	│   │   │   ├── billing.enums.js
│   │   │   │   │   └── billing.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── invoices.mock.js
│   │	│   │   │   ├── paymnts.mock.js
│   │	│   │   │   ├── claims.mock.js
│   │   │   │   │   └── analytics.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── billingAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── billing.config.js
│   │   │   │   └── index.js
│   │   │   ├── employees/
│   │	│   │   ├── api/
│   │	│   │   │   ├── employees.api.js
│   │	│   │   │   ├── employees.queries.js
│   │	│   │   │   ├── employees.mutations.js
│   │	│   │   │   ├── employees.endpoints.js
│   │	│   │   │   ├── employees.mapper.js
│   │	│   │   │   ├── employees.adapter.js
│   │	│   │   │   ├── employees.keys.js
│   │	│   │   │   ├── employees.schema.js
│   │   │   │   │   └── employees.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── EmployeesPage.jsx
│   │	│   │   │   ├── EmployeeDetailsPage.jsx
│   │	│   │   │   ├── CreateEmployeePage.jsx
│   │	│   │   │   ├── EditEmployeePage.js
│   │	│   │   │   ├── AttendancePage.jsx
│   │	│   │   │   ├── LeaveManagementPage.jsx
│   │	│   │   │   ├── PayrollPage.jsx
│   │	│   │   │   ├── DepartmentsPage.jsx
│   │	│   │   │   ├── PerformancePage.jsx
│   │   │   │   │   └── EmployeeAnalyticsPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── EmployeeCard.jsx
│   │	│   │   │   │   ├── EmployeeProfileCard.jsx
│   │	│   │   │   │   ├── AttendanceCard.jsx
│   │	│   │   │   │   ├── PayrollCard.jsx
│   │	│   │   │   │   ├── LeaveBalanceCard.jsx
│   │   │   │   │   │   └── PerformanceCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── EmployeesTable.jsx
│   │	│   │   │   │   ├── EmployeesTableHeader.jsx
│   │	│   │   │   │   ├── AttendanceTable.jsx
│   │	│   │   │   │   ├── LeaveRequestsTable.jsx
│   │	│   │   │   │   ├── PayrollTable.jsx
│   │	│   │   │   │   ├── DepartmentTable.jsx
│   │   │   │   │   │   └── PerformanceTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── EmployeeForm.jsx
│   │	│   │   │   │   ├── EmployeeProfileForm.jsx
│   │	│   │   │   │   ├── AttendanceForm.jsx
│   │	│   │   │   │   ├── LeaveRequestForm.jsx
│   │	│   │   │   │   ├── PayrollForm.jsx
│   │	│   │   │   │   ├── DepartmentForm.jsx
│   │   │   │   │   │   └── EmployeeSearchForm.jsx
│   │	│   │   │   ├── profile/
│   │	│   │   │   │   ├── EmployeeProfile.jsx
│   │	│   │   │   │   ├── EmployeeAvatar.jsx
│   │	│   │   │   │   ├── EmployeeInformation.jsx
│   │	│   │   │   │   ├── EmployeeDetails.jsx
│   │	│   │   │   │   ├── Qualifications.jsx
│   │   │   │   │   │   └── EmployeStatusBadge.jsx
│   │	│   │   │   ├── attendance/
│   │	│   │   │   │   ├── AttendanceManagement.jsx
│   │	│   │   │   │   ├── AttendanceCalendar.jsx
│   │	│   │   │   │   ├── AttendanceHistory.jsx
│   │	│   │   │   │   ├── ShiftSchedule.jsx
│   │	│   │   │   │   ├── Timesheet.jsx
│   │   │   │   │   │   └── AttendanceStatusBadge.jsx
│   │	│   │   │   ├── payroll/
│   │	│   │   │   │   ├── PayrollManagement.jsx
│   │	│   │   │   │   ├── SalaryDetails.jsx
│   │	│   │   │   │   ├── PayslipViews.jsx
│   │	│   │   │   │   ├── PayrollHistory.jsx
│   │   │   │   │   │   └── PayrollStatusBadge.jsx
│   │	│   │   │   ├── departments/
│   │	│   │   │   │   ├── DoctorPatients.jsx
│   │	│   │   │   │   ├── ActivePatients.jsx
│   │	│   │   │   │   ├── PatientHistory.jsx
│   │   │   │   │   │   └── PatientOverview.jsx
│   │	│   │   │   ├── performance/
│   │	│   │   │   │   ├── PerformanceManagement.jsx
│   │	│   │   │   │   ├── PerformanceReviews.jsx
│   │	│   │   │   │   ├── GoalTracking.jsx
│   │	│   │   │   │   ├── EvaluationForm.jsx
│   │   │   │   │   │   └── PerformanceRatingBadge.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── EmployeeAnalytics.jsx
│   │	│   │   │   │   ├── AttendanceAnalytics.jsx
│   │	│   │   │   │   ├── PayrollAnalytics.jsx
│   │	│   │   │   │   ├── LeaveAnalytics.jsx
│   │	│   │   │   │   ├── DepartmentAnalytics.jsx
│   │   │   │   │   │   └── WorkforceAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── AttendanceChart.jsx
│   │	│   │   │   │   ├── PayrollChart.jsx
│   │	│   │   │   │   ├── LeaveTrendChart.jsx
│   │	│   │   │   │   ├── DepartmentDistributionChart.jsx
│   │	│   │   │   │   ├── WorkforceGrowthChart.jsx
│   │   │   │   │   │   └── PerformanceChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── EmployeeFilterBar.jsx
│   │	│   │   │   │   ├── EmployeeSearch.jsx
│   │	│   │   │   │   ├── DepartmentFilter.jsx
│   │	│   │   │   │   ├── RoleFilter.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │   │   │   │   │   └── DateRangeFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateEmployeeModal.jsx
│   │	│   │   │   │   ├── EditEmployeeModal.jsx
│   │	│   │   │   │   ├── DeleteEmployeeModal.jsx
│   │	│   │   │   │   ├── LeaveApprovalModal.jsx
│   │	│   │   │   │   ├── PayrollModal.jsx
│   │   │   │   │   │   └── EmployeeDetailsModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── EmployeeHeader.jsx
│   │	│   │   │   │   ├── EmployeeToolbar.jsx
│   │	│   │   │   │   ├── EmployeeSkeleton.jsx
│   │	│   │   │   │   ├── EmployeeError.jsx
│   │	│   │   │   │   ├── EmptyEmployees.jsx
│   │   │   │   │   │   └── LastUpdatedBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── EmployeesContainer.jsx
│   │	│   │   │       ├── EmployeesGrid.jsx
│   │	│   │   │       ├── EmployeesSection.jsx
│   │   │   │   │       └── EmployeeDashboardLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useEmployees.js
│   │	│   │   │   ├── useEmployee.js
│   │	│   │   │   ├── useCreateEmployee.js
│   │	│   │   │   ├── useUpdateEmployee.js
│   │	│   │   │   ├── useDeleteEmployee.js
│   │	│   │   │   ├── useAttendance.js
│   │	│   │   │   ├── useLeaveRequests.js
│   │	│   │   │   ├── usePayroll.js
│   │	│   │   │   ├── useEmployeeAnalytics.js
│   │   │   │   │   └── useEmployeeFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── employeesSlice.js
│   │	│   │   │   ├── employeesSelectors.js
│   │	│   │   │   ├── employeesThunks.js
│   │   │   │   │   └── employeesInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── employeeRoles.js
│   │	│   │   │   ├── employeeStatuses.js
│   │	│   │   │   ├── departmentTypes.js
│   │	│   │   │   ├── leaveTypes.js
│   │	│   │   │   ├── payrollStatuses.js
│   │   │   │   │   └── employeePermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── employeeHelpers.js
│   │	│   │   │   ├── employeeFormatters.js
│   │	│   │   │   ├── employeeCalculations.js
│   │	│   │   │   ├── employeeValidators.js
│   │	│   │   │   ├── employeeExporters.js
│   │   │   │   │   └── employeeTransformers.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── attendance.service.js
│   │	│   │   │   ├── leave.service.js
│   │	│   │   │   ├── payroll.service.js
│   │	│   │   │   ├── performance.service.js
│   │	│   │   │   ├── employeeAnalytics.service.js
│   │   │   │   │   └── workforce.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── employee.types.js
│   │	│   │   │   ├── employee.enums.js
│   │   │   │   │   └── employee.interfaces.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── employeeAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── employee.config.js
│   │   │   │   ├── mocks/
│   │   │   │   │   ├── employees.mock.js
│   │   │   │   │   ├── attendance.mock.js
│   │   │   │   │   ├── payroll.mock.js
│   │   │   │   │   └── performance.mock.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── notifications/
│   │	│   │   ├── api/
│   │	│   │   │   ├── notifications.api.js
│   │	│   │   │   ├── notifications.queries.js
│   │	│   │   │   ├── notifications.mutations.js
│   │	│   │   │   ├── notifications.endpoints.js
│   │	│   │   │   ├── notifications.adapter.js
│   │	│   │   │   ├── notifications.mapper.js
│   │	│   │   │   ├── notifications.keys.js
│   │	│   │   │   ├── notifications.schema.js
│   │   │   │   │   └── notifications.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── NotificationsPage.jsx
│   │	│   │   │   ├── NotificationCenterPage.jsx
│   │	│   │   │   ├── AnnouncementsPage.jsx
│   │	│   │   │   ├── NotificationTemplatesPage.jsx
│   │	│   │   │   ├── NotificationLogsPage.jsx
│   │	│   │   │   ├── ReminderManagementPage.jsx
│   │	│   │   │   ├── BroadcastMessagesPage.jsx
│   │   │   │   │   └── NotificationAnalyticsPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── NotificationCard.jsx
│   │	│   │   │   │   ├── ReminderCard.jsx
│   │	│   │   │   │   ├── AlertCard.jsx
│   │	│   │   │   │   ├── AnnouncementCard.jsx
│   │	│   │   │   │   ├── BroadcastCard.jsx
│   │   │   │   │   │   └── NotificationSummaryCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── NotificationsTable.jsx
│   │	│   │   │   │   ├── NotificationsTableHeader.jsx
│   │	│   │   │   │   ├── NotificationsTableRow.jsx
│   │	│   │   │   │   ├── NotificationLogsTable.jsx
│   │	│   │   │   │   ├── RemindersTable.jsx
│   │	│   │   │   │   ├── BroadcastTable.jsx
│   │   │   │   │   │   └── TemplatesTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── NotificationForm.jsx
│   │	│   │   │   │   ├── ReminderForm.jsx
│   │	│   │   │   │   ├── BroadcastForm.jsx
│   │	│   │   │   │   ├── AnnouncementForm.jsx
│   │	│   │   │   │   ├── NotificationTemplateForm.jsx
│   │   │   │   │   │   └── NotificationSettingsForm.jsx
│   │	│   │   │   ├── center/
│   │	│   │   │   │   ├── NotificationCenter.jsx
│   │	│   │   │   │   ├── NotificationList.jsx
│   │	│   │   │   │   ├── NotificationItem.jsx
│   │	│   │   │   │   ├── NotificationDetails.jsx
│   │   │   │   │   │   └── NotificationStatusBadge.jsx
│   │	│   │   │   ├── reminders/
│   │	│   │   │   │   ├── AppointmentReminders.jsx
│   │	│   │   │   │   ├── PrescriptionReminders.jsx
│   │	│   │   │   │   ├── BillingReminders.jsx
│   │	│   │   │   │   ├── LabResultReminders.jsx
│   │   │   │   │   │   └── ReminderStatusBadge.jsx
│   │	│   │   │   ├── announcements/
│   │	│   │   │   │   ├── AnnouncementsList.jsx
│   │	│   │   │   │   ├── AnnouncementDetails.jsx
│   │	│   │   │   │   ├── AnnouncementBanner.jsx
│   │	│   │   │   │   ├── AnnouncementPublisher.jsx
│   │   │   │   │   │   └── AnnouncementStatusBadge.jsx
│   │	│   │   │   ├── broadcasts/
│   │	│   │   │   │   ├── BroadcastMessages.jsx
│   │	│   │   │   │   ├── BroadcastComposer.jsx
│   │	│   │   │   │   ├── RecipientSelector.jsx
│   │	│   │   │   │   ├── DeliveryTracking.jsx
│   │   │   │   │   │   └── BroadcastStatusBadge.jsx
│   │	│   │   │   ├── templates/
│   │	│   │   │   │   ├── NotificationTemplates.jsx
│   │	│   │   │   │   ├── TemplateEditor.jsx
│   │	│   │   │   │   ├── TemplatePreview.jsx
│   │	│   │   │   │   ├── TemplateVariables.jsx
│   │   │   │   │   │   └── TemplateCategoryBadge.jsx
│   │	│   │   │   ├── channels/
│   │	│   │   │   │   ├── EmailNotifications.jsx
│   │	│   │   │   │   ├── SMSNotifications.jsx
│   │	│   │   │   │   ├── PushNotifications.jsx
│   │	│   │   │   │   ├── InAppNotifications.jsx
│   │   │   │   │   │   └── ChannelStatusBadge.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── NotificationAnalytics.jsx
│   │	│   │   │   │   ├── DeliveryAnalytics.jsx
│   │	│   │   │   │   ├── OpenRateAnalytics.jsx
│   │	│   │   │   │   ├── ReminderAnalytics.jsx
│   │   │   │   │   │   └── ChannelAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── DeliveryChart.jsx
│   │	│   │   │   │   ├── OpenRateChart.jsx
│   │	│   │   │   │   ├── ReminderTrendChart.jsx
│   │	│   │   │   │   ├── ChannelUsageChart.jsx
│   │	│   │   │   │   ├── NotificationVolumeChart.jsx
│   │   │   │   │   │   └── EngagementChart.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── NotificationFilterBar.jsx
│   │	│   │   │   │   ├── StatusFilter.jsx
│   │	│   │   │   │   ├── ChannelFilter.jsx
│   │	│   │   │   │   ├── CategoryFilter.jsx
│   │	│   │   │   │   ├── RecipientFilter.jsx
│   │   │   │   │   │   └── DateRangeFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── CreateNotificationModal.jsx
│   │	│   │   │   │   ├── EditNotificationModal.jsx
│   │	│   │   │   │   ├── BroadcastModal.jsx
│   │	│   │   │   │   ├── ReminderModal.jsx
│   │	│   │   │   │   ├── TemplateModal.jsx
│   │   │   │   │   │   └── NotificationDetailsModal.jsx
│   │	│   │   │   ├── shared/
│   │	│   │   │   │   ├── NotificationHeader.jsx
│   │	│   │   │   │   ├── NotificationToolbar.jsx
│   │	│   │   │   │   ├── NotificationSkeleton.jsx
│   │	│   │   │   │   ├── NotificationError.jsx
│   │	│   │   │   │   ├── EmptyNotifications.jsx
│   │   │   │   │   │   └── NotificationBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── NotificationsContainer.jsx
│   │	│   │   │       ├── NotificationsGrid.jsx
│   │	│   │   │       ├── NotificationsSection.jsx
│   │   │   │   │       └── NotificationCenterLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useNotifications.js
│   │	│   │   │   ├── useNotification.js
│   │	│   │   │   ├── useUnreadNotifications.js
│   │	│   │   │   ├── useMarkAsRead.js
│   │	│   │   │   ├── useReminders.js
│   │	│   │   │   ├── useBroadcasts.js
│   │	│   │   │   ├── useTemplates.js
│   │	│   │   │   ├── useNotificationAnalytics.js
│   │	│   │   │   ├── useNotificationChannels.js
│   │   │   │   │   └── useNotificationFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── notificationsSlice.js
│   │	│   │   │   ├── notificationsSelectors.js
│   │	│   │   │   ├── notificationsThunks.js
│   │   │   │   │   └── notificationsInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── notificationTypes.js
│   │	│   │   │   ├── notificationChannels.js
│   │	│   │   │   ├── notificationStatuses.js
│   │	│   │   │   ├── reminderTypes.js
│   │	│   │   │   ├── templateCategories.js
│   │   │   │   │   └── notificationPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── notificationHelpers.js
│   │	│   │   │   ├── notificationFormatters.js
│   │	│   │   │   ├── notificationCalculations.js
│   │	│   │   │   ├── notificationValidators.js
│   │	│   │   │   ├── notificationTransformers.js
│   │   │   │   │   └── notificationTemplates.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── email.service.js
│   │	│   │   │   ├── sms.service.js
│   │	│   │   │   ├── pushNotification.service.js
│   │	│   │   │   ├── reminder.service.js
│   │	│   │   │   ├── broadcast.service.js
│   │	│   │   │   ├── notificationQueue.service.js
│   │   │   │   │   └── notificationAnalytics.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── notification.types.js
│   │	│   │   │   ├── notification.enums.js
│   │   │   │   │   └── notification.interfaces.js
│   │	│   │   ├── config/
│   │	│   │   │   ├── notification.config.js
│   │	│   │   │   ├── email.config.js
│   │	│   │   │   ├── sms.config.js
│   │   │   │   │   └── push.config.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── notifications.mock.js
│   │	│   │   │   ├── reminders.mock.js
│   │	│   │   │   ├── broadcasts.mock.js
│   │   │   │   │   └── templates.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── notificationAccess.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── reports/
│   │	│   │   ├── api/
│   │	│   │   │   ├── reports.api.js
│   │	│   │   │   ├── reports.queries.js
│   │	│   │   │   ├── reports.mutations.js
│   │	│   │   │   ├── reports.endpoints.js
│   │	│   │   │   ├── reports.adapter.js
│   │	│   │   │   ├── reports.mapper.js
│   │	│   │   │   ├── reports.keys.js
│   │	│   │   │   ├── reports.schema.js
│   │   │   │   │   └── reports.validator.js
│   │	│   │   ├── pages/
│   │	│   │   │   ├── ReportsDashboardPage.jsx
│   │	│   │   │   ├── FinancialReportsPage.jsx
│   │	│   │   │   ├── PatientReportsPage.jsx
│   │	│   │   │   ├── AppointmentReportsPage.jsx
│   │	│   │   │   ├── DoctorReportsPage.jsx
│   │	│   │   │   ├── PharmacyReportsPage.jsx
│   │	│   │   │   ├── LaboratoryReportsPage.jsx
│   │	│   │   │   ├── EmployeeReportsPage.jsx
│   │	│   │   │   ├── InsuranceReportsPage.jsx
│   │	│   │   │   ├── ComplianceReportsPage.jsx
│   │	│   │   │   ├── CustomReportsPage.jsx
│   │	│   │   │   ├── ScheduledReportsPage.jsx
│   │   │   │   │   └── ReportViewerPage.jsx
│   │	│   │   ├── components/
│   │	│   │   │   ├── cards/
│   │	│   │   │   │   ├── ReportCard.jsx
│   │	│   │   │   │   ├── KPIReportCard.jsx
│   │	│   │   │   │   ├── FinancialReportCard.jsx
│   │	│   │   │   │   ├── ClinicalReportCard.jsx
│   │	│   │   │   │   ├── ComplianceReportCard.jsx
│   │   │   │   │   │   └── ScheduledReportCard.jsx
│   │	│   │   │   ├── tables/
│   │	│   │   │   │   ├── ReportsTable.jsx
│   │	│   │   │   │   ├── ReportsTableHeader.jsx
│   │	│   │   │   │   ├── ReportsTableRow.jsx
│   │	│   │   │   │   ├── ScheduledReportsTable.jsx
│   │	│   │   │   │   ├── ReportHistoryTable.jsx
│   │	│   │   │   │   ├── ReportExecutionTable.jsx
│   │   │   │   │   │   └── ReportAuditTable.jsx
│   │	│   │   │   ├── forms/
│   │	│   │   │   │   ├── ReportBuilderForm.jsx
│   │	│   │   │   │   ├── ReportFilterForm.jsx
│   │	│   │   │   │   ├── ScheduleReportForm.jsx
│   │	│   │   │   │   ├── ExportReportForm.jsx
│   │	│   │   │   │   ├── ReportTemplateForm.jsx
│   │   │   │   │   │   └── ReportParameterForm.jsx
│   │	│   │   │   ├── dashboards/
│   │	│   │   │   │   ├── ReportsDashboard.jsx
│   │	│   │   │   │   ├── ExecutiveDashboard.jsx
│   │	│   │   │   │   ├── OperationalDashboard.jsx
│   │	│   │   │   │   ├── ClinicalDashboard.jsx
│   │   │   │   │   │   └── FinancialDashboard.jsx
│   │	│   │   │   ├── financial/
│   │	│   │   │   │   ├── RevenueReports.jsx
│   │	│   │   │   │   ├── CollectionsReports.jsx
│   │	│   │   │   │   ├── BillingReports.jsx
│   │	│   │   │   │   ├── InsuranceReports.jsx
│   │	│   │   │   │   ├── OutstandingBalanceReports.jsx
│   │   │   │   │   │   └── ProfitabilityReports.jsx
│   │	│   │   │   ├── patients/
│   │	│   │   │   │   ├── PatientReports.jsx
│   │	│   │   │   │   ├── DemographicsReports.jsx
│   │	│   │   │   │   ├── PatientGrowthReports.jsx
│   │	│   │   │   │   ├── VisitReports.jsx
│   │   │   │   │   │   └── PatientRetentionReports.jsx
│   │	│   │   │   ├── appointments/
│   │	│   │   │   │   ├── AppointmentReports.jsx
│   │	│   │   │   │   ├── SchedulingReports.jsx
│   │	│   │   │   │   ├── NoShowReports.jsx
│   │	│   │   │   │   ├── UtilizationReports.jsx
│   │   │   │   │   │   └── WaitTimeReports.jsx
│   │	│   │   │   ├── doctors/
│   │	│   │   │   │   ├── DoctorReports.jsx
│   │	│   │   │   │   ├── ProductivityReports.jsx
│   │	│   │   │   │   ├── ConsultationReports.jsx
│   │	│   │   │   │   ├── PerformanceReports.jsx
│   │   │   │   │   │   └── SpecialtyReports.jsx
│   │	│   │   │   ├── pharmacy/
│   │	│   │   │   │   ├── PharmacyReports.jsx
│   │	│   │   │   │   ├── InventoryReports.jsx
│   │	│   │   │   │   ├── DispensingReports.jsx
│   │	│   │   │   │   ├── ExpiryReports.jsx
│   │   │   │   │   │   └── SupplierReports.jsx
│   │	│   │   │   ├── laboratory/
│   │	│   │   │   │   ├── LaboratoryReports.jsx
│   │	│   │   │   │   ├── TestVolumeReports.jsx
│   │	│   │   │   │   ├── TurnaroundTimeReports.jsx
│   │	│   │   │   │   ├── QualityControlReports.jsx
│   │   │   │   │   │   └── SpecimenReports.jsx
│   │	│   │   │   ├── employees/
│   │	│   │   │   │   ├── EmployeeReports.jsx
│   │	│   │   │   │   ├── AttendanceReports.jsx
│   │	│   │   │   │   ├── PayrollReports.jsx
│   │	│   │   │   │   ├── LeaveReports.jsx
│   │   │   │   │   │   └── WorkforceReports.jsx
│   │	│   │   │   ├── compliance/
│   │	│   │   │   │   ├── ComplianceReports.jsx
│   │	│   │   │   │   ├── AuditReports.jsx
│   │	│   │   │   │   ├── SecurityReports.jsx
│   │	│   │   │   │   ├── AccessReports.jsx
│   │   │   │   │   │   └── RegulatoryReports.jsx
│   │	│   │   │   ├── analytics/
│   │	│   │   │   │   ├── ReportsAnalytics.jsx
│   │	│   │   │   │   ├── KPIAnalytics.jsx
│   │	│   │   │   │   ├── ExecutiveAnalytics.jsx
│   │	│   │   │   │   ├── OperationalAnalytics.jsx
│   │   │   │   │   │   └── BenchmarkAnalytics.jsx
│   │	│   │   │   ├── charts/
│   │	│   │   │   │   ├── RevenueTrendChart.jsx
│   │	│   │   │   │   ├── PatientGrowthChart.jsx
│   │	│   │   │   │   ├── AppointmentTrendChart.jsx
│   │	│   │   │   │   ├── DoctorPerformanceChart.jsx
│   │	│   │   │   │   ├── InventoryTrendChart.jsx
│   │	│   │   │   │   ├── LaboratoryTrendChart.jsx
│   │	│   │   │   │   ├── WorkforceTrendChart.jsx
│   │   │   │   │   │   └── KPIChart.jsx
│   │	│   │   │   ├── exports/
│   │	│   │   │   │   ├── PDFExporter.jsx
│   │	│   │   │   │   ├── ExcelExporter.jsx
│   │	│   │   │   │   ├── CSVExporter.jsx
│   │	│   │   │   │   ├── PrintExporter.jsx
│   │   │   │   │   │   └── ScheduledExporter.jsx
│   │	│   │   │   ├── filters/
│   │	│   │   │   │   ├── ReportsFilterBar.jsx
│   │	│   │   │   │   ├── DateRangeFilter.jsx
│   │	│   │   │   │   ├── DepartmentFilter.jsx
│   │	│   │   │   │   ├── BranchFilter.jsx
│   │	│   │   │   │   ├── DoctorFilter.jsx
│   │   │   │   │   │   └── StatusFilter.jsx
│   │	│   │   │   ├── modals/
│   │	│   │   │   │   ├── GenerateReportModal.jsx
│   │	│   │   │   │   ├── ScheduleReportModal.jsx
│   │	│   │   │   │   ├── ExportReportModal.jsx
│   │	│   │   │   │   ├── SaveTemplateModal.jsx
│   │   │   │   │   │   └── ReportDetailsModal.jsx
│   │	│   │   │   ├── stored/
│   │	│   │   │   │   ├── ReportsHeader.jsx
│   │	│   │   │   │   ├── ReportsToolbar.jsx
│   │	│   │   │   │   ├── ReportsSkeleton.jsx
│   │	│   │   │   │   ├── ReportsError.jsx
│   │	│   │   │   │   ├── EmptyReports.jsx
│   │   │   │   │   │   └── ReportStatusBadge.jsx
│   │   │   │   │   └── layout/
│   │	│   │   │       ├── ReportsContainer.jsx
│   │	│   │   │       ├── ReportsGrid.jsx
│   │	│   │   │       ├── ReportsSection.jsx
│   │   │   │   │       └── ReportsDashboardLayout.jsx
│   │	│   │   ├── hooks/
│   │	│   │   │   ├── useReports.js
│   │	│   │   │   ├── useReport.js
│   │	│   │   │   ├── useGenerateReport.js
│   │	│   │   │   ├── useScheduledReports.js
│   │	│   │   │   ├── useExportReport.js
│   │	│   │   │   ├── useReportTemplates.js
│   │	│   │   │   ├── useReportsAnalytics.js
│   │	│   │   │   ├── useKPIs.js
│   │   │   │   │   └── useReportsFilters.js
│   │	│   │   ├── store/
│   │	│   │   │   ├── reportsSlice.js
│   │	│   │   │   ├── reportsSelectors.js
│   │	│   │   │   ├── reportsThunks.js
│   │   │   │   │   └── reportsInitialState.js
│   │	│   │   ├── constants/
│   │	│   │   │   ├── reportTypes.js
│   │	│   │   │   ├── reportFormats.js
│   │	│   │   │   ├── reportStatuses.js
│   │	│   │   │   ├── reportSchedules.js
│   │	│   │   │   ├── kpiMetrics.js
│   │   │   │   │   └── reportPermissions.js
│   │	│   │   ├── utils/
│   │	│   │   │   ├── reportsHelpers.js
│   │	│   │   │   ├── reportsFormatters.js
│   │	│   │   │   ├── reportsCalculations.js
│   │	│   │   │   ├── reportsValidators.js
│   │	│   │   │   ├── reportsExporters.js
│   │   │   │   │   └── reportsTransformers.js
│   │	│   │   ├── services/
│   │	│   │   │   ├── reportBuilder.service.js
│   │	│   │   │   ├── reportGenerator.service.js
│   │	│   │   │   ├── reportExport.service.js
│   │	│   │   │   ├── reportScheduler.service.js
│   │	│   │   │   ├── reportAnalytics.service.js
│   │   │   │   │   └── kpi.service.js
│   │	│   │   ├── types/
│   │	│   │   │   ├── reports.types.js
│   │	│   │   │   ├── reports.enums.js
│   │   │   │   │   └── reports.interfaces.js
│   │	│   │   ├── mocks/
│   │	│   │   │   ├── reports.mock.js
│   │	│   │   │   ├── kpis.mock.js
│   │	│   │   │   ├── analytics.mock.js
│   │   │   │   │   └── scheduledReports.mock.js
│   │	│   │   ├── permissions/
│   │   │   │   │   └── reportsAccess.js
│   │	│   │   ├── config/
│   │   │   │   │   └── reports.config.js
│   │   │   │   └── index.js
│   │   │   │
│   │   │   └── settings/
│   │	│       ├── api/
│   │	│       ├── pages/
│   │	│       ├── components/
│   │	│       │   ├── cards/
│   │	│       │   ├── tables/
│   │	│       │   ├── forms/
│   │	│       │   ├── modals/
│   │	│       │   ├── shared/
│   │   │       │   └── layout/
│   │	│       ├── hooks/
│   │	│       ├── store/
│   │	│       ├── constants/
│   │	│       ├── utils/
│   │	│       ├── services/
│   │	│       ├── types/
│   │	│       ├── mocks/
│   │	│       ├── permissions/
│   │	│       ├── config/
│   │   │       └── index.js
│   │   │   
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── assets/
│   │
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── patients/
│   │   │   ├── doctors/
│   │   │   ├── appointments/
│   │   │   ├── consulations/
│   │   │   ├── pharmacy/
│   │   │   ├── laboratory/
│   │   │   ├── billing/
│   │   │   ├── reports/
│   │   │   ├── notifications/
│   │   │   └── settings/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── database/
│   │
│   └── public/
│
└── docs/