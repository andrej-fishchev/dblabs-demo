package com.example.webserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultTableHeaderDto implements Serializable {

    @JsonProperty("id")
    Long id;

    @JsonProperty("schema")
    String schema;

    @JsonProperty("catalog")
    String catalog;

    @JsonProperty("table_name")
    String tableName;

    @JsonProperty("column_name")
    String columnName;

    @JsonProperty("column_label")
    String label;

    @JsonProperty("type")
    String type;

    @JsonProperty("display_size")
    Integer displaySize;

    @JsonProperty("signed")
    Boolean isSigned;

    @JsonProperty("auto_increment")
    Boolean isAutoIncrement;

    @JsonProperty("nullable_state")
    Integer nullableState;
}
