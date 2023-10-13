package com.exbook.db;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import static com.exbook.constants.Config.MyPREFERENCES;
import static com.exbook.constants.Config.NIC;
import static com.exbook.constants.Config.TokenKey;

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

}
