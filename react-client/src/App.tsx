import React, {Component} from 'react';
import {Box, Container, Grid, Paper} from "@mui/material";
import {styled} from '@mui/material/styles';
import {ISQLNormalResponse, ISQLResponse, SQLResponseNormalize, SQLResponseNull} from "./models/ISQLResponse";
import SQLExecuteQuery from "./components/SQLExecuteQuery";
import {SQLTable} from "./components/SQLTable";
import { SnackbarProvider } from 'notistack';
import {SQLTablesList} from "./components/SQLTableList";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type SQLTableMenuStructure = {
  header: string,
  query: string
}

type AppStates = {
  data: ISQLNormalResponse,
  menus: JSX.Element[]
}

type AppProps = {}

export default class App extends Component<AppProps, AppStates>
{
  constructor(props: AppProps) {
    super(props);

    this.state = {
      data: SQLResponseNull,
      menus: this.RenderSQLTablesMenus()
    }
  }

  RenderSQLTablesMenus () : JSX.Element[] {
    const tablesMenuList: SQLTableMenuStructure[] = [
      {header: "Список таблиц",         query: "SELECT TABLE_NAME, TABLE_SCHEMA FROM information_schema.TABLES WHERE TABLE_TYPE='BASE TABLE'"},
      {header: "Список представлений",  query: "SELECT TABLE_NAME, TABLE_SCHEMA FROM information_schema.TABLES WHERE TABLE_TYPE='VIEW'"},
      {header: "Список триггеров",      query: "SELECT TRIGGER_NAME, TRIGGER_SCHEMA FROM information_schema.TRIGGERS"},
      {header: "Список процедур",       query: "SELECT ROUTINE_NAME, ROUTINE_SCHEMA FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE='PROCEDURE';"}
    ];

    const createElement = (table: SQLTableMenuStructure, index: number) => {
      return <Item sx = {{
        marginTop: (index > 0) ? '10%' : '0',
        maxWidth: '100%'
      }}>
        <SQLTablesList header={table.header} query={table.query} />
      </Item>
    }

    return tablesMenuList.map((element: SQLTableMenuStructure, index: number) => createElement(element, index))
  }


  onSendRequest = (receivedData: ISQLResponse) => {
    this.setState({
      data: SQLResponseNormalize(receivedData),
      menus: this.RenderSQLTablesMenus()
    });
  }

  createResultTable(data: ISQLNormalResponse) : JSX.Element {
    return <SQLTable table={data} />
  }

  render () {
    return <Box key={'main_box'} sx={{
      flexGrow: 1,
      width: '80%',
      height: 'auto',
      margin: ['10%', '10%', '5%', '5%']
    }}>
      <Grid container item spacing={1}>
        <Grid container spacing={4}>
          <Grid item sx={{
            minWidth: '20%'
          }}>
            { this.state.menus.length !== 0 && this.state.menus }
          </Grid>
          <Grid item sx={{
            minWidth: '60%',
            maxWidth: '70%'
          }}>
            <Container fixed>

              <SnackbarProvider maxSnack={3} >
                <SQLExecuteQuery onSQLResponse={this.onSendRequest} />
              </SnackbarProvider>

              {(this.state.data.table_rows.length !== 0)
                  ? this.createResultTable(this.state.data)
                  : ""
              }

            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  }
}