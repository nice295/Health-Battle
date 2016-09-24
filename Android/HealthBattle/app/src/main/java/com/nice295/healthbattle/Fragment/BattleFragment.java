/*
 * Copyright (C) 2015 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nice295.healthbattle.Fragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.widget.NestedScrollView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.FacebookLoginActivity;
import com.nice295.healthbattle.BattleActivity;
import com.nice295.healthbattle.model.User;
import com.nice295.healthbattle.R;

import de.hdodenhof.circleimageview.CircleImageView;
import io.paperdb.Paper;

public class BattleFragment extends Fragment implements View.OnClickListener {
    private static final String TAG = "FightFragment";

    private TextView mTv00;
    private CircleImageView mIv00;
    private View mV00;
    private RelativeLayout mRL00;
    private RelativeLayout mRL01;
    private RelativeLayout mRL02;
    private RelativeLayout mRL03;
    private RelativeLayout mRL04;
    private RelativeLayout mRL05;


    private FirebaseUser mUser;

    private DatabaseReference mDatabase;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        NestedScrollView ll = (NestedScrollView) inflater.inflate(
                R.layout.fragment_battle, container, false);

        // views
        mTv00 = (TextView) ll.findViewById(R.id.tv00);
        mIv00 = (CircleImageView) ll.findViewById(R.id.iv00);
        mV00 = (View) ll.findViewById(R.id.civ00);
        mV00.setOnClickListener(this);

        mRL00 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout01);
        mRL01 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout02);
        mRL02 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout03);
        mRL03 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout04);
        mRL04 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout05);
        mRL05 = (RelativeLayout)  ll .findViewById(R.id.relativeLayout06);
        mRL00.setOnClickListener(this);
        mRL01.setOnClickListener(this);
        mRL02.setOnClickListener(this);
        mRL03.setOnClickListener(this);
        mRL04.setOnClickListener(this);
        mRL05.setOnClickListener(this);


        // firebase
        mDatabase = FirebaseDatabase.getInstance().getReference();

        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Intent intent = new Intent(getActivity(), FacebookLoginActivity.class);
            startActivity(intent);
            getActivity().finish();
        }

        // load internally
        User me = Paper.book().read("me", new User());
        mTv00.setText(me.getUsername());

        Glide.with(getActivity())
                .load(me.getImageUrl())
                .into(mIv00);

        return ll;
    }

    @Override
    public void onStart() {
        super.onStart();

        if (mUser == null) {
            return;
        }

        //mProgressBar.setVisibility(View.VISIBLE);

        mDatabase.child("users").child(mUser.getUid()).addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (!dataSnapshot.exists()) {
                            return;
                        }

                        User user = dataSnapshot.getValue(User.class);

                        if (dataSnapshot.exists()) {
                            mTv00.setText(user.getUsername());

                            /*
                            Glide.with(getContext())
                                    .load(user.getImageUrl())
                                    .into(mIv00);
                            */

                            // Save internally
                            Paper.book().write("me", user);
                        } else {
                            Log.d(TAG, "Adding new user info");
                            writeNewUser(mUser.getUid(), mUser.getDisplayName(), mUser.getEmail(), mUser.getPhotoUrl().toString());
                        }

                        //mProgressBar.setVisibility(View.INVISIBLE);
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    }
                });
    }

    private void writeNewUser(String userId, String name, String email, String imageUrl) {
        User user = new User(name, email, imageUrl);

        mDatabase.child("users").child(userId).setValue(user);
    }

    @Override
    public void onClick(View view) {

            Intent intent = new Intent(getActivity(), BattleActivity.class);
            startActivity(intent);

    }
}
