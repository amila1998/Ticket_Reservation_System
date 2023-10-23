package com.exbook.services;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.models.Booking;
import com.exbook.models.ScheduleObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.BOOKINGS_ENDPOINT;

public class PostReservation {
    private Context context;

    public PostReservation(Context context) {
        this.context = context;
    }

    public void book(ScheduleObject scheduleObject,IResponse iResponse) throws JSONException {
        String url = BASE_URL+BOOKINGS_ENDPOINT;
        JSONArray bookingArray = new JSONArray();
        List<Booking> bookings;
        bookings = scheduleObject.getBookings();
        for (Booking booking : bookings) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id","0");
            jsonObject.put("createdAt", booking.getCreatedAt());
            jsonObject.put("createdBy", booking.getCreatedBy());
            jsonObject.put("scheduleId", booking.getScheduleId());
            jsonObject.put("pickStation", booking.getPickStation());
            jsonObject.put("dropStation", booking.getDropStation());
            jsonObject.put("bookingDate", booking.getBookingDate());
            jsonObject.put("ticketCount", booking.getTicketCount());
            jsonObject.put("ticketPrice", booking.getTicketPrice());
            bookingArray.put(jsonObject);
        }
        JSONObject scheduleobj = new JSONObject();
        scheduleobj.put("ownerId", scheduleObject.getOwnerId());
        scheduleobj.put("totalPrice", scheduleObject.getTotalPrice());
        scheduleobj.put("createdAt", scheduleObject.getCreatedAt());
        scheduleobj.put("bookings", bookingArray);
        System.out.println("scheduleobj "+scheduleobj);
        StringRequest stringRequest = new StringRequest(
                Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        iResponse.onSuccess(response);
                        System.out.println("POST SCHEDULE RESPONSE "+response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // System.out.println(error.toString());
                        iResponse.onFailled(error.toString());
                    }
                }) {
            @Override
            public byte[] getBody() {
                return scheduleobj.toString().getBytes();
            }

            @Override
            public String getBodyContentType() {
                return "application/json";
            }
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                String token = SharedPreferenceHelper.getInstance(context).getToken();
                headers.put("Authorization", "Bearer " + token);
                return headers;
            }
        };

        RequestQueue queue = Volley.newRequestQueue(context);
        queue.add(stringRequest);

    }
}
