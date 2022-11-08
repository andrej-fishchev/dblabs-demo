export enum NULLABLE_STATES {
    STATE_NULLABLE_NON = 0,
    STATE_NULLABLE,
    STATE_NULLABLE_UNKNOWN
}

export interface ISQLTableHeader {
    id: number,
    schema: string,
    table_name: string,
    column_name: string,
    column_label: string,
    type: string,
    display_size: number,
    signed: boolean,
    auto_increment: boolean,
    nullable_state: NULLABLE_STATES
}