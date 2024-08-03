package com.example.locationproject.enums;

public enum MarkerType {

    CUSTOM,
    BUILDING,
    ROAD,
    RESTAURANT,
    STORE,
    PARK,
    RIVER,
    LAKE;


    @Override
    public String toString() {
        return this.name();
    }

    public static MarkerType fromString(String value) {
        try {
            return MarkerType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
