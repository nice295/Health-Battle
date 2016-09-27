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
import android.widget.Button;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.chokobole.view.statusview.StatusChildView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.FacebookLoginActivity;
import com.nice295.healthbattle.Model.User;
import com.nice295.healthbattle.R;
import com.nice295.healthbattle.WorkoutActivity;

import de.hdodenhof.circleimageview.CircleImageView;
import io.paperdb.Paper;

public class WorkoutFragment extends Fragment implements View.OnClickListener {
    private static final String TAG = "WorkoutFragment";

    private TextView mTvUser;
    private StatusChildView mScvPower;
    private StatusChildView mScvSkill;
    private CircleImageView mIvProfile;
    //private ProgressBar mProgressBar;
    private Button mBtHandRaise;

    private FirebaseUser mUser;

    private DatabaseReference mDatabase;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        NestedScrollView ll = (NestedScrollView) inflater.inflate(
                R.layout.fragment_workout, container, false);

        // views
        mTvUser = (TextView) ll.findViewById(R.id.tv00);
        mScvPower = (StatusChildView) ll.findViewById(R.id.scvPower);
        mScvSkill = (StatusChildView) ll.findViewById(R.id.scvSkill);
        mIvProfile = (CircleImageView) ll.findViewById(R.id.iv00);
        //mProgressBar = (ProgressBar) ll.findViewById(R.id.progressBar);
        mBtHandRaise = (Button) ll.findViewById(R.id.btHandRaise);
        mBtHandRaise.setOnClickListener(this);

        // firebase
        mDatabase = FirebaseDatabase.getInstance().getReference();

        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Intent intent = new Intent(getActivity(), FacebookLoginActivity.class);
            startActivity(intent);
            getActivity().finish();
        }

        User me = Paper.book().read("me", new User());
        mTvUser.setText(me.getUsername());
        mScvPower.setBarLevel(me.getPower());
        mScvSkill.setBarLevel(me.getSkill());

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
                            mTvUser.setText(user.getUsername());
                            mScvPower.setBarLevel(user.getPower());
                            mScvSkill.setBarLevel(user.getSkill());

/*                            Glide.with(getContext())
                                    .load(user.getImageUrl())
                                    .into(mIvProfile);*/

                            // Save internally
                            Paper.book().write("me", user);
                        } else {
                            Log.d(TAG, "Adding new user info");
                            // Move to Signin process
                            // writeNewUser(mUser.getUid(), mUser.getDisplayName(), mUser.getEmail(), mUser.getPhotoUrl().toString());
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
        if (view == mBtHandRaise) {
            Intent intent = new Intent(getActivity(), WorkoutActivity.class);
            startActivity(intent);
        }
    }
}
