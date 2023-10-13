package com.exbook.services;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.exbook.db.SharedPreferenceHelper;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.USER_DETAILS_ENDPOINT;
import static com.exbook.constants.Config.USER_LOGIN_ENDPOINT;

public class UserDetails {

    private Context context;

    public UserDetails(Context context) {
        this.context = context;
    }
    public void getDetails(IResponse iResponse){
        String url = BASE_URL+USER_DETAILS_ENDPOINT;

        StringRequest stringRequest = new StringRequest(
                Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        iResponse.onSuccess(response);
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
