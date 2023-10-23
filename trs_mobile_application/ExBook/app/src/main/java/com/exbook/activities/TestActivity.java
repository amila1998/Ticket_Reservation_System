package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.exbook.R;
import com.exbook.models.Booking;
import com.exbook.models.ScheduleObject;
import com.exbook.services.IResponse;
import com.exbook.services.PostReservation;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class TestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);

        PostReservation postSchedule =  new PostReservation(TestActivity.this);
        Booking booking =  new Booking();
        booking.setBookingDate("2023-10-24");
        booking.setCreatedAt("2023-10-24");
        booking.setCreatedBy("Amila");
        booking.setScheduleId("6522ece0284f6e94ce47b4d7");
        booking.setId("1");
        booking.setPickStation("Colombo Fort, Western Province");
        booking.setDropStation("Dematagoda, Western Province");
        booking.setTicketCount(2);
        booking.setTicketPrice(30);

        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(booking);

        ScheduleObject scheduleObject = new ScheduleObject();
        scheduleObject.setCreatedAt("2023-10-24");
        scheduleObject.setOwnerId("6517cb823f5bb25d602e4cd8");
        scheduleObject.setTotalPrice(60);
        scheduleObject.setBookings(bookingList);

        IResponse iResponse = new IResponse() {
            @Override
            public void onSuccess(String response) {
                IResponse.super.onSuccess(response);
            }

            @Override
            public void onFailled(String error) {
                IResponse.super.onFailled(error);
            }
        };
        try {
            postSchedule.book(scheduleObject,iResponse);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

    }
}