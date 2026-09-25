┌─────────────────────────────────────────────────────────┐
│                     FRONTEND                            │
│              React + TypeScript                         │
│        Tailwind CSS / Material UI                       │
└───────────────────────┬─────────────────────────────────┘
                        │
                    HTTPS / REST
                        │
┌───────────────────────▼─────────────────────────────────┐
│                 PYTHON BACKEND                          │
│                  FastAPI                                │
│                                                         │
│  Authentication │ Patients │ Doctors │ Appointments    │
│  Medical Records │ Prescriptions │ Billing │ Reports   │
└───────────────────────┬─────────────────────────────────┘
                        │
                 SQLAlchemy / ORM
                        │
┌───────────────────────▼─────────────────────────────────┐
│                    DATABASE                             │
│                   PostgreSQL                            │
└─────────────────────────────────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
    File Storage                 Notifications
   Medical Reports              Email / SMS
