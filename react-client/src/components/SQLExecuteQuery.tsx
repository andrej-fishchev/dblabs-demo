import React, {Component} from "react";
import {ISQLResponse} from "../models/ISQLResponse";
import axios from '../api';
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
    input: string
}

class SQLExecuteQuery extends Component<SQLExecuteQueryProps, SQLExecuteQueryStates> {

    constructor(props: SQLExecuteQueryProps) {
        super(props);

        this.state = {
            loading: false,
            input: ""
        }
    }

    componentDidMount() {
        if(this.state.input === "")
            return;

        this.setState({
            loading: true
        })

        axios.post('/sql', null, {
            params: {"query": this.state.input}})
            .then((response: AxiosResponse<ISQLResponse>) => {
                this.setState({
                    loading: false})

                if(response.data.success) {
                    this.props.onSQLResponse(response.data);
                    this.props.enqueueSnackbar('Запрос выполнен успешно', {
                        variant: 'success'})
                }

                this.handleSQLErrors(response.data.errors, 'error');
            })
            .catch((reason) => {
                this.setState({
                    loading: false})

                this.props.enqueueSnackbar(reason.message, {
                    variant: 'error'});
            })
    }

    handleSQLErrors (sqlErrors: ISQLError[], variant: VariantType)  {
        sqlErrors.forEach((error) => {
            this.props.enqueueSnackbar(error.message, {variant});
        })
    }

    buttonClickHandler = () => {
        if(this.state.input !== "")
            this.componentDidMount();
    }

    onDataInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            input: event.target.value})
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
