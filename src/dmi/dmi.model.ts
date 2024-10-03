import * as mongoose from 'mongoose';

export const DmiSchema = new mongoose.Schema({
    vehicleInfo: {
        vehicle_id: String || null,
        technician_id_1: String || null,
        technician_id_2: String || null,
        work_order_number: String || null
    },
    cabData: [{
        label: String,
        cab_a_value: Boolean,
        cab_b_value: Boolean
    }],
    exteriorData: [{
        label: String,
        value: Boolean,
    }],
    exteriorOptionalData: [{
        label: String,
        value: Boolean,
    }],
    psgData: [{
        label: String,
        value: Boolean,
    }],
    dddData: [{
        label: String,
        cab_a_value: Boolean,
        cab_b_value: Boolean
    }],
    mileage: Number,
    notes: String,
    fitForService: Boolean,
    dateTime: Date,
    pdf: String,
    initials: String
});

