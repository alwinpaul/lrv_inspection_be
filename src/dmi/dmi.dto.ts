export class SaveFormDTO {
    id?: string
    cabData: Array<ICabFormItem>
    exteriorData: Array<IExteriorFormItem>
    exteriorOptionalData: Array<IExteriorFormItem>
    psgData: Array<IPsgCompartmentFormItem>
    dddData: Array<IDDDFormItem>
    mileage: number
    notes: string
    fitForService: boolean
    vehicleInfo: IVehicleInfo
    dateTime: string
    pdf?: string
    initials: string
}
export interface IVehicleInfo {
    vehicle_id: null | string,
    technician_id_1: null | string,
    technician_id_2: null | string,
    work_order_number: null | string
}

export interface ICabFormItem {
    id: number,
    label: string,
    cab_a_value: boolean,
    cab_b_value: boolean
}

export interface IDDDFormItem {
    id: number,
    label: string,
    cab_a_value: boolean,
    cab_b_value: boolean
}

export interface IExteriorFormItem {
    id: number,
    label: string,
    value: boolean,
}

export interface IPsgCompartmentFormItem {
    id: number,
    label: string,
    value: boolean,
}