export interface ISQLTableRowMap<Tv> {
    [id: string]: Tv
}

export interface ISQLTableColumItem {
    id: string,
    value: string
}

export interface ISQLTableRowItem {
    id: string,
    value: ISQLTableColumItem[]
}

export const SQLTableNullRowItem: ISQLTableRowItem = {
    id: "",
    value: []
}

export function SQLTableRowMapListToRowItemList (map: ISQLTableRowMap<string>[]): ISQLTableRowItem[] {
    let list: ISQLTableRowItem[] = [];

    map.forEach((elem: ISQLTableRowMap<string>, index: number) => {
        const item: ISQLTableRowItem = {
            id: index.toString(),
            value: []};

        Object.keys(elem).forEach((key: string) => {
            item.value.push({
                id: key,
                value: elem[key]});
        })

        list.push(item);
    })

    return list;
}