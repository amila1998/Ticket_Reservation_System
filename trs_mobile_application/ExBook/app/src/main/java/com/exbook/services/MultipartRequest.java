package com.exbook.services;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Map;

public class MultipartRequest extends Request<String> {
    private final Response.Listener<String> mListener;
    private final File mFilePart;
    private final String mFileName;
    private final Map<String, String> mParams;

    public MultipartRequest(String url, File file, String fileName, Map<String, String> params,
                            Response.Listener<String> listener, Response.ErrorListener errorListener) {
        super(Method.POST, url, errorListener);
        mListener = listener;
        mFilePart = file;
        mFileName = fileName;
        mParams = params;
    }

    @Override
    public String getBodyContentType() {
        return "multipart/form-data; boundary=" + BOUNDARY;
    }

    @Override
    public byte[] getBody() throws AuthFailureError {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        DataOutputStream dos = new DataOutputStream(bos);

        try {
            // Add parameters
            for (Map.Entry<String, String> entry : mParams.entrySet()) {
                buildTextPart(dos, entry.getKey(), entry.getValue());
            }

            // Add file part
            buildFilePart(dos, mFilePart, mFileName);

            // End of multipart/form-data
            dos.writeBytes(LINE_END);
            dos.writeBytes(TWO_HYPHENS + BOUNDARY + TWO_HYPHENS + LINE_END);

            return bos.toByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected Response<String> parseNetworkResponse(NetworkResponse response) {
        try {
            String responseBody = new String(response.data, "utf-8");
            return Response.success(responseBody, getCacheEntry());
        } catch (Exception e) {
            return Response.error(new VolleyError(e));
        }
    }

    @Override
    protected void deliverResponse(String response) {
        mListener.onResponse(response);
    }

    private void buildTextPart(DataOutputStream dataOutputStream, String parameterName, String parameterValue) throws IOException {
        dataOutputStream.writeBytes(TWO_HYPHENS + BOUNDARY + LINE_END);
        dataOutputStream.writeBytes("Content-Disposition: form-data; name=\"" + parameterName + "\"" + LINE_END);
        dataOutputStream.writeBytes("Content-Type: text/plain; charset=UTF-8" + LINE_END);
        dataOutputStream.writeBytes(LINE_END);
        dataOutputStream.write(parameterValue.getBytes("utf-8"));
        dataOutputStream.writeBytes(LINE_END);
    }

    private void buildFilePart(DataOutputStream dataOutputStream, File file, String fileName) throws IOException {
        dataOutputStream.writeBytes(TWO_HYPHENS + BOUNDARY + LINE_END);
        dataOutputStream.writeBytes("Content-Disposition: form-data; name=\"file\"; filename=\"" + fileName + "\"" + LINE_END);
        dataOutputStream.writeBytes(LINE_END);

        FileInputStream fileInputStream = new FileInputStream(file);
        int bytesRead;
        byte[] buffer = new byte[1024];
        while ((bytesRead = fileInputStream.read(buffer)) != -1) {
            dataOutputStream.write(buffer, 0, bytesRead);
        }

        dataOutputStream.writeBytes(LINE_END);
    }

    private static final String BOUNDARY = "----WebKitFormBoundaryuqb6LrCaA44QYNYz";
    private static final String LINE_END = "\r\n";
    private static final String TWO_HYPHENS = "--";
}
