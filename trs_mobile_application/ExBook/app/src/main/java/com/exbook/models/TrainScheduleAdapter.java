package com.exbook.models;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.exbook.R;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;

public class TrainScheduleAdapter extends ArrayAdapter {
    List list = new ArrayList();
    Context context;
    public TrainScheduleAdapter(@NonNull Context context, int resource) {
        super(context, resource);
        this.context=context;
    }


    public void add( TrainScheduleModel object) {
        super.add(object);
        list.add(object);

    }

    @Override
    public int getCount() {
        return list.size();
    }


    @Override
    public Object getItem(int position) {
        return list.get(position);
    }


    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View row;
        row =convertView;
        TrainHolder holder;
        if(row==null){
            LayoutInflater layoutInflater = (LayoutInflater) this.getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            row = layoutInflater.inflate(R.layout.t_list_item,parent,false);
            holder= new TrainHolder();
            holder.name=(TextView)row.findViewById(R.id.name);
            holder.from=(TextView)row.findViewById(R.id.from);
            holder.to=(TextView)row.findViewById(R.id.to);
            holder.startTime=(TextView)row.findViewById(R.id.startTime);
            holder.endTime=(TextView)row.findViewById(R.id.endTime);
            holder.iv=(ImageView) row.findViewById(R.id.train_image);
            row.setTag(holder);
        }
        else {
            holder = (TrainHolder) row.getTag();
        }
        TrainScheduleModel model = (TrainScheduleModel) this.getItem(position);
        holder.name.setText(model.getTrainName());
        holder.from.setText("From: "+model.getStartStation());
        holder.to.setText("To: "+model.getEndStation());
        holder.startTime.setText("Start time: "+model.getStartTime());
        holder.endTime.setText("End time: "+model.getEndTime());

        Picasso.get()
                .load(model.getImg())
                .into(holder.iv);






        return row;
    }
    static  class TrainHolder{
        TextView name,from,to,startTime,endTime;
        ImageView iv;

    }
}
