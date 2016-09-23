package com.nice295.healthbattle.Fragment;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v4.widget.NestedScrollView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.R;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by chokobole on 2016. 9. 23..
 */

public class ShoulderPressFragment extends Fragment
    implements SensorEventListener {
    private static final String TAG = "ShoulderPressActivity";

    private long mLastTime = 0;
    private boolean mUp = false;
    private int mJumpCounter = 0;

    private Timer mTimer;
    private TimerTask mTimerTask;
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
    private static final float GRAVITY_THRESHOLD = 2.0f; //7.0f;

    private DatabaseReference mDatabase;
    private DatabaseReference myRef;
    private FirebaseUser mUser;

    private ImageView mHelperImageView;
    private TextView mCounterTextView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_should_press, container, false);

        mHelperImageView = (ImageView) view.findViewById(R.id.should_press_image_view);
        mCounterTextView = (TextView) view.findViewById(R.id.should_press_count_text_view);

        init();

        return view;
    }

    private void init() {
        getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        mHandler = new Handler();
        renewTimer();
        mSensorManager = (SensorManager) getActivity().getSystemService(Context.SENSOR_SERVICE);
        mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Toast.makeText(getContext(), "First logout please", Toast.LENGTH_LONG).show();
        }

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(0);

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").addValueEventListener(
            new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    if (dataSnapshot.exists()) {
                        Long count = dataSnapshot.getValue(Long.class);
                        mCounterTextView.setText(String.valueOf(count));
                    }
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    Log.w(TAG, "Jumping:onCancelled", databaseError.toException());
                }
            });
    }


    @Override
    public void onResume() {
        super.onResume();
        if (mSensorManager.registerListener(this, mSensor,
            SensorManager.SENSOR_DELAY_NORMAL)) {
            Log.d(TAG, "Successfully registered for the sensor updates");
        }
    }

    @Override
    public void onPause() {
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
        }
        mJumpCounter++;

        // Set value to Firebase database
        mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(mJumpCounter);

        renewTimer();
    }

    /**
     * Starts a timer to clear the flag FLAG_KEEP_SCREEN_ON.
     */
    private void renewTimer() {
        if (null != mTimer) {
            mTimer.cancel();
        }
        mTimerTask = new TimerTask() {
            @Override
            public void run() {
                if (Log.isLoggable(TAG, Log.DEBUG)) {
                    Log.d(TAG,
                        "Removing the FLAG_KEEP_SCREEN_ON flag to allow going to background");
                }
                resetFlag();
            }
        };
        mTimer = new Timer();
        mTimer.schedule(mTimerTask, SCREEN_ON_TIMEOUT_MS);
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
                getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                getActivity().finish();
            }
        });
    }
}
