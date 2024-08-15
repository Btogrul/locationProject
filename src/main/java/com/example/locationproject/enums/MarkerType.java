package com.example.locationproject.enums;

import lombok.Getter;

@Getter
public enum MarkerType {

    CUSTOM,
    BUILDING,
    ROAD,
    RESTAURANT,
    STORE,
    PARK,
    RIVER,
    LAKE;





    public static MarkerType fromString(String value) {
        try {
            return MarkerType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    @Override
    public String toString() {
        return this.name();
    }

//    private String value;
//
//    MarkerType(String value) {
//        this.value = value;
//    }
//
//    @JsonValue
//    public String getValue() {
//        return value;
//    }



//    @JsonCreator
//
//    public  static MarkerType getMarkerTypeFromString(String value) {
//        for (MarkerType type : MarkerType.values()) {
//            if (type.getValue().equalsIgnoreCase(value)) {
//                return type;
//            }
//        }
//        throw new IllegalArgumentException("Invalid value for MarkerType: " + value);
//    }
}
