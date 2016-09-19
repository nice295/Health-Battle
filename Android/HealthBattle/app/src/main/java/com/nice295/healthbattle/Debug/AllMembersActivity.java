package com.nice295.healthbattle.Debug;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.BaseActivity;
import com.nice295.healthbattle.R;
import com.nice295.healthbattle.model.Fight;
import com.nice295.healthbattle.model.User;

import java.util.ArrayList;

import io.paperdb.Paper;


/**
 * Created by kyuholee on 2016. 9. 6..
 */
public class AllMembersActivity extends BaseActivity {
    private static final String TAG = "AllMembersActivity";

    private ListView mLvMembers;
    private ListViewAdapter mAdapter = null;
    private ArrayList<User> mUserArray;

    private DatabaseReference mDatabase;
    private DatabaseReference myRef;
    private FirebaseUser mUser;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_allmembers);

        mUserArray = new ArrayList<User>();
        mLvMembers = (ListView) findViewById(R.id.lvMembers);
        mAdapter = new ListViewAdapter(this, R.layout.layout_member_list_item, mUserArray);
        mLvMembers.setAdapter(mAdapter);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Toast.makeText(this, "No user loggin.",
                    Toast.LENGTH_SHORT).show();
            finish();
        }

        mDatabase.child("users").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        mUserArray.clear();
                        for (DataSnapshot postSnapshot : dataSnapshot.getChildren()) {
                            User user = postSnapshot.getValue(User.class);
                            Log.d(TAG, "Name: " + user.getUsername());
                            mUserArray.add(user);
                        }
                        mAdapter.notifyDataSetChanged();
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    }
                });

        User me = Paper.book().read("me", new User());
        mDatabase.child("users").child("wMWCQNi1RcOO0kkphX2E2GVG8bC2").child("notification")
                .setValue(new Fight("new", "ZdjN62uSzDTPygrN9Yae9SdZv0q2", me));
    }

    private class ListViewAdapter extends ArrayAdapter<User> {
        private ArrayList<User> items;

        public ListViewAdapter(Context context, int textViewResourceId, ArrayList<User> items) {
            super(context, textViewResourceId, items);
            this.items = items;
        }

        public class ViewHolder {
            public ImageView ivPic;
            public TextView tvName;
            public TextView tvEmail;
            public TextView tvPower;
            public TextView tvSkill;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder viewHolder;

            if (convertView == null) {
                LayoutInflater vi = (LayoutInflater) getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                convertView = vi.inflate(R.layout.layout_member_list_item, parent, false);

                viewHolder = new ViewHolder();
                viewHolder.ivPic = (ImageView) convertView.findViewById(R.id.ivPic);
                viewHolder.tvName = (TextView) convertView.findViewById(R.id.tv00);
                viewHolder.tvEmail = (TextView) convertView.findViewById(R.id.tvEmail);
                //viewHolder.tvPower = (TextView) convertView.findViewById(R.id.tvPower);
                //viewHolder.tvSkill = (TextView) convertView.findViewById(R.id.tvSkill);

                convertView.setTag(viewHolder);
            } else {
                viewHolder = (ViewHolder) convertView.getTag();
            }

            User user = items.get(position);
            if (user != null) {
                Glide.with(getApplicationContext())
                        .load(user.getImageUrl())
                        .into(viewHolder.ivPic);

                viewHolder.tvName.setText(user.getUsername());
                viewHolder.tvEmail.setText(user.getEmail());
                //viewHolder.tvPower.setText(user.getPower());
                //viewHolder.tvSkill.setText(user.getSkill());
            }
            return convertView;
        }
    }
}