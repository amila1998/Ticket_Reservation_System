package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;
import com.exbook.R;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.services.IResponse;
import com.exbook.services.UserDetails;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class SplashActivity extends AppCompatActivity {
TextView version_txtvw;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        version_txtvw = (TextView)findViewById(R.id.version_txt);
        getAppVersionName();


        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                LottieAnimationView loadingAnimationView = findViewById(R.id.loadingAnimationView);

                loadingAnimationView.setVisibility(View.VISIBLE);
                loadingAnimationView.playAnimation();

                //loadingAnimationView.setVisibility(View.GONE);
                //loadingAnimationView.cancelAnimation();
            }
        });
        Handler handler = new Handler();
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                if(isLogin()){
                    getUserDetails();
                }else{
                    Intent i = new Intent(SplashActivity.this,SignInActivity.class);
                    startActivity(i);
                    finish();
                }
            }
        };

        handler.postDelayed(runnable,5000);



    }
    public void getAppVersionName(){
        try {
            PackageInfo packageInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
            String versionName = packageInfo.versionName;
            version_txtvw.setText("V: "+versionName.toString());
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();

        }
    }
    public boolean isLogin(){
        String token = SharedPreferenceHelper.getInstance(SplashActivity.this).getToken();
        if(token!=null){
            return true;
        }else{
            return false;
        }

    }
    public void getUserDetails(){
        IResponse iResponse = new IResponse() {
            @Override
            public void onSuccess(String response) {
                IResponse.super.onSuccess(response);
                JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
                String isSendActiveStatus = jsonObject.get("isSendActiveStatus").getAsString();
                String isActive = jsonObject.get("isActive").getAsString();
                if(isActive=="true"){
                    Intent i = new Intent(SplashActivity.this,MainActivity.class);
                    startActivity(i);
                    finish();
                }
                else{
                    if(isSendActiveStatus=="true"){
                        //activation request already sent
                        System.out.println("Account activation request already sent");
                        Intent i = new Intent(SplashActivity.this, CommonMessageActivity.class);
                        i.putExtra("msg","Activation request already sent.");
                        startActivity(i);
                        finish();
                    }else{
                        //account deactive
                        System.out.println("Your account is in de-active state");
                        Intent i = new Intent(SplashActivity.this, CommonMessageActivity.class);
                        i.putExtra("msg","Account is deactivated.");
                        startActivity(i);
                        finish();
                    }
                }
            }

            @Override
            public void onFailled(String error) {
                IResponse.super.onFailled(error);
                SharedPreferenceHelper.getInstance(SplashActivity.this).clearToken();
                Intent i = new Intent(SplashActivity.this,SignInActivity.class);
                startActivity(i);
                finish();
            }
        };

        UserDetails userDetails = new UserDetails(SplashActivity.this);
        userDetails.getDetails(iResponse);

    }
}