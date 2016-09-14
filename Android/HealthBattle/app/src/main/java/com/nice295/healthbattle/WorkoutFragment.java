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

package com.nice295.healthbattle;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import de.hdodenhof.circleimageview.CircleImageView;
import io.paperdb.Paper;

public class WorkoutFragment extends Fragment {
    private static final String TAG = "WorkoutFragment";

    private TextView mTvUser;
    private CircleImageView mIvProfile;
    private ProgressBar mProgressBar;

    private FirebaseUser mUser;

    private DatabaseReference mDatabase;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        LinearLayout ll = (LinearLayout) inflater.inflate(
                R.layout.fragment_battle, container, false);

        // views
        mTvUser = (TextView) ll.findViewById(R.id.tvResult);
        mIvProfile = (CircleImageView) ll.findViewById(R.id.ivProfile);
        mProgressBar = (ProgressBar) ll.findViewById(R.id.progressBar);

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
        mTvUser.setText("Name: " + me.getUsername() + "\n" +
                "Email: " + me.getEmail() + "\n" +
                "Power " + me.getPower() + "\n" +
                "Skill: " + me.getSkill() + "\n");
        Glide.with(getActivity())
                .load(me.getImageUrl())
                .into(mIvProfile);

        return ll;
    }

    @Override
    public void onStart() {
        super.onStart();

        if (mUser == null) {
            return;
        }

        mProgressBar.setVisibility(View.VISIBLE);

        mDatabase.child("users").child(mUser.getUid()).addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (!dataSnapshot.exists()) {
                            return;
                        }

                        User user = dataSnapshot.getValue(User.class);

                        if (dataSnapshot.exists()) {
                            mTvUser.setText("Name: " + user.getUsername() + "\n" +
                                    "Email: " + user.getEmail() + "\n" +
                                    "Power " + user.getPower() + "\n" +
                                    "Skill: " + user.getSkill() + "\n");

                            Glide.with(getActivity())
                                    .load(user.getImageUrl())
                                    .into(mIvProfile);

                            // Save internally
                            Paper.book().write("me", user);
                        } else {
                            Log.d(TAG, "Adding new user info");
                            writeNewUser(mUser.getUid(), mUser.getDisplayName(), mUser.getEmail(), mUser.getPhotoUrl().toString());
                        }

                        mProgressBar.setVisibility(View.INVISIBLE);
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
}
