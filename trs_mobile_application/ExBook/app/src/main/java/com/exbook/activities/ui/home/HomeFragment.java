package com.exbook.activities.ui.home;

import android.app.DatePickerDialog;
import android.content.Context;
import android.content.Intent;
import android.icu.text.SimpleDateFormat;
import android.icu.util.Calendar;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.exbook.R;
import com.exbook.activities.BookingActivity;
import com.exbook.activities.SplashActivity;
import com.exbook.databinding.FragmentHomeBinding;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.models.TrainScheduleAdapter;
import com.exbook.models.TrainScheduleModel;
import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static com.exbook.constants.Config.BASE_URL;
import static com.exbook.constants.Config.TRAINSCHEDULE_ENDPOINT;
import static com.exbook.constants.Config.USER_DEACTIVATE_ENDPOINT;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;
    Context context;
    Calendar calendar;
    ListView listView;
    JSONObject jsonObject;
    JSONArray jsonArray;
    TrainScheduleModel model;
    String trainId,trainName,registrationNo,imagePath;
    TrainScheduleAdapter trainScheduleAdapter;
    List<String> ID_ARRAY = new ArrayList<>();
    List<String> TRAIN_ID_ARRAY = new ArrayList<>();
    List<String> FROM_ARRAY = new ArrayList<>();
    List<String> TO_ARRAY = new ArrayList<>();
    List<String> NAME_ARRAY = new ArrayList<>();
    List<String> DATE_ARRAY = new ArrayList<>();


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {


        context = getContext();
        trainScheduleAdapter = new TrainScheduleAdapter(getActivity(), R.layout.t_list_item);
        String token = SharedPreferenceHelper.getInstance(getActivity()).getToken();
        System.out.println("Token "+token);



        /*HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);*/
        //parse application context here
        HomeViewModel homeViewModel = new ViewModelProvider(this, new ViewModelProvider.AndroidViewModelFactory(requireActivity().getApplication())).get(HomeViewModel.class);

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

         EditText start = binding.from;
         EditText end = binding.to;
        ImageView iv = binding.calender;
        Button btn = binding.search;
         listView = binding.trainList;

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getSchedule(start.getText().toString(),end.getText().toString());
            }
        });

         listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
             @Override
             public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                 String GET_ID = ID_ARRAY.get(position).toString();
                 String GET_NAME = NAME_ARRAY.get(position).toString();
                 String GET_FROM = FROM_ARRAY.get(position).toString();
                 String GET_TO = TO_ARRAY.get(position).toString();


                 Intent intent = new Intent(getActivity(), BookingActivity.class);
                 intent.putExtra("ID", GET_ID);
                 intent.putExtra("NAME", GET_NAME);
                 intent.putExtra("FROM", GET_FROM);
                 intent.putExtra("TO", GET_TO);
                 startActivity(intent);
             }
         });

        return root;
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
    private void showDatePickerDialog() {

        int year = 0;
        int month = 0;
        int dayOfMonth = 0;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
            year = calendar.get(Calendar.YEAR);
             month = calendar.get(Calendar.MONTH);
             dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
        }


        DatePickerDialog datePickerDialog = new DatePickerDialog(
                getActivity(),
                new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                            calendar.set(Calendar.YEAR, year);
                            calendar.set(Calendar.MONTH, monthOfYear);
                            calendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                        }


                        SimpleDateFormat sdf = null;
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                            sdf = new SimpleDateFormat("EEEE", Locale.getDefault());
                        }
                        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
                            String dayOfWeek = sdf.format(calendar.getTime());
                        }
                    }
                },
                year,
                month,
                dayOfMonth
        );

        datePickerDialog.show();
    }

    /**
     * Get filtered schedules with starting station and end station
     * @param from
     * @param to
     */
    public void getSchedule(String from,String to) {
        String url = BASE_URL + TRAINSCHEDULE_ENDPOINT;


        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                System.out.println(response);


                for(int i=0;i<response.length();i++){
                    try {
                        JSONObject object = response.getJSONObject(i);
                        JSONObject trainForTraver = object.getJSONObject("trainForTraver");
                        String trainId = trainForTraver.getString("id");


                        String trainName = trainForTraver.getString("name");
                        NAME_ARRAY.add(trainName);
                        String registrationNo = trainForTraver.getString("registraionNo");
                        String imagePath = trainForTraver.getString("imagePath");
                        JSONArray schedulesArray = object.getJSONArray("schedulesForTraveler");
                        for (int j = 0; j < schedulesArray.length(); j++) {
                            JSONObject scheduleObject = schedulesArray.getJSONObject(j);

                            String scheduleId = scheduleObject.getString("id");
                            ID_ARRAY.add(scheduleId);
                            int dayType = scheduleObject.getInt("dayType");
                            String startStation = scheduleObject.getString("startStation");
                            String endStation = scheduleObject.getString("endStation");
                            String startTime = scheduleObject.getString("startTime");
                            String endTime = scheduleObject.getString("endTime");
                            boolean isCancelledToday = scheduleObject.getBoolean("isCancelledToday");
                            int speed = scheduleObject.getInt("speed");
                            FROM_ARRAY.add(startStation);
                            TO_ARRAY.add(endStation);


                            // Extract fields from the "trainStops" array
                            JSONArray trainStopsArray = scheduleObject.getJSONArray("trainStops");
                            boolean isAvailable = false;
                            for (int k = 0; k < trainStopsArray.length(); k++) {
                                JSONObject trainStopObject = trainStopsArray.getJSONObject(k);
                                JSONObject trainStop = trainStopObject.getJSONObject("trainStop");
                                String trainStopName = trainStop.getString("name");
                                int trainStopOrder = trainStop.getInt("order");
                                String navTime = trainStopObject.getString("navTime");

                                // Now you can use the extracted data as needed
                                // For example, you can print it or store it in data structures
                                System.out.println("Train ID: " + trainId);
                                System.out.println("Train Name: " + trainName);
                                boolean match1 = startStation.matches(".*" + from + ".*");
                                boolean match2 = endStation.matches(".*" + to + ".*");
                                boolean match3 = trainStopName.matches(".*" + to + ".*");
                                boolean match4 = trainStopName.matches(".*" + from + ".*");

                                if((match1 && match2) ||(match3 && match4)||(match1 && match3)||(match2 && match4)) {
                                    isAvailable=true;
                                }



                            }
                            if(isAvailable){
                                TrainScheduleModel model1 = new TrainScheduleModel( trainName, from, to, startTime,endTime,imagePath);
                                trainScheduleAdapter.add(model1);
                                listView.setAdapter(trainScheduleAdapter);
                                trainScheduleAdapter.notifyDataSetChanged();
                            }
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