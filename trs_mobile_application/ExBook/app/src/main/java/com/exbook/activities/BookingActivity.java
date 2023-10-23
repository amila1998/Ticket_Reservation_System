package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.exbook.R;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.models.Booking;
import com.exbook.models.ScheduleObject;
import com.exbook.services.IResponse;
import com.exbook.services.PostReservation;

import org.json.JSONException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BookingActivity extends AppCompatActivity {
TextView nameT,fromT,toT,priceT;
Button bookNow;
String id,name,from,to,date;
int count;
int price;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_booking);
        Intent intent = getIntent();
         id = intent.getStringExtra("ID");
         name = intent.getStringExtra("NAME");
         from = intent.getStringExtra("FROM");
         to = intent.getStringExtra("TO");
         date = intent.getStringExtra("DATE");

        nameT = (TextView)findViewById(R.id.name);
        fromT = (TextView)findViewById(R.id.from);
        toT = (TextView)findViewById(R.id.to);
        priceT = (TextView)findViewById(R.id.price);
        bookNow = (Button)findViewById(R.id.book);

        nameT.setText(name);
        fromT.setText(from);
        toT.setText(to);
        priceT.setText("LKR 80.00");
        bookNow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                book();
            }
        });
    }

    public void book(){
        LocalDate datenow = null;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            datenow = LocalDate.now();
        }
        String userID = SharedPreferenceHelper.getInstance(BookingActivity.this).getUserId();
        String userName = SharedPreferenceHelper.getInstance(BookingActivity.this).getUserName();
        PostReservation postSchedule =  new PostReservation(BookingActivity.this);
        Booking booking =  new Booking();
        booking.setBookingDate("2023-10-24");
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//
//        }
        booking.setCreatedAt("2023-10-24");
        booking.setCreatedBy(userID);
        booking.setScheduleId(id);
        booking.setId("0");
        booking.setPickStation(from);
        booking.setDropStation(to);
        booking.setTicketCount(1);
        booking.setTicketPrice(price);

        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(booking);

        ScheduleObject scheduleObject = new ScheduleObject();
        scheduleObject.setCreatedAt("2023-10-24");
        scheduleObject.setOwnerId(userID);
        scheduleObject.setTotalPrice(count*price);
        scheduleObject.setBookings(bookingList);
        System.out.println(scheduleObject);
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
            System.out.println(e);
            //throw new RuntimeException(e);

        }
    }
}