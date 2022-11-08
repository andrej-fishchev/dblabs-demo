package com.example.webserver.dto.factories;

import com.example.webserver.dto.ResultErrorDto;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ResultErrorDtoFactory {

    public static ResultErrorDto makeResultErrorDto(SQLException exception) {

        return ResultErrorDto.builder()
                .errorCode(exception.getErrorCode())
                .sqlState(exception.getSQLState())
                .message(exception.getMessage())
                .build();
    }

    public static List<ResultErrorDto> exceptionsToIterableDto(SQLException exception) {
        List<ResultErrorDto> resultErrorDtoIterable =
                new ArrayList<>();

        do resultErrorDtoIterable.add(makeResultErrorDto(exception));
        while (exception.getNextException() != null);

        return resultErrorDtoIterable;
    }
}
