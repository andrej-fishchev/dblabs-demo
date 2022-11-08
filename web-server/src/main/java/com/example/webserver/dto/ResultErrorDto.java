package com.example.webserver.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultErrorDto {

    @JsonProperty("state")
    String sqlState;

    @JsonProperty("code")
    int errorCode;

    @JsonProperty("message")
    String message;
}
