package com.example.webserver.dto.factories;

import com.example.webserver.dto.ResultSetDto;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ResultSetDtoFactory {

    public static ResultSetDto makeResultSetDto(ResultSet resultSet) throws SQLException {

        List<HashMap<Long, String>> tableRows =
                new ArrayList<>();

        HashMap<Long, String> tableRow;

        ResultSetMetaData metaDataBuffer = null;

        while (resultSet.next())
        {
            tableRow = new HashMap<>();
            metaDataBuffer = resultSet.getMetaData();

            for(int i = 1; i <= metaDataBuffer.getColumnCount(); i++)
                tableRow.put(Integer.valueOf(i).longValue(), resultSet.getString(i));

            tableRows.add(tableRow);
        }

        return ResultSetDto.builder().isSuccess(true)
                .sqlSchema(resultSet.getMetaData().getSchemaName(1))
                .tableHeaders(ResultTableHeaderDtoFactory.metadataToIterableResultTableHeaderDto(metaDataBuffer))
                .tableRows(tableRows)
                .sqlErrors(new ArrayList<>()).build();
    }

    public static ResultSetDto makeResultSetDto(SQLException exception) {
        return ResultSetDto.builder().isSuccess(false)
                .sqlErrors(ResultErrorDtoFactory.exceptionsToIterableDto(exception))
                .build();
    }
}
