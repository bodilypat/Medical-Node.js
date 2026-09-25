AppRouter
│
├── Public
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
├── ProtectedRoute
│   ├── RoleRoute: ADMIN
│   │   └── AdminLayout
│   │       ├── Dashboard
│   │       ├── Doctors
│   │       ├── Appointments
│   │       └── Reports
│   │
│   ├── RoleRoute: DOCTOR
│   │   └── DoctorLayout
│   │       ├── Dashboard
│   │       ├── Appointments
│   │       ├── Patients
│   │       ├── Medical Records
│   │       └── Prescriptions
│   │
│   └── RoleRoute: PATIENT
│       └── PatientLayout
│           ├── Dashboard
│           ├── Appointments
│           ├── Medical Records
│           ├── Prescriptions
│           └── Billing
│
└── 404

Work Route Flow 

User requests /admin/dashboard
            │
            ▼
      ProtectedRoute
            │
       ┌────┴────┐
       │         │
    loading?    No
       │         │
       ▼         ▼
    Loading   authenticated?
                  │
             ┌────┴────┐
             │         │
            No        Yes
             │         │
             ▼         ▼
          /login    <Outlet />
                       │
                       ▼
                   RoleRoute

                    Request Route
                         │
                         ▼
                 ┌───────────────┐
                 │ ProtectedRoute│
                 └───────┬───────┘
                         │
                Authenticated?
                   /           \
                 No             Yes
                 │               │
                 ▼               ▼
              /login        ┌───────────┐
                            │ RoleRoute │
                            └─────┬─────┘
                                  │
                            Role allowed?
                              /       \
                            No         Yes
                            │           │
                            ▼           ▼
                      /unauthorized   Outlet
                                        │
                                        ▼
                                      Layout
                                        │
                                        ▼
                                       Page
