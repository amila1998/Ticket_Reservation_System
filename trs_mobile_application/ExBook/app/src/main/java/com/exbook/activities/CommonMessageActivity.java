package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import com.exbook.R;

public class CommonMessageActivity extends AppCompatActivity {
TextView msgtxt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_common_message);
        msgtxt = (TextView)findViewById(R.id.msg);
        Intent intent = getIntent();
        String response = intent.getStringExtra("msg");
        msgtxt.setText(response);
    }
}