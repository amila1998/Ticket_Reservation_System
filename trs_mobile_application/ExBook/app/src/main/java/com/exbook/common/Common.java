package com.exbook.common;

import android.content.Context;

import com.exbook.db.SharedPreferenceHelper;

public class Common {
    private static Common common;
    private Context context;

    private Common(Context context) {
        this.context = context;
    }

    public static Common getInstance(Context context){
        if(common == null){
            return new Common(context);
        }else{
            return common;
        }

    }

    /**
     * Validate user input password, min 8 char and max 12 char
     * @return
     */
    public boolean validate_password(String password){
        return  true;
    }
    /**
     * Validate user input nic,old nic type and new nic type and passport no
     * @return
     */
    public boolean validate_nic(String nic){
        return  true;
    }
    /**
     * Validate user input email
     * @return
     */
    public boolean validate_email(String email){
        return  true;
    }
}
