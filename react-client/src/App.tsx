import React, {Component} from 'react';
import {Box, Container, Grid, Paper} from "@mui/material";
import {styled} from '@mui/material/styles';
import {ISQLNormalResponse, ISQLResponse, SQLResponseNormalize, SQLResponseNull} from "./models/ISQLResponse";
import {SQLTablesList} from "./components/SQLTableList";
import SQLExecuteQuery from "./components/SQLExecuteQuery";
import {SQLTable} from "./components/SQLTable";
import { SnackbarProvider } from 'notistack';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type SQLTableMenuStructure = {
  header: string,
  tableType: string
}

type AppStates = {
  data: ISQLNormalResponse
}

type AppProps = {

}

export default class App extends Component<AppProps, AppStates>
{
  constructor(props: AppProps, states: AppStates) {
    super(props, states);

    this.state = {
      data: SQLResponseNull
    }
  }

  onSendRequest = (receivedData: ISQLResponse) => {
    if(receivedData.table_rows === null || receivedData.table_rows.length === 0)
      return;

    this.setState({
      data: SQLResponseNormalize(receivedData)
    });
  }

  createResultTable(data: ISQLNormalResponse) : JSX.Element {
    return <SQLTable sqlResponse={data} />
  }

  RenderSQLTablesMenus () : JSX.Element[] {
    const tablesMenuList: SQLTableMenuStructure[] = [
      {header: "Список таблиц", tableType: "BASE TABLE"},
      {header: "Список представлений", tableType: "VIEW"}
    ];

    const createElement = (table: SQLTableMenuStructure, index: number) => {
      return <Item sx = {{
        marginTop: (index > 0) ? '10%' : '0',
        maxWidth: '100%'
      }}>
        <SQLTablesList header={table.header} tableType={table.tableType} />
      </Item>
    }

    return tablesMenuList.map((element: SQLTableMenuStructure, index: number) => createElement(element, index))
  }

  render () {
    return <Box key={'main_box'} sx={{
      flexGrow: 1,
      width: '80%',
      height: 'auto',
      margin: ['10%', '10%', '10%', '10%']
    }}>
      <Grid container item spacing={1}>
        <Grid container spacing={4}>
          <Grid item sx={{
            minWidth: '20%'
          }}>
            {this.RenderSQLTablesMenus()}
          </Grid>
          <Grid item sx={{
            minWidth: '50%',
            maxWidth: '60%'
          }}>
            <Container fixed>

              <SnackbarProvider maxSnack={3} >
                <SQLExecuteQuery
                    onSQLResponse={this.onSendRequest} />
              </SnackbarProvider>

              {this.state.data.success &&
                  this.createResultTable(this.state.data)
              }
            </Container>

          </Grid>
        </Grid>
      </Grid>
    </Box>
  }
}

