/* *********************************************************************** */
/* File: #src/features/medical-records/components/MedicalRecordFilters.jsx */ 
/* *********************************************************************** */

import {
  MEDICAL_RECORD_STATUS_OPTIONS,
  RECORD_TYPE_OPTIONS,
} from "../constants/medicalRecordConstants";

const MedicalRecordFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  const update = (field, value) => {
    onChange?.({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="medical-record-filters">
      <div>
        <label htmlFor="record-search">
          Search
        </label>

        <input
          id="record-search"
          type="search"
          value={filters?.search || ""}
          onChange={(event) =>
            update("search", event.target.value)
          }
          placeholder="Search patient or doctor..."
        />
      </div>

      <div>
        <label htmlFor="record-type">
          Record Type
        </label>

        <select
          id="record-type"
          value={filters?.type || ""}
          onChange={(event) =>
            update("type", event.target.value)
          }
        >
          <option value="">All types</option>

          {RECORD_TYPE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="record-status">
          Status
        </label>

        <select
          id="record-status"
          value={filters?.status || ""}
          onChange={(event) =>
            update("status", event.target.value)
          }
        >
          <option value="">All statuses</option>

          {MEDICAL_RECORD_STATUS_OPTIONS.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label htmlFor="record-date-from">
          From
        </label>

        <input
          id="record-date-from"
          type="date"
          value={filters?.dateFrom || ""}
          onChange={(event) =>
            update("dateFrom", event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="record-date-to">
          To
        </label>

        <input
          id="record-date-to"
          type="date"
          value={filters?.dateTo || ""}
          onChange={(event) =>
            update("dateTo", event.target.value)
          }
        />
      </div>

      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default MedicalRecordFilters;
