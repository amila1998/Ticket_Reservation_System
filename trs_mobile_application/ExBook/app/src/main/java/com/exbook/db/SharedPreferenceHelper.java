package com.exbook.db;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import static com.exbook.constants.Config.MyPREFERENCES;
import static com.exbook.constants.Config.NIC;
import static com.exbook.constants.Config.TokenKey;
import static com.exbook.constants.Config.USERID;
import static com.exbook.constants.Config.USERNAME;

/**
 * Helper class for all sharedPreference usages
 */
public class SharedPreferenceHelper {
    private static SharedPreferenceHelper sharedPreferenceHelper;
    private Context context;
    private SharedPreferences sharedpreferences;

    private SharedPreferenceHelper(Context context) {
        this.context = context;
        sharedpreferences = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
    }
    public static SharedPreferenceHelper getInstance(Context context){
        if(sharedPreferenceHelper == null){
            return new SharedPreferenceHelper(context);
        }
        else{
            return sharedPreferenceHelper;
        }
    }

    /**
     * Save backend generated token as a string
     * @param token
     */
    public void saveToken(String token){
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(TokenKey, token);
        editor.apply();
    }
    /**
     * Save user nic as a string
     * @param nic
     */
    public void saveNIC(String nic){
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(NIC, nic);
        editor.apply();
    }

    /**
     * get saved token
     * @return token as a string
     */
    public String getToken(){
        String token  = sharedpreferences.getString(TokenKey,null);
        return token;
    }
    /**
     * get saved nic
     * @return nic as a string
     */
    public String getNIC(){
        String nic  = sharedpreferences.getString(NIC,null);
        return nic;
    }

    /**
     * clear saved token
     */
    public void clearToken() {
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.remove(TokenKey);
        editor.apply();
    }
    public void saveUserId(String userId){
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(USERID, userId);
        editor.apply();
    }
    public String getUserId(){
        String userid  = sharedpreferences.getString(USERID,null);
        return userid;
    }
    public void saveUsername(String userName){
        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(USERNAME, userName);
        editor.apply();
    }
    public String getUserName(){
        String userid  = sharedpreferences.getString(USERNAME,null);
        return userid;
    }

}
