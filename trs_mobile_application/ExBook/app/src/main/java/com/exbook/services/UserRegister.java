package com.exbook.services;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import org.json.JSONException;
import org.json.JSONObject;
import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.USER_REGISTRATION_ENDPOINT;

public class UserRegister {
    private String name;
    private String password;
    private String role;
    private String nic;
    private String imagePath;
    private String contactNo;
    private String email;
    private Context context;

    public UserRegister(String name, String password, String nic, String imagePath, String contactNo, String email,Context context) {
        this.name = name;
        this.password = password;
        this.role = "traveler";
        this.nic = nic;
        this.imagePath = imagePath;
        this.contactNo = contactNo;
        this.email = email;
        this.context = context;
    }
    public void registerUser(IResponse iUserRegister){
        String url = BASE_URL+USER_REGISTRATION_ENDPOINT;
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("name", name);
            requestBody.put("password", password);
            requestBody.put("role", role);
            requestBody.put("nic", nic);
            requestBody.put("imagePath", imagePath);
            requestBody.put("contactNo", contactNo);
            requestBody.put("email", email);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        StringRequest stringRequest = new StringRequest(
                Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        iUserRegister.onSuccess(response);
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                       // System.out.println(error.toString());
                        iUserRegister.onFailled(error.toString());
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
                headers.put("Authorization", "Bearer " + token);
                return headers;
            }*/
        };

        RequestQueue queue = Volley.newRequestQueue(context);
        queue.add(stringRequest);

    }
}

