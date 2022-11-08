import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import SQLTableListItem from "./SQLTableListItem";
import {Dns} from "@mui/icons-material";
import axios, {AxiosResponse} from "axios";
import {ISQLResponse, SQLResponseNormalize} from "../models/ISQLResponse";
import {ISQLTableColumItem, ISQLTableRowItem, SQLTableRowMapListToRowItemList} from "../models/ISQLTableRow";
import {ISQLError} from "../models/ISQLError";


type ISQLTablesListStates = {
    items: ISQLTableRowItem[],
    errors: ISQLError[],
    loading: boolean
}

type ISQLTablesListProps = {
    header: string,
    tableType: string
}

export class SQLTablesList extends React.Component<ISQLTablesListProps, ISQLTablesListStates> {

    emptyElement: JSX.Element =
        <SQLTableListItem id={"empty"} icon={<Dns />} name={"Список пуст"} props={[]} />

    tableListQueryTemplate: string =
        'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_TYPE like ';

    UNSAFE_componentWillMount() {
        this.setState({
            items: []
        })
    }

    componentDidMount() {

        axios.post<ISQLResponse>(process.env.REACT_APP_BASE_URL + '', null, {
            params: {
                "query": this.tableListQueryTemplate + "'" + this.props.tableType + "'"
            }})
            .then((results: AxiosResponse<ISQLResponse>) => {
                this.setState({
                    loading: false,
                    items: SQLTableRowMapListToRowItemList(SQLResponseNormalize(results.data).table_rows),
                    errors: results.data.errors
                })
            })
            .catch((reason) => this.setState({
                loading: false
            }));
    }

    onClickOnHeader = () => this.componentDidMount();

    render () {
        return <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            subheader={
                <ListSubheader onClick={ this.onClickOnHeader }>
                    {this.props.header}
                </ListSubheader>
            }
        >
            {this.state.items.length === 0 && this.emptyElement}
            <>
            {this.state.items.map(function (elem: ISQLTableRowItem) {
                    const list: JSX.Element[] = [];

                    elem.value.forEach((column: ISQLTableColumItem, index: number) => {
                        if (index === 0)
                            list.push(<SQLTableListItem
                                id={column.id}
                                key={column.value}
                                icon={<Dns/>}
                                name={column.value}
                                props={[]}/>)
                    })

                    return list;
                })
            }
            </>
        </List>
    }
}