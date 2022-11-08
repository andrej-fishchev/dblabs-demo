export interface ISQLError {
    state: string,
    code: number,
    message: string
}

export const SQLErrorNull: ISQLError = {
    state: "",
    code: 0,
    message: ""
}