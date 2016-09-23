package com.nice295.healthbattle.Debug;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.WindowManager;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.BaseActivity;
import com.nice295.healthbattle.FacebookLoginActivity;
import com.nice295.healthbattle.R;

import java.util.Timer;
import java.util.TimerTask;


/**
 * Created by kyuholee on 2016. 9. 6..
 */
public class ShoulderPressActivity extends BaseActivity
        implements SensorEventListener {
    private static final String TAG = "ShoulderPressActivity";

    private TextView mTvResult;

    private long mLastTime = 0;
    private boolean mUp = false;
    private int mJumpCounter = 0;
    private int mSkill = 0;


    private Handler mHandler;

    private SensorManager mSensorManager;
    private Sensor mSensor;

    /**
     * How long to keep the screen on when no activity is happening
     **/
    private static final long SCREEN_ON_TIMEOUT_MS = 20000; // in milliseconds

    /**
     * an up-down movement that takes more than this will not be registered as such
     **/
    private static final long TIME_THRESHOLD_NS = 2000000000; // in nanoseconds (= 2sec)

    /**
     * Earth gravity is around 9.8 m/s^2 but user may not completely direct his/her hand vertical
     * during the exercise so we leave some room. Basically if the x-component of gravity, as
     * measured by the Gravity sensor, changes with a variation (delta) > GRAVITY_THRESHOLD,
     * we consider that a successful count.
     */
    private static final float GRAVITY_THRESHOLD = 1.5f; //7.0f;

    private DatabaseReference mDatabase;
    private DatabaseReference myRef;
    private FirebaseUser mUser;



    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debugworkout);

        mTvResult = (TextView) findViewById(R.id.tvResult);



        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        mHandler = new Handler();
        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY);

        // firebase
        mDatabase = FirebaseDatabase.getInstance().getReference();
        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Toast.makeText(this, "No user loggin.",
                    Toast.LENGTH_SHORT).show();
            finish();
        }

        mDatabase.child("users").child(mUser.getUid()).child("power").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            Long count = dataSnapshot.getValue(Long.class);

                            mSkill = count.intValue();
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "Jumping:onCancelled", databaseError.toException());
                    }
                });

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(0);

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            Long count = dataSnapshot.getValue(Long.class);
                            mTvResult.setText(String.valueOf(count));
                            mJumpCounter = count.intValue();

                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "Jumping:onCancelled", databaseError.toException());
                    }
                });
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mSensorManager.registerListener(this, mSensor,
                SensorManager.SENSOR_DELAY_NORMAL)) {
            Log.d(TAG, "Successfully registered for the sensor updates");
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        mSensorManager.unregisterListener(this);
        Log.d(TAG, "Unregistered for sensor events");
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        detectJump(event.values[0], event.timestamp);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }

    private void detectJump(float xValue, long timestamp) {
        if ((Math.abs(xValue) > GRAVITY_THRESHOLD)) {
            if (timestamp - mLastTime < TIME_THRESHOLD_NS && mUp != (xValue > 0)) {
                onJumpDetected(!mUp);
            }
            mUp = xValue > 0;
            mLastTime = timestamp;
        }
    }

    private void onJumpDetected(boolean up) {
        // we only count a pair of up and down as one successful movement
        if (up) {


            return;
        } else {

        }


        if (mJumpCounter < 10) {
            mJumpCounter++;
        } else if (mJumpCounter == 10) {
            mDatabase.child("users").child(mUser.getUid()).child("power").setValue(mSkill + mJumpCounter);
            //array_nahyeVoice[VOICE_POWER_UP].start();
            return;
        } else {
            return;
        }


        // Set value to Firebase database
        mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(mJumpCounter);

    }


    /**
     * Resets the FLAG_KEEP_SCREEN_ON flag so activity can go into background.
     */
    private void resetFlag() {
        mHandler.post(new Runnable() {
            @Override
            public void run() {
                if (Log.isLoggable(TAG, Log.DEBUG)) {
                    Log.d(TAG, "Resetting FLAG_KEEP_SCREEN_ON flag to allow going to background");
                }
                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
               // finish();
            }
        });
    }
}
