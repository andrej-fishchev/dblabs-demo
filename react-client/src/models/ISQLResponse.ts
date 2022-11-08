import {ISQLError} from './ISQLError'
import {ISQLTableHeader} from './ISQLTableHeader'
import {ISQLTableRowMap} from "./ISQLTableRow";

export interface ISQLResponse {
    success: boolean,
    schema: string|null,
    errors: ISQLError[],
    table_headers: ISQLTableHeader[]|null,
    table_rows: ISQLTableRowMap<string>[]|null
}

export interface ISQLNormalResponse extends ISQLResponse {
    success: boolean,
    schema: string,
    errors: ISQLError[],
    table_headers: ISQLTableHeader[],
    table_rows: ISQLTableRowMap<string>[]
}

export const SQLResponseNull: ISQLNormalResponse = {
    success: false,
    schema: "",
    errors: [],
    table_headers: [],
    table_rows: []
}

export function SQLResponseNormalize (value: ISQLResponse): ISQLNormalResponse {
    return {
        success: value.success,
        schema: (value.schema !== null)
            ? value.schema : "",

        errors: value.errors,
        table_headers: (value.table_headers !== null)
            ? value.table_headers : [],

        table_rows: (value.table_rows !== null)
            ? value.table_rows : [],
    };
}