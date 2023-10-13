package com.exbook.services;

public interface IResponse {
    default void onSuccess(String response) {
    }

    default void onFailled(String error) {
    }
}
