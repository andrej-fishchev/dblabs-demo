package com.example.webserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultSetDto implements Serializable {

    @JsonProperty(value = "success")
    Boolean isSuccess;

    @JsonProperty(value = "schema")
    String sqlSchema;

    @JsonProperty(value = "errors")
    List<ResultErrorDto> sqlErrors = new ArrayList<>();

    @JsonProperty(value = "table_headers")
    List<ResultTableHeaderDto> tableHeaders = new ArrayList<>();

    @JsonProperty(value = "table_rows")
    List<HashMap<Long, String>> tableRows = new ArrayList<>();
}
