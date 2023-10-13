package com.exbook.activities.ui.profile;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class ProfileViewModel extends AndroidViewModel {

    private final MutableLiveData<String> mText;

    public ProfileViewModel(@NonNull Application application) {
        super(application);
        mText = new MutableLiveData<>();

    }

    public LiveData<String> getText() {
        return mText;
    }
}