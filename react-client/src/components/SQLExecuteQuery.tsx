import React from "react";
import {ISQLResponse} from "../models/ISQLResponse";
import axios from 'axios';
import {AxiosResponse} from "axios";
import {Box, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import {withSnackbar, VariantType, ProviderContext} from "notistack";
import {ISQLError} from "../models/ISQLError";

interface SQLExecuteQueryProps extends ProviderContext {
    onSQLResponse: (data: ISQLResponse) => void
}

type SQLExecuteQueryStates = {
    loading: boolean,
    inputData: string
}

class SQLExecuteQuery extends
    React.Component<SQLExecuteQueryProps, SQLExecuteQueryStates> {

    constructor(props: SQLExecuteQueryProps, states: SQLExecuteQueryStates) {
        super(props, states);

        this.state = {
            loading: false,
            inputData: ""
        }
    }

    componentDidMount() {
        if(this.state.inputData === "")
            return;

        this.setState({
            loading: true
        })

        axios.post(process.env.REACT_APP_BASE_URL + '', null, {
            params: {"query": this.state.inputData}})
            .then((response: AxiosResponse) => response.data)
            .then((data: ISQLResponse) => {

                this.setState({
                    loading: false})

                if(data.success) {
                    this.props.onSQLResponse(data);
                    this.props.enqueueSnackbar('Запрос выполнен успешно', {
                        variant: 'success'})
                }

                this.handleSQLErrors(data.errors, 'error');
            })
            .catch((reason) => {
                this.setState({
                    loading: false})

                this.props.enqueueSnackbar(reason.message, {
                    variant: 'error'});
            })
    }

    handleSQLErrors (sqlErrors: ISQLError[], variant: VariantType)  {
        // variant could be success, error, warning, info, or default

        sqlErrors.forEach((error) => {
            this.props.enqueueSnackbar(error.message, {variant});
        })
    }

    buttonClickHandler = () => {
        if(this.state.inputData !== "")
            this.componentDidMount();
    }

    onDataInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            inputData: event.target.value})
    }

    onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.onDataInput(event);
    }

    render () {
        return <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <TextField
                    id="input-with-sx"
                    label="Await SQL"
                    variant="outlined"
                    onInput={this.onDataInput}
                    onChange={this.onValueChange}
                    placeholder="input query..."
                    multiline
                    fullWidth
                />
                <LoadingButton
                    size="small"
                    onClick={this.buttonClickHandler}
                    endIcon={<SendIcon />}
                    loading={this.state.loading}
                    loadingPosition="center"
                    variant="outlined"
                    sx={{
                        height: '56px',
                        marginLeft: '10px'
                    }}
                >

                </LoadingButton>
            </Box>;
    }
}

export default withSnackbar<SQLExecuteQueryProps>(SQLExecuteQuery);
