package com.exbook.activities.ui.profile;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;


import com.airbnb.lottie.LottieAnimationView;
import com.exbook.R;
import com.exbook.activities.CommonMessageActivity;
import com.exbook.activities.SignInActivity;
import com.exbook.activities.SplashActivity;
import com.exbook.databinding.FragmentProfileBinding;
import com.exbook.db.SharedPreferenceHelper;
import com.exbook.services.IResponse;
import com.exbook.services.UserDeactivate;
import com.exbook.services.UserDetails;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.squareup.picasso.Picasso;

public class ProfileFragment extends Fragment {

    private FragmentProfileBinding binding;
    AlertDialog dialog;
    TextView nametxt,emailtxt,nictxt,contactNumbertxt;
    ImageView profile_img;
    Button logOut,deactivate,editProfile;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        ProfileViewModel profileViewModel = new ViewModelProvider(this, new ViewModelProvider.AndroidViewModelFactory(requireActivity().getApplication())).get(ProfileViewModel.class);

        binding = FragmentProfileBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
          profile_img = binding.profileImage;
          nametxt = binding.name;
          emailtxt = binding.email;
          nictxt = binding.nic;
          contactNumbertxt = binding.contactNumber;
          logOut = binding.logout;
          deactivate = binding.deactivate;
          editProfile = binding.editProfile;
          LottieLoading();
          getUserDetails();
        //profile_img.setImageResource(R.drawable.logo);
        logOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                builder.setTitle("Are you sure?");
                builder.setMessage("Do you want to log out?");
                builder.setCancelable(false);
                builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                SharedPreferenceHelper.getInstance(getActivity()).clearToken();
                Intent i = new Intent(getActivity(), SignInActivity.class);
                startActivity(i);
                getActivity().finish();
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

                dialog = builder.create();
                dialog.show();
            }
        });

        deactivate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                userDeactivate();
            }
        });


        return root;


    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
    public  void getUserDetails(){
        dialog.show();
        IResponse iResponse = new IResponse() {
            @Override
            public void onSuccess(String response) {
                IResponse.super.onSuccess(response);
                System.out.println(response);
                JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
                String name = jsonObject.get("name").getAsString();
                String email = jsonObject.get("email").getAsString();
                String nic = jsonObject.get("nic").getAsString();
                String image = jsonObject.get("imagePath").getAsString();
                String contact = jsonObject.get("contactNo").getAsString();
                nametxt.setText(name);
                emailtxt.setText(email);
                nictxt.setText(nic);
                contactNumbertxt.setText(contact);
                Picasso.get()
                        .load(image)
                        .into(profile_img);

                dialog.cancel();
            }

            @Override
            public void onFailled(String error) {
                IResponse.super.onFailled(error);
                dialog.cancel();
            }
        };
        UserDetails userDetails = new UserDetails(getActivity());
        userDetails.getDetails(iResponse);
    }

    public void LottieLoading(){
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        View lottieView = getLayoutInflater().inflate(R.layout.dialog_lottie, null);

        LottieAnimationView animationView = lottieView.findViewById(R.id.lottieAnimationView);

        animationView.setAnimation(R.raw.loader);
        animationView.loop(true);
        animationView.playAnimation();

        builder.setView(lottieView);
        builder.setCancelable(false);
        /*builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // Handle OK button click
            }
        });*/

        dialog = builder.create();
        Window window = dialog.getWindow();
        if (window != null) {
            window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }
        //dialog.show();
    }
    public void userDeactivate(){
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setTitle("Are you sure?");
        builder.setMessage("Do you want to de-activate?");
        builder.setCancelable(false);
        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                IResponse iResponse = new IResponse() {
                    @Override
                    public void onSuccess(String response) {
                        IResponse.super.onSuccess(response);
                        Intent i = new Intent(getActivity(), CommonMessageActivity.class);
                        i.putExtra("msg","Account deactivated");
                        startActivity(i);
                        getActivity().finish();
                    }

                    @Override
                    public void onFailled(String error) {
                        IResponse.super.onFailled(error);
                    }
                };
                UserDeactivate userDeactivate = new UserDeactivate(getActivity());
                String nic = SharedPreferenceHelper.getInstance(getActivity()).getNIC();
                userDeactivate.deactivate(iResponse,nic);
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });

        dialog = builder.create();
        dialog.show();


    }
}