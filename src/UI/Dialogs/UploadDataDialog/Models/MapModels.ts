import { int } from '@tuval/core';

export interface date_format {
    type: string;
    format: string,
    timeZone: boolean
}
export interface mapping {
    name: string;
    fileName: string;
    mapping: {
        case_id:case_id_map_model[];
        event_id:event_id_map_model[];
        start_timestamp:timestamp_map_model;
        end_timestamp:timestamp_map_model;
        other_timestamp:timestamp_map_model;
        case_attributes: case_attribute_map_model[];
        event_attributes: event_attribute_map_model[];
        resource_id: resource_id_map_model[];
        cost_id: cost_id_map_model[];
    }
}
export interface case_id_map_model {
    title:string;
    index:int;
}

export interface event_id_map_model {
    title:string;
    index:int;
}

export interface timestamp_map_model {
    title:string;
    index:int;
    dateFormat: date_format;
}

export interface case_attribute_map_model {
    title:string;
    index:int;
    alias: string;
}

export interface event_attribute_map_model {
    title:string;
    index:int;
    alias: string;
}

export interface resource_id_map_model {
    title:string;
    alias: string;
    index:int;
}
export interface cost_id_map_model {
    title:string;
    alias: string;
    index:int;
}