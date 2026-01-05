Full-Stack-Medical-Management-System-Folder-Structure
│
├── backend-MMS using Python                            # FastAPI Backend (Python)
│   ├── app/  
│   │   ├── main.py                           			# FastAPI app entry
│   │   ├── database.py                                 # DB connection & session
│   │   │
│   │   ├── core/                                       # Core system configuration
│   │   │   ├── config.py                               # Environment variables       
│   │   │   ├── security.py                             # JWT, password hashing
│   │   │   ├── dependencies.py                         # Auth & role dependencies
│   │   │   └── logging.py                              # Audit & system logs 
│   │   ├── api/	                                         # Reusable API files grouped by feature
│   │   │ 	├── v1/
│   │   │   │	├── routes/
│   │   │ 	│   │   ├── auth.py
│   │   │ 	│   │   ├── users.py
│   │   │ 	│   │   ├── patients.py
│   │   │ 	│   │   ├── doctors.py
│   │   │ 	│   │   ├── appointments.py
│   │   │ 	│   │   ├── medical_rerecords.py
│   │   │ 	│   │   ├── billing.py
│   │   │   │   │   └── reports.py
│   │   │   │	└── api_router.py
│   │   │   └── __init__.py       
│   │   ├── models/                           			# SQLAlchemy models
│   │   │   ├── user.py
│   │   │   ├── patient.py
│   │   │   ├── appointment.py
│   │   │   ├── doctor.py
│   │   │   ├── medical_record.py
│   │   │   ├── prescription.py
│   │   │   └── billing.py
│   │   ├── schemas/                                     # Pydantic data validation
│   │   │   ├── user.py
│   │   │   ├── patient.py
│   │   │   ├── appointment.py
│   │   │   ├── doctor.py
│   │   │   ├── medical_record.py
│   │   │   ├── prescription.py
│   │   │   └── billing.py
│   │   │
│   │   ├── services/                                                # Business Logic
│   │   │   ├── auth_service.py
│   │   │   ├── user_service.py
│   │   │   ├── patient_service.py
│   │   │   ├── appointment_service.py
│   │   │   ├── doctor_service.py
│   │   │   ├── medical_record_service.py
│   │   │   └── billing_service.py
│   │   │
│   │   ├── utils/                                                    # Reusable utitlities
│   │   │   ├── jwt_handler.py 
│   │   │   ├── password_hasher.py
│   │   │   ├── email_sender.py
│   │   │   ├── pdf_generator.py                                    
│   │   │   ├── file_upload.py
│   │   │   └── logger.py
│   │   │
│   │   ├── tests/                                       
│   │   │   ├── test_auth.py 
│   │   │   ├── test_uses.py
│   │   │   ├── test_patient.py
│   │   │   ├── test_doctors.py
│   │   │   ├── test_appointments.py
│   │   │   └── test_billing.py
│   │   └── static/   
│   │       ├── uploads/
│   │       └── reports/                                                                                                             
│   ├── alemblic/     
│   ├── requirements.txt                               
│   └── README.md                                               
│ 
├── database/                                                 # SQL files and seeders
│   ├── init.sql                                              # Create tables
│   ├── seed.sql                                              # Seed sample data
│   └── README.md   
│ 
├── Frontend-MMS using-React/                                                  
│   │  
│   ├── src/                                         
│   │   ├── assets/	
│   │   │ 	├── images/    
│   │   │ 	├── icons/
│   │   │   └── styles/                                
│   │   │   	├── global.css
│   │   │   	└── variables.css 
│   │   ├── components/	                                    
│   │   │ 	├── layout/ 
│   │   │   │	├── Header.jsx
│   │   │   │	├── Sidebar.jsx
│   │   │   │	├── Footer.jsx
│   │   │   │	├── Loader.jsx
│   │   │   │	└── ProtectedRoute.jsx 
│   │   │ 	├── ui/ 
│   │   │   │	├── Button.jsx
│   │   │   │	├── Card.jsx
│   │   │   │	├── Modal.jsx
│   │   │   │	├── Table.jsx
│   │   │   │	├── Badge.jsx
│   │   │   │	└── Pagination.jsx 
│   │   │ 	├── form/ 
│   │   │   │	├── InputField.jsx
│   │   │   │	├── SelectField.jsx
│   │   │   │	├── TextArea.jsx
│   │   │   │	├── CheckBox.jsx
│   │   │   │	└── FormWrapper.jsx 
│   │   │ 	├── feedback/ 
│   │   │   │	├── LoaderSpinner.jsx
│   │   │   │	├── Alert.jsx
│   │   │   │	├── Toast.jsx
│   │   │   │	└── emptyState.jsx
│   │   │ 	├── navigation/ 
│   │   │   │	├── Breadcrumbs.jsx
│   │   │   │	└── Tabs.jsx
│   │   │   └── index.js                               
│   │   ├── pages/	
│   │   │ 	├── auth/                                         # Authentication & access
│   │   │   │	├── Login.jsx
│   │   │   │	├── Register.jsx
│   │   │   │	├── ForgotPassword.jsx
│   │   │   │	└── ResetPassword.jsx   
│   │   │ 	├── dashboard/                                    # Dashboard & Overview
│   │   │   │	├── Dashboard.jsx 
│   │   │   │	└── DashboardHome.jsx
│   │   │ 	├── patients/
│   │   │   │	├── PatientsList.jsx                          # List, search, filter patients
│   │   │   │	├── PatientDetails.jsx                        # Full patient profile
│   │   │   │	├── AddPatient.jsx                            # Register new patient
│   │   │   │	├── EditPatient.jsx                           # Update patient data
│   │   │   │	└── index.js
│   │   │ 	├── doctors/
│   │   │   │	├── DoctorsList                               # Doctor details sub-section
│   │   │   │	├── DoctorDetails.jsx                         # Doctor profile & info
│   │   │   │	├── AddDoctor.jsx                             # Register new doctor
│   │   │   │	├── EditDoctor.jsx                            # Update doctor details
│   │   │   │	└── index.js
│   │   │ 	├── appointments/
│   │   │   │	├── AppointmentsList.jsx                      # List, filter, calendar view
│   │   │   │	├── AppointmentDetails.jsx                    # View appointment info
│   │   │   │	├── AddAppointment.jsx                        # Create appointment
│   │   │   │	├── EditAppointment.jsx                       # Update appointment
│   │   │   │	└── index.js 
│   │   │ 	├── medical-records/
│   │   │   │	├── RecordsList.jsx                           # List & search medical records
│   │   │   │	├── RecordDetails.jsx                         # View full medical record
│   │   │   │	├── AddRecord.jsx                             # Create new medical record
│   │   │   │	├── EditRecord.jsx                            # Update medical record
│   │   │   │	└── index.js
│   │   │ 	├── billing/                                      # Billing Management
│   │   │   │	├── BillingList.jsx                           # List of all bills/invoices
│   │   │   │	├── BillingDetails.jsx                        # View individaul bill
│   │   │   │	├── AddBill.jsx                               # Create new bill/invoice
│   │   │   │	├── EditBill.jsx                              # Update bill
│   │   │   │	└── index.js
│   │   │ 	├── reports/                                      # Reports & Analysis
│   │   │   │	├── ReportDashboard.jsx
│   │   │   │	├── PatientReports.jsx
│   │   │   │	├── BillingReport.jsx 
│   │   │   │	├── AppointmentState.jsx 
│   │   │   │	└── index.js
│   │   │ 	├── settings/                                     # User & System Settings
│   │   │   │	├── ProfileSetting.jsx 
│   │   │   │	├── UserManagement.jsx
│   │   │   │	└── index.js
│   │   │ 	├── errors/                                       # User & System Settings
│   │   │   │	├── NotFound.jsx
│   │   │   │	├── Unauthorized.jsx
│   │   │   │	└── index.js
│   │   │   └── index.js
│   │   │   	
│   │   ├── services/	                                     # API calls, HTTP clients, endpoints
│   │   │ 	├── apiClients.js                                # Axios instance or fetch wrapper
│   │   │ 	├── authService.js                               # Auth-related API calls
│   │   │ 	├── patientService.js                            # Patient-related API calls
│   │   │ 	├── DoctorService.js                             # Doctor-related API calls, use Lowercase first letter for consistency
│   │   │ 	├── appointmentService.js                        # Appointment-related API calls
│   │   │ 	├── medicalRecordService.js                      # Medical records API calls
│   │   │ 	├── billingService.js    
│   │   │ 	├── reportService.js 
│   │   │   └── index.js                                     # 
│   │   ├── routes/	                                         
│   │   │ 	├── AppRoutes.jsx
│   │   │ 	├── ProtectedRoute.jsx  
│   │   │ 	├── RoleRoute.jsx  
│   │   │   └── index.js  
│   │   ├── context/	                                   # Global State (Authentication, Theme, User role)
│   │   │ 	├── AuthContext.jsx   
│   │   │ 	├── ThemeContext.jsx
│   │   │   └── index.js
│   │   ├── hooks/	
│   │   │ 	├── useAuth.js
│   │   │ 	├── useFetch.js  
│   │   │   └── useRole.js
│   │   └── utils/                                        # Helper functions, constants, dte utitlities, validators 
│   │    	├── token.js
│   │    	├── constants.js
│   │    	├── validators.js
│   │       └── dateUtils.js
│   ├── App.jsx                                    
│   ├── index.js                                                                
│   └── Routes.js or router/   
│
                  
