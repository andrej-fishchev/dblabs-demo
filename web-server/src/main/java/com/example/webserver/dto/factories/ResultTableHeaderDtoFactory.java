package com.example.webserver.dto.factories;

import com.example.webserver.dto.ResultTableHeaderDto;

import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ResultTableHeaderDtoFactory {

    public static ResultTableHeaderDto makeResultTableHeaderDto(
            Long id, String schema, String catalog, String tableName, String columnName,
            String label, String type, Integer displaySize, Boolean isSigned, Boolean isAutoIncrement,
            Integer nullableState

    ) {
        return ResultTableHeaderDto.builder().id(id)
                .catalog(catalog).displaySize(displaySize)
                .isAutoIncrement(isAutoIncrement).nullableState(nullableState).isSigned(isSigned)
                .label(label).columnName(columnName)
                .tableName(tableName).schema(schema)
                .type(type).build();
    }

    public static List<ResultTableHeaderDto> metadataToIterableResultTableHeaderDto
            (ResultSetMetaData metaData) throws SQLException {
        List<ResultTableHeaderDto> resultTableHeaderDtoList = new ArrayList<>();

        if(metaData == null)
            return resultTableHeaderDtoList;

        for(int i = 1; i <= metaData.getColumnCount(); i++)
            resultTableHeaderDtoList.add(makeResultTableHeaderDto(
                    Integer.valueOf(i).longValue(), metaData.getSchemaName(i),
                    metaData.getCatalogName(i), metaData.getTableName(i),
                    metaData.getColumnName(i),
                    metaData.getColumnLabel(i),
                    metaData.getColumnTypeName(i),
                    metaData.getColumnDisplaySize(i),
                    metaData.isSigned(i),
                    metaData.isAutoIncrement(i),
                    metaData.isNullable(i)));

        return resultTableHeaderDtoList;
    }
}
