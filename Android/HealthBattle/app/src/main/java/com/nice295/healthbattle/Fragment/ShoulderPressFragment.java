package com.nice295.healthbattle.Fragment;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.media.Image;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
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

    private static final int VOICE_7_SUB = 10;
    private static final int VOICE_POWER_UP = 11;
    private static final int VOICE_SKILL_UP = 12;
    private static final int VOICE_START = 13;

    private long mLastTime = 0;
    private boolean mUp = false;
    private int mJumpCounter = 0;
    private int mSkill = 0;


    private TimerTask mTimerTask;
    private Handler mHandler;

    private SensorManager mSensorManager;
    private Sensor mSensor;

    private MediaPlayer array_nahyeVoice[];
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
    private ImageView mFinishImageView;
    private TextView mCounterTextView;
    private TextView mExplainTextView;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_should_press, container, false);

        mHelperImageView = (ImageView) view.findViewById(R.id.should_press_image_view);
        mCounterTextView = (TextView) view.findViewById(R.id.should_press_count_text_view);
        mExplainTextView = (TextView) view.findViewById(R.id.should_press_explain_text_view);
        mFinishImageView = (ImageView) view.findViewById(R.id.should_press_fin_image_view);
        mFinishImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getContext(), "Clicked",Toast.LENGTH_SHORT).show();;
                getActivity().finish();

            }
        });
        init();

        return view;
    }

    private void init() {
        getActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        mHandler = new Handler();

        mSensorManager = (SensorManager) getActivity().getSystemService(Context.SENSOR_SERVICE);
        mSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY);

        mDatabase = FirebaseDatabase.getInstance().getReference();
        mUser = FirebaseAuth.getInstance().getCurrentUser();
        if (mUser == null) {
            Toast.makeText(getContext(), "First logout please", Toast.LENGTH_LONG).show();
        }

        GlideDrawableImageViewTarget imageViewTarget = new GlideDrawableImageViewTarget(mHelperImageView);
        Glide.with(getContext())
                .load(R.drawable.gif_workout)
                .asGif()
                .crossFade()
                .into(mHelperImageView);

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(0);

/*        mDatabase.child("users").child(mUser.getUid()).child("power").addValueEventListener(
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
                });*/

        mDatabase.child("counters").child(mUser.getUid()).child("jumping").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            Long count = dataSnapshot.getValue(Long.class);
                            mCounterTextView.setText(String.valueOf(count));
                            mJumpCounter = count.intValue();
                            onJumpDetected(false);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "Jumping:onCancelled", databaseError.toException());
                    }
                });


        //VOICE
        array_nahyeVoice = new MediaPlayer[20];
        array_nahyeVoice[0] = MediaPlayer.create(getContext(), R.raw.workout_1);
        array_nahyeVoice[1] = MediaPlayer.create(getContext(), R.raw.workout_2);
        array_nahyeVoice[2] = MediaPlayer.create(getContext(), R.raw.workout_3);
        array_nahyeVoice[3] = MediaPlayer.create(getContext(), R.raw.workout_4);
        array_nahyeVoice[4] = MediaPlayer.create(getContext(), R.raw.workout_5);
        array_nahyeVoice[5] = MediaPlayer.create(getContext(), R.raw.workout_6);
        array_nahyeVoice[6] = MediaPlayer.create(getContext(), R.raw.workout_7);
        array_nahyeVoice[7] = MediaPlayer.create(getContext(), R.raw.workout_8);
        array_nahyeVoice[8] = MediaPlayer.create(getContext(), R.raw.workout_9);
        array_nahyeVoice[9] = MediaPlayer.create(getContext(), R.raw.workout_10);
        array_nahyeVoice[VOICE_7_SUB] = MediaPlayer.create(getContext(), R.raw.workout_7_sub);
        array_nahyeVoice[VOICE_POWER_UP] = MediaPlayer.create(getContext(), R.raw.workout_powerup);
        array_nahyeVoice[VOICE_SKILL_UP] = MediaPlayer.create(getContext(), R.raw.workout_skillup);
        array_nahyeVoice[VOICE_START] = MediaPlayer.create(getContext(), R.raw.workout_start);
        ;

        array_nahyeVoice[VOICE_START].start();
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
                //onJumpDetected(!mUp);
            }
            mUp = xValue > 0;
            mLastTime = timestamp;
        }
    }

    private void onJumpDetected(boolean up) {
        // we only count a pair of up and down as one successful movement
        if (up) {
            //Toast.makeText(getContext(),"Up",Toast.LENGTH_SHORT).show();
            mHelperImageView.setImageResource(R.drawable.img_workout_up);
            return;
        } else {
            mHelperImageView.setImageResource(R.drawable.img_workout_down);
        }


        if (mJumpCounter == 0) {
            return;
        } else if (mJumpCounter < 10) {
            //mJumpCounter++;
            array_nahyeVoice[mJumpCounter - 1].start();


        } else if (mJumpCounter == 10) {
            //mDatabase.child("users").child(mUser.getUid()).child("power").setValue(mSkill + mJumpCounter);
            array_nahyeVoice[VOICE_POWER_UP].start();
            mExplainTextView.setVisibility(View.GONE);
            mCounterTextView.setVisibility(View.GONE);
            mFinishImageView.setVisibility(View.VISIBLE);

            return;
        } else {
            return;
        }

/*
        if (mJumpCounter == 7) {
            try {
                Thread.sleep(2000);
            } catch (Exception e) {

            }
            array_nahyeVoice[VOICE_7_SUB].start();

        }*/

        // Set value to Firebase database
        //mDatabase.child("counters").child(mUser.getUid()).child("jumping").setValue(mJumpCounter);

    }

    /**
     * Starts a timer to clear the flag FLAG_KEEP_SCREEN_ON.
     */


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
                // getActivity().finish();
            }
        });
    }
}
