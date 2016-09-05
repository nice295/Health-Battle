package com.nice295.healthbattle;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.Debug.DebugmainActivity;
import com.nice295.healthbattle.model.User;

import de.hdodenhof.circleimageview.CircleImageView;

public class MainActivity extends BaseActivity {
    private static final String TAG = "MainActivity";

    private TextView mTvUser;
    private CircleImageView mIvProfile;
    private ProgressBar mProgressBar;

    private DatabaseReference mDatabase;
    private DatabaseReference myRef;

    FirebaseUser mUser;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // views
        mTvUser = (TextView) findViewById(R.id.tvResult);
        mIvProfile = (CircleImageView) findViewById(R.id.ivProfile);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        // firebase
        mDatabase = FirebaseDatabase.getInstance().getReference();

        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Intent intent = new Intent(getApplicationContext(), FacebookLoginActivity.class);
            startActivity(intent);
            finish();
        }
    }

    @Override
    public void onStart() {
        super.onStart();

        mProgressBar.setVisibility(View.VISIBLE);

        mDatabase.child("users").child(mUser.getUid()).addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        User user = dataSnapshot.getValue(User.class);

                        if (dataSnapshot.exists()) {
                            mTvUser.setText("Name: " + user.getUsername() + "\n" +
                                    "Email: " + user.getEmail() + "\n" +
                                    "Power " + user.getPower() + "\n" +
                                    "Skill: " + user.getSkill() + "\n");

                            Glide.with(getApplicationContext())
                                    .load(user.getImageUrl())
                                    .into(mIvProfile);
                        }
                        else {
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

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            Long count = dataSnapshot.getValue(Long.class);
                            mTvUser.setText(mTvUser.getText() + "\nJumping : " + count);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "Jumping:onCancelled", databaseError.toException());
                    }
                });
    }

    private void writeNewUser(String userId, String name, String email, String imageUrl) {
        User user = new User(name, email, imageUrl);

        mDatabase.child("users").child(userId).setValue(user);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_logout:
                signOut();
                return true;
            case R.id.menu_debug:
                Intent intent = new Intent(getApplicationContext(), DebugmainActivity.class);
                startActivity(intent);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
