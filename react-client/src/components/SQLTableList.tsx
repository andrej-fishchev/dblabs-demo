import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import SQLTableListItem from "./SQLTableListItem";
import {Dns} from "@mui/icons-material";
import axios from "../api";
import {ISQLNormalResponse, ISQLResponse, SQLResponseNormalize, SQLResponseNull} from "../models/ISQLResponse";
import {ISQLTableRowItem,
    SQLTableRowMapListToRowItemList}
    from "../models/ISQLTableRow";
import {ISQLError} from "../models/ISQLError";
import {AxiosResponse} from "axios";

type ISQLTablesListStates = {
    table: ISQLNormalResponse
    errors: ISQLError[],
    loading: boolean
}

type ISQLTablesListProps = {
    header: string,
    query: string
}

export class SQLTablesList extends React.Component<ISQLTablesListProps, ISQLTablesListStates> {

    constructor(props: ISQLTablesListProps) {
        super(props);

        this.state = {
            table: SQLResponseNull,
            errors: [],
            loading: false
        }
    }

    emptyElement: JSX.Element =
        <SQLTableListItem
            id={"empty"} icon={<Dns />} name={"Список пуст"} props={[]} />;

    componentDidMount() {
        axios.post('/sql', null, {
            params: {
                "query": this.props.query
            }})
            .then((results: AxiosResponse<ISQLResponse>) => {

                this.setState({
                    loading: false,
                    table: SQLResponseNormalize(results.data),
                    errors: results.data.errors
                })
            })
            .catch((reason) => {

                this.setState({
                    loading: false
                })
            });

        setTimeout(() => this.componentDidMount(), 15000);
    }

    render () {
        return <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
            subheader={
                <ListSubheader>
                    {this.props.header}
                </ListSubheader>
            }
        >
            {this.state.table.table_rows.length === 0 && this.emptyElement}

            {SQLTableRowMapListToRowItemList(
                this.state.table.table_rows)
                    .map((elem: ISQLTableRowItem, index: number) => {
                        return <SQLTableListItem
                            id={elem.value[0].id}
                            key={elem.value[0].value}
                            icon={<Dns/>}
                            name={elem.value[1].value + '.' + elem.value[0].value}
                            props={[]}/>

                    })
            }

        </List>
    }
}