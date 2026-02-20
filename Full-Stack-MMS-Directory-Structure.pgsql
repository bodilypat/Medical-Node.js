Full-Stack-Medical-Management System-Directory-Structure
├── backend/
│   ├── server.js    
│   ├── .env                                          
│   ├── config/
│   │  	├── db.js
│   │  	├── 
│   │  	├── 
│   │   └── 
│   ├── models/
│   │   ├── Role.js
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── MedicalRecord.js
│   │   ├── LabTest.js
│   │   ├── Billing.js
│   │   ├── ward.js
│   │   └── AuditLog.js
│   ├── Controllers/
│   │   ├── authController.js
│   │   ├── doctorController.js			          
│   │   ├── patientController.js                  
│   │   ├── appointmentController.js                                   
│   │   └── billingController.js 
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── patientRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── billingRoutes.js  
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │  	├── roleMiddleware.js
│   │   └── errorMiddleware.js                 
│   ├── utils/  
│   │  	├── generateToken.js
│   │   └── auditLogger.js  
│   └── package.json                                                                       
│
├── frontend(medical-management-system)    
│   │ 
│   ├── public 
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── patient.html
│   │   ├── doctors.html
│   │   └── appointment.html                # Main HTML Template
│   ├── src/                        
│   │   ├── components/                
│   │   │   ├── Header.js          
│   │   │   ├── Sidebar.js   
│   │   │   ├── Footer.js      
│   │   │   ├── Notification.js 
│   │   │   ├── card/
│   │   │   │   ├── Card.js
│   │   │   │   ├── Card.css
│   │   │   │   └── index.js
│   │   │   ├── table/
│   │   │   │   ├── Table.js
│   │   │   │   ├── Table.css
│   │   │   │   └── index.js
│   │   │   ├── modal/
│   │   │   │   ├── Modal.js
│   │   │   │   ├── Modal.css
│   │   │   │   └── index.js
│   │   │   └── Loader.js
│   │   ├── pages/      
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── auth.css
│   │   │   │   └── index.js          
│   │   │   ├── dashbord/
│   │   │   │   ├── Dashbord.jsx
│   │   │   │   ├── Dashboard.css
│   │   │   │   └── index.js
│   │   │   ├── patients/
│   │   │   │   ├── Patients.jsx
│   │   │   │   ├── Patients.css
│   │   │   │   └── index.js  
│   │   │   ├── doctors/   
│   │   │   │   ├── Doctors.jsx
│   │   │   │   ├── Doctor.css
│   │   │   │   └── index.js 
│   │   │   ├── appointment/
│   │   │   │   ├── Appointment.jsx
│   │   │   │   ├── Appointment.css
│   │   │   │   └── index.js
│   │   │   ├── billing/   
│   │   │   │   ├── Billing.js
│   │   │   │   ├── billing.css
│   │   │   │   └── index.js    
│   │   │   └── pharmacy/
│   │   │       ├── Pharmarcy.jsx
│   │   │       ├── Pharmarcy.css
│   │   │       └── index.js
│   │   ├── services/                
│   │   │   ├── api.js         
│   │   │   ├── patientsService.js   
│   │   │   ├── doctorsService.js
│   │   │   ├── appointmentsService.js
│   │   │   ├── billingService.js
│   │   │   └── pharmacyService.js
│   │   ├── context/                
│   │   │   ├── AuthContext.jsx        
│   │   │   ├── 
│   │   │   ├── 
│   │   │   └── 
│   │   ├── App.js     
│   │   ├── index.js
│   │   └── styles/
│   │       ├── main.css
│   │       └── components.css
│   │ 
│   ├── utils/                                # Utility scripts/helpers
│   │   ├── form-validation.js
│   │   └── date-utils.js 
│   └── store/                                # (optional) Shared data/state (local/session/user)
│       └── session.js 
│    
├── README.md 
└── LICENSE                    

