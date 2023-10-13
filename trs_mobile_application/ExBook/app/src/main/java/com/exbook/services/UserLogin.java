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
import static com.exbook.constants.Config.USER_LOGIN_ENDPOINT;
import static com.exbook.constants.Config.USER_REGISTRATION_ENDPOINT;

public class UserLogin {
    private String name;
    private String password;
    private String role;
    private String nic;
    private String imagePath;
    private String contactNo;
    private String email;
    private Context context;

    public UserLogin(String nic, String password,Context context) {
        this.nic = nic;
        this.password = password;
        this.context = context;
    }
    public void auth(IResponse iUserLogin){
        String url = BASE_URL+USER_LOGIN_ENDPOINT;
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("nic", nic);
            requestBody.put("password", password);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        StringRequest stringRequest = new StringRequest(
                Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        iUserLogin.onSuccess(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // System.out.println(error.toString());
                        iUserLogin.onFailled(error.toString());
                    }
                }) {
            @Override
            public byte[] getBody() {
                return requestBody.toString().getBytes();
            }

            @Override
            public String getBodyContentType() {
                return "application/json";
            }
            /*@Override
            public Map<String, String> getHeaders() {
                Map<String, String> headers = new HashMap<>();
                String token = SharedPreferenceHelper.getInstance(context).getToken();
                headers.put("Authorization", "Bearer " + token);
                return headers;
            }*/
        };

        RequestQueue queue = Volley.newRequestQueue(context);
        queue.add(stringRequest);

    }
}

