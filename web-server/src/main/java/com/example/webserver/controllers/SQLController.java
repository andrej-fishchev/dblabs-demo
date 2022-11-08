package com.example.webserver.controllers;

import com.example.webserver.dto.ResultSetDto;
import com.example.webserver.dto.factories.ResultSetDtoFactory;
import com.example.webserver.singletons.SQLConnectionSingleton;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.sql.Statement;

@RestController
@RequestMapping("/sql")
@AllArgsConstructor(onConstructor_= {@Autowired})
public class SQLController {

    private SQLConnectionSingleton sqlConnectionSingleton;

    @PostMapping
    public ResultSetDto sqlRequest(@RequestParam(
                value = "query",
                required = false,
                defaultValue = "") String sqlQuery) {

        try (Statement sqlStatement = sqlConnectionSingleton
                 .getConnection()
                 .createStatement()) {

            return ResultSetDtoFactory
                    .makeResultSetDto(sqlStatement.executeQuery(sqlQuery));

        } catch (SQLException e) {

            return ResultSetDtoFactory.makeResultSetDto(e);
        }
    }
}
