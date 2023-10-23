package com.exbook.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.Nullable;
import android.util.Base64;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;

import com.exbook.R;
import com.exbook.services.IResponse;
import com.exbook.services.UserDetails;
import com.squareup.picasso.Picasso;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class EditProfileActivity extends AppCompatActivity {
    Bitmap bitmap;
    EditText nameET,contactET;
    Button update;
    ImageView iv;
    String image;
    UserDetails userDetails;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        nameET = (EditText) findViewById(R.id.name);
        contactET = (EditText) findViewById(R.id.contact);
        update = (Button) findViewById(R.id.btn_update);
        iv = (ImageView) findViewById(R.id.profile_image);
         userDetails = new UserDetails(EditProfileActivity.this);
        Intent i = getIntent();
        String name = i.getStringExtra("name");
        String contact = i.getStringExtra("contact");
         image = i.getStringExtra("imagePath");
        nameET.setText(name);
        contactET.setText(contact);
        Picasso.get()
                .load(image)
                .into(iv);
        iv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chooseImage();

            }
        });
        update.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                IResponse iResponseUpdateUser = new IResponse() {
                    @Override
                    public void onSuccess(String response) {
                        IResponse.super.onSuccess(response);
                        System.out.println(response);
                    }

                    @Override
                    public void onFailled(String error) {
                        IResponse.super.onFailled(error);
                    }
                };
                userDetails.updateUser(iResponseUpdateUser,nameET.getText().toString(),contactET.getText().toString(),image);

            }
        });


    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == 100 && resultCode == RESULT_OK && data != null) {
            Uri selectedImageUri = data.getData();
            String imagePath = getRealPathFromURI(selectedImageUri);

            try {
                 bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), selectedImageUri);

                Picasso.get()
                        .load(bitmap.toString())
                        .into(iv);
                ////////////////////
                String imgbase64 = convertBitmapToBase64(bitmap);
                System.out.println("Image "+imagePath);

                Thread newThread = new Thread(new Runnable() {
                    @Override
                    public void run() {
                        IResponse iResponseImageUpload = new IResponse() {
                            @Override
                            public void onSuccess(String response) {
                                IResponse.super.onSuccess(response);
                                System.out.println(response);
                                image = response;

                            }

                            @Override
                            public void onFailled(String error) {
                                IResponse.super.onFailled(error);
                            }
                        };

                        userDetails.updateImage(iResponseImageUpload,imagePath);
                    }
                });


                newThread.start();
                ////////////////////

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String convertBitmapToBase64(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }
    private void chooseImage(){
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, 100);

    }
    private String getRealPathFromURI(Uri contentUri) {
        String[] projection = {MediaStore.Images.Media.DATA};
        Cursor cursor = getContentResolver().query(contentUri, projection, null, null, null);

        if (cursor != null) {
            int column_index = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            cursor.moveToFirst();
            String filePath = cursor.getString(column_index);
            cursor.close();
            return filePath;
        }

        return null;
    }
}

