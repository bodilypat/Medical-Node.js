/* *************************************************************** */
/* File: #src/features/prescriptions/schemas/prescriptionSchema.js */
/* *************************************************************** */

const prescriptionSchema = {
	id: { type: 'string', required: true },
	patientId: { type: 'string', required: true },
	prescriberId: { type: 'string', required: true },
	medication: {
		name: { type: 'string', required: true },
		strength: { type: 'string', required: true },
		dosageForm: { type: 'string', required: true },
		route: { type: 'string', required: true },
	},
	instructions: {
		dose: { type: 'string', required: true },
		frequency: { type: 'string', required: true },
		duration: { type: 'string', required: false },
		quantity: { type: 'number', required: true, min: 1 },
		refills: { type: 'number', required: true, min: 0, default: 0 },
	},
	pharmacyId: { type: 'string', required: false },
	status: {
		type: 'string',
		required: true,
		enum: ['draft', 'active', 'completed', 'cancelled'],
		default: 'draft',
	},
	issuedAt: { type: 'date', required: false },
	expiresAt: { type: 'date', required: false },
	notes: { type: 'string', required: false },
	createdAt: { type: 'date', required: true },
	updatedAt: { type: 'date', required: true },
};

export default prescriptionSchema;
