package com.example.webserver.singletons;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


@Component
@Scope("singleton")
@AllArgsConstructor
@NoArgsConstructor
public class SQLConnectionSingleton implements AutoCloseable {
    private static Connection connection;
    @Value(value = "${spring.datasource.url}")
    private String dataSourceURL;
    @Value(value = "${spring.datasource.username}")
    private String dataSourceUser;
    @Value(value = "${spring.datasource.password}")
    private String dataSourcePassword;

    public Connection getConnection() throws SQLException {
        if(connection == null || connection.isClosed())
            connection = DriverManager.getConnection(
                    dataSourceURL,
                    dataSourceUser,
                    dataSourcePassword);

        return connection;
    }

    @Bean
    public SQLConnectionSingleton sqlConnectionSingleton() {
        return new SQLConnectionSingleton(dataSourceURL, dataSourceUser, dataSourcePassword);
    }

    @Override
    public void close() throws Exception {
        if(connection != null)
            connection.close();
    }
}
