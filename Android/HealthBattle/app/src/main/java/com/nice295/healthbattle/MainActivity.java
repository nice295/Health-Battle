package com.nice295.healthbattle;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FacebookAuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MainActivity extends BaseActivity {
    private static final String TAG = "MainActivity";

    private TextView mTvUser;
    private ProgressBar mProgressBar;

    private DatabaseReference mDatabase;
    private DatabaseReference myRef;

    FirebaseUser mUser;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // views
        mTvUser = (TextView) findViewById(R.id.tvUser);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        // firebase
        mDatabase = FirebaseDatabase.getInstance().getReference();

        mUser = FirebaseAuth.getInstance().getCurrentUser();
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
                        }
                        else {
                            Log.d(TAG, "Adding new user info");
                            writeNewUser(mUser.getUid(), mUser.getDisplayName(), mUser.getEmail());
                        }

                        mProgressBar.setVisibility(View.INVISIBLE);
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    }
                });
    }

    private void writeNewUser(String userId, String name, String email) {
        User user = new User(name, email);

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
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
