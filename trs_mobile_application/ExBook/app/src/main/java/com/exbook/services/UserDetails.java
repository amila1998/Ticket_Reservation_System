package com.exbook.services;

import android.content.Context;
import android.net.Uri;
import android.os.FileUtils;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.exbook.db.SharedPreferenceHelper;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.UPDATE_PROFILE_IMAGE_ENDPOINT;
import static com.exbook.constants.Config.UPDATE_USER_ENDPOINT;
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
    public void updateUser(IResponse iResponse,String name,String contact,String imagePath){
        String url = BASE_URL+UPDATE_USER_ENDPOINT;
        JSONObject requestBody = new JSONObject();
        try {
            requestBody.put("name", name);
            requestBody.put("contactNo", contact);
            requestBody.put("imagePath", imagePath);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        StringRequest stringRequest = new StringRequest(
                Request.Method.PUT, url,
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
            @Override
            public byte[] getBody() {
                return requestBody.toString().getBytes();
            }

            @Override
            public String getBodyContentType() {
                return "application/json";
            }
        };

        RequestQueue queue = Volley.newRequestQueue(context);
        queue.add(stringRequest);

    }
    public void updateImage(IResponse iResponse, String imagePath){
        String url = BASE_URL+UPDATE_PROFILE_IMAGE_ENDPOINT;


//        StringRequest stringRequest = new StringRequest(
//                Request.Method.POST, url,
//                new Response.Listener<String>() {
//                    @Override
//                    public void onResponse(String response) {
//                        iResponse.onSuccess(response);
//                    }
//                },
//                new Response.ErrorListener() {
//                    @Override
//                    public void onErrorResponse(VolleyError error) {
//                        // System.out.println(error.toString());
//                        iResponse.onFailled(error.toString());
//                    }
//                }) {
//
//
//
//            @Override
//            public Map<String, String> getHeaders() {
//                Map<String, String> headers = new HashMap<>();
//                String token = SharedPreferenceHelper.getInstance(context).getToken();
//                headers.put("Authorization", "Bearer " + token);
//                return headers;
//            }
//            @Override
//            protected Map<String, String> getParams() {
//                // Create a Map to hold the POST parameters
//                File imageFile = new File(base64);
//                Map<String, String> params = new HashMap<>();
//                //params.put("files", imageFile);
//                System.out.println("image2 "+base64);
//                return params;
//            }
//
//            @Override
//            public String getBodyContentType() {
//                // Set the content type for form data
//                return "multipart/form-data;";
//            }
//        };
        Map<String, String> params = new HashMap<>();
        String token = SharedPreferenceHelper.getInstance(context).getToken();
        params.put("Authorization", "Bearer " + token);
        String fileName = "files";
        MultipartRequest multipartRequest = new MultipartRequest(url, new File(imagePath), fileName, params,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Handle the server response here
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        // Handle the error here
                    }
                });

        RequestQueue queue = Volley.newRequestQueue(context);
        queue.add(multipartRequest);

    }
}
