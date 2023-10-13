package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import com.exbook.R;

public class BookingActivity extends AppCompatActivity {
TextView nameT,fromT,toT;
Button bookNow;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_booking);
        Intent intent = getIntent();
        String id = intent.getStringExtra("ID");
        String name = intent.getStringExtra("NAME");
        String from = intent.getStringExtra("FROM");
        String to = intent.getStringExtra("TO");

        nameT = (TextView)findViewById(R.id.name);
        fromT = (TextView)findViewById(R.id.from);
        toT = (TextView)findViewById(R.id.to);
        bookNow = (Button)findViewById(R.id.book);

        nameT.setText(name);
        fromT.setText(from);
        toT.setText(to);
    }
}