package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.EditText;

import com.airbnb.lottie.LottieAnimationView;
import com.exbook.R;
import com.exbook.common.Common;
import com.exbook.services.IResponse;
import com.exbook.services.UserRegister;

public class SignUpActivity extends AppCompatActivity {
EditText name,nic,email,contact,password,repassword;
Button signUp;
    AlertDialog dialog;
Common common;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        name = (EditText) findViewById(R.id.name);
        nic = (EditText) findViewById(R.id.nic);
        email = (EditText) findViewById(R.id.email);
        contact = (EditText) findViewById(R.id.contact);
        password = (EditText) findViewById(R.id.password);
        repassword = (EditText) findViewById(R.id.re_password);
        signUp = (Button) findViewById(R.id.btn_signUp);
        common = Common.getInstance(SignUpActivity.this);

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(common.validate_nic(nic.getText().toString()) && common.validate_password(password.getText().toString()) && common.validate_email(email.getText().toString())){
                    if(password.getText().toString().matches(repassword.getText().toString())){
                        userRegister(name.getText().toString(),email.getText().toString(),nic.getText().toString(),contact.getText().toString(),password.getText().toString());
                    }else{
                        //password didn't match error alert
                    }
                }else{
                    //enter valid data alert
                }
            }
        });




    }
    public void userRegister(String name,String email,String nic,String contact,String password){
        AlertDialog.Builder builder = new AlertDialog.Builder(SignUpActivity.this);
        View lottieView = getLayoutInflater().inflate(R.layout.dialog_lottie, null);

        LottieAnimationView animationView = lottieView.findViewById(R.id.lottieAnimationView);

        animationView.setAnimation(R.raw.loader);
        animationView.loop(true);
        animationView.playAnimation();

        builder.setView(lottieView);
        builder.setCancelable(false);
        dialog = builder.create();
        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        dialog.show();


        IResponse iResponse = new IResponse() {
            @Override
            public void onSuccess(String response) {
                IResponse.super.onSuccess(response);
                //dialog.dismiss();
                animationView.setVisibility(View.GONE);
                animationView.cancelAnimation();
                animationView.setVisibility(View.VISIBLE);
                animationView.setAnimation(R.raw.done);
                animationView.loop(false);
                animationView.playAnimation();
                //dialog.show();
                Handler handler = new Handler();
                Runnable runnable = new Runnable() {
                    @Override
                    public void run() {

                        Intent i = new Intent(SignUpActivity.this,SignInActivity.class);
                        startActivity(i);
                        finish();

                    }
                };

                handler.postDelayed(runnable,5000);
            }

            @Override
            public void onFailled(String error) {
                IResponse.super.onFailled(error);
                //show error alert
            }
        };
        UserRegister userRegister = new UserRegister(name,password,nic,"",contact,email,SignUpActivity.this);
        userRegister.registerUser(iResponse);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent i = new Intent(SignUpActivity.this, SignInActivity.class);
        startActivity(i);
        finish();
    }
}