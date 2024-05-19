import * as mongoose from 'mongoose';

export const DmiSchema = new mongoose.Schema({
    vehicleInfo: {
        vehicle_id: null || String,
        technician_id_1: null || String,
        technician_id_2: null || String,
        work_order_number: null || String
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

