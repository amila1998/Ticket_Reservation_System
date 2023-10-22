package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.exbook.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class TestActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
        String json  = "[\n" +
                "   {\n" +
                "      \"trainForTraver\":{\n" +
                "         \"id\":\"65213500b2046b28005f10ff\",\n" +
                "         \"name\":\"Galu Kumari\",\n" +
                "         \"registraionNo\":\"T0001\",\n" +
                "         \"imagePath\":\"https://res.cloudinary.com/amiladevin1998/image/upload/v1696675053/trs-images/cfrvl7ftgzlawrhlnerw.jpg\"\n" +
                "      },\n" +
                "      \"schedulesForTraveler\":[\n" +
                "         {\n" +
                "            \"id\":\"6522b5346800c4b7ff0eeed3\",\n" +
                "            \"dayType\":0,\n" +
                "            \"startStation\":\"Colombo Fort, Western Province\",\n" +
                "            \"endStation\":\"Badulla, Uva Province\",\n" +
                "            \"trainStops\":[\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Maradana, Western Province\",\n" +
                "                     \"order\":1\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:25\"\n" +
                "               },\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Dematagoda, Western Province\",\n" +
                "                     \"order\":2\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:27\"\n" +
                "               }\n" +
                "            ],\n" +
                "            \"startTime\":\"20:23\",\n" +
                "            \"endTime\":\"23:26\",\n" +
                "            \"trainClasses\":[\n" +
                "               0,\n" +
                "               1,\n" +
                "               2\n" +
                "            ],\n" +
                "            \"cancelDates\":[\n" +
                "               \n" +
                "            ],\n" +
                "            \"isCancelledToday\":false,\n" +
                "            \"speed\":0\n" +
                "         }\n" +
                "      ]\n" +
                "   },\n" +
                "{\n" +
                "      \"trainForTraver\":{\n" +
                "         \"id\":\"65213500b2046b28005f10ff\",\n" +
                "         \"name\":\"Galu Kumari\",\n" +
                "         \"registraionNo\":\"T0001\",\n" +
                "         \"imagePath\":\"https://res.cloudinary.com/amiladevin1998/image/upload/v1696675053/trs-images/cfrvl7ftgzlawrhlnerw.jpg\"\n" +
                "      },\n" +
                "      \"schedulesForTraveler\":[\n" +
                "         {\n" +
                "            \"id\":\"6522b5346800c4b7ff0eeed3\",\n" +
                "            \"dayType\":0,\n" +
                "            \"startStation\":\"Colombo Fort, Western Province\",\n" +
                "            \"endStation\":\"Badulla, Uva Province\",\n" +
                "            \"trainStops\":[\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Maradana, Western Province\",\n" +
                "                     \"order\":1\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:25\"\n" +
                "               },\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Dematagoda, Western Province\",\n" +
                "                     \"order\":2\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:27\"\n" +
                "               }\n" +
                "            ],\n" +
                "            \"startTime\":\"20:23\",\n" +
                "            \"endTime\":\"23:26\",\n" +
                "            \"trainClasses\":[\n" +
                "               0,\n" +
                "               1,\n" +
                "               2\n" +
                "            ],\n" +
                "            \"cancelDates\":[\n" +
                "               \n" +
                "            ],\n" +
                "            \"isCancelledToday\":false,\n" +
                "            \"speed\":0\n" +
                "         }\n" +
                "      ]\n" +
                "   },\n" +
                "{\n" +
                "      \"trainForTraver\":{\n" +
                "         \"id\":\"65213500b2046b28005f10ff\",\n" +
                "         \"name\":\"Galu Kumari\",\n" +
                "         \"registraionNo\":\"T0001\",\n" +
                "         \"imagePath\":\"https://res.cloudinary.com/amiladevin1998/image/upload/v1696675053/trs-images/cfrvl7ftgzlawrhlnerw.jpg\"\n" +
                "      },\n" +
                "      \"schedulesForTraveler\":[\n" +
                "         {\n" +
                "            \"id\":\"6522b5346800c4b7ff0eeed3\",\n" +
                "            \"dayType\":0,\n" +
                "            \"startStation\":\"Colombo Fort, Western Province\",\n" +
                "            \"endStation\":\"Badulla, Uva Province\",\n" +
                "            \"trainStops\":[\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Maradana, Western Province\",\n" +
                "                     \"order\":1\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:25\"\n" +
                "               },\n" +
                "               {\n" +
                "                  \"trainStop\":{\n" +
                "                     \"name\":\"Dematagoda, Western Province\",\n" +
                "                     \"order\":2\n" +
                "                  },\n" +
                "                  \"navTime\":\"20:27\"\n" +
                "               }\n" +
                "            ],\n" +
                "            \"startTime\":\"20:23\",\n" +
                "            \"endTime\":\"23:26\",\n" +
                "            \"trainClasses\":[\n" +
                "               0,\n" +
                "               1,\n" +
                "               2\n" +
                "            ],\n" +
                "            \"cancelDates\":[\n" +
                "               \n" +
                "            ],\n" +
                "            \"isCancelledToday\":false,\n" +
                "            \"speed\":0\n" +
                "         }\n" +
                "      ]\n" +
                "   }\n" +
                "]";
        System.out.println(json);

        try {
            // Create a JSONArray object from the string
            JSONArray jsonArray = new JSONArray(json);

            // Iterate through the JSON array
            for (int i = 0; i < jsonArray.length(); i++) {
                // Get each JSON object from the array
                JSONObject jsonObject = jsonArray.getJSONObject(i);

                // Extract fields from the "trainForTraver" object
                JSONObject trainForTraver = jsonObject.getJSONObject("trainForTraver");
                String trainId = trainForTraver.getString("id");
                String trainName = trainForTraver.getString("name");
                String registrationNo = trainForTraver.getString("registraionNo");
                String imagePath = trainForTraver.getString("imagePath");

                // Extract fields from the "schedulesForTraveler" array
                JSONArray schedulesArray = jsonObject.getJSONArray("schedulesForTraveler");

                // Iterate through the "schedulesForTraveler" array
                for (int j = 0; j < schedulesArray.length(); j++) {
                    JSONObject scheduleObject = schedulesArray.getJSONObject(j);

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
                        // ... and so on for other fields
                    }
                }
            }
        } catch (JSONException e) {
            // Handle JSON parsing errors here
            e.printStackTrace();
        }
    }
}