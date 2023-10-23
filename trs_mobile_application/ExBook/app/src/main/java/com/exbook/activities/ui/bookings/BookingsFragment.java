package com.exbook.activities.ui.bookings;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.exbook.R;
import com.exbook.activities.BookingActivity;
import com.exbook.databinding.FragmentBookingsBinding;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.models.TrainScheduleAdapter;
import com.exbook.models.TrainScheduleModel;
import com.google.gson.JsonObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.BOOKINGS_ENDPOINT;
import static com.exbook.constants.Config.GET_MY_BOOKINGS_ENDPOINT;
import static com.exbook.constants.Config.TRAINSCHEDULE_ENDPOINT;


public class BookingsFragment extends Fragment {
    Context context;
    private FragmentBookingsBinding binding;
    ListView listView;
    TrainScheduleAdapter trainScheduleAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        context = getContext();
        trainScheduleAdapter = new TrainScheduleAdapter(getActivity(), R.layout.t_list_item);
        BookingsViewModel bookingsViewModel =
                new ViewModelProvider(this).get(BookingsViewModel.class);

        binding = FragmentBookingsBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        listView = binding.trainList;
getMyBookings();

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

    public void getMyBookings(){
        String url = BASE_URL + GET_MY_BOOKINGS_ENDPOINT + "/" +  SharedPreferenceHelper.getInstance(getActivity()).getUserId();;

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                System.out.println(response);

                for(int i=0;i<response.length();i++){
                    try {
                        JSONObject object = response.getJSONObject(i);
                        System.out.println(object);
                        JSONArray bookingsArray = object.getJSONArray("bookings");
                        for(int k=0;k<bookingsArray.length();k++){
                            JSONObject bookingObject = bookingsArray.getJSONObject(k);
                            JSONObject trainForTraver = bookingObject.getJSONObject("trainDetails");
                            String trainId = trainForTraver.getString("id");

                            String trainName = trainForTraver.getString("name");
                            String registrationNo = trainForTraver.getString("registraionNo");
                            String imagePath = trainForTraver.getString("imagePath");

                            JSONObject scheduleObject = bookingObject.getJSONObject("scheduleDetails");


                            String scheduleId = scheduleObject.getString("id");
                            int dayType = scheduleObject.getInt("dayType");
                            String startStation = scheduleObject.getString("startStation");
                            String endStation = scheduleObject.getString("endStation");
                            String startTime = scheduleObject.getString("startTime");
                            String endTime = scheduleObject.getString("endTime");
                            boolean isCancelledToday = scheduleObject.getBoolean("isCancelledToday");
                            int speed = scheduleObject.getInt("speed");



                            // Extract fields from the "trainStops" array
                            JSONArray trainStopsArray = scheduleObject.getJSONArray("trainStops");
                            boolean isAvailable = false;
                            for (int m = 0; m < trainStopsArray.length(); m++) {
                                JSONObject trainStopObject = trainStopsArray.getJSONObject(m);
                                JSONObject trainStop = trainStopObject.getJSONObject("trainStop");
                                String trainStopName = trainStop.getString("name");
                                int trainStopOrder = trainStop.getInt("order");
                                String navTime = trainStopObject.getString("navTime");

                                // Now you can use the extracted data as needed
                                // For example, you can print it or store it in data structures
                                System.out.println("Train ID: " + trainId);
                                System.out.println("Train Name: " + trainName);




                            }
              //          }


 //                       JSONArray schedulesArray = object.getJSONArray("schedulesForTraveler");
//                        for (int j = 0; j < schedulesArray.length(); j++) {
//                            JSONObject scheduleObject = schedulesArray.getJSONObject(j);

//                            String scheduleId = scheduleObject.getString("id");
//                            int dayType = scheduleObject.getInt("dayType");
//                            String startStation = scheduleObject.getString("startStation");
//                            String endStation = scheduleObject.getString("endStation");
//                            String startTime = scheduleObject.getString("startTime");
//                            String endTime = scheduleObject.getString("endTime");
//                            boolean isCancelledToday = scheduleObject.getBoolean("isCancelledToday");
//                            int speed = scheduleObject.getInt("speed");
//
//
//
//                            // Extract fields from the "trainStops" array
//                            JSONArray trainStopsArray = scheduleObject.getJSONArray("trainStops");
//                            boolean isAvailable = false;
//                            for (int k = 0; k < trainStopsArray.length(); k++) {
//                                JSONObject trainStopObject = trainStopsArray.getJSONObject(k);
//                                JSONObject trainStop = trainStopObject.getJSONObject("trainStop");
//                                String trainStopName = trainStop.getString("name");
//                                int trainStopOrder = trainStop.getInt("order");
//                                String navTime = trainStopObject.getString("navTime");
//
//                                // Now you can use the extracted data as needed
//                                // For example, you can print it or store it in data structures
//                                System.out.println("Train ID: " + trainId);
//                                System.out.println("Train Name: " + trainName);
//
//
//
//
//                            }

                                TrainScheduleModel model1 = new TrainScheduleModel( trainName, "Colombo", "Badulla", startTime,endTime,imagePath);

                                trainScheduleAdapter.add(model1);
                                listView.setAdapter(trainScheduleAdapter);

                        }
                    } catch (JSONException e) {
                        throw new RuntimeException(e);
                    }
                }



            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
                // Handle error response
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
        queue.add(jsonArrayRequest);
    }

}