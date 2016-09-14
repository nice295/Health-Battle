package com.nice295.healthbattle;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.app.TaskStackBuilder;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.NonNull;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nice295.healthbattle.Debug.DebugmainActivity;
import com.nice295.healthbattle.model.Fight;
import com.nice295.healthbattle.model.User;

import io.paperdb.Paper;

/**
 * Created by kyuholee on 2016. 9. 14..
 */
public class FirebaseBackgroundService extends Service {
    private static final String TAG = "FirebaseBackgroundService";
    private DatabaseReference mDatabase;

    @Override
    public IBinder onBind(Intent arg0) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Starting Service...");

        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user == null) {
            Log.d(TAG, "No user...");
            return;
        }

        mDatabase = FirebaseDatabase.getInstance().getReference();
        Log.d(TAG, "Listening: " + mDatabase.child("users/" + user.getUid() + "/notification"));
        mDatabase.child("users/" + user.getUid() + "/notification").addValueEventListener(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if (dataSnapshot.exists()) {
                            Fight fight = dataSnapshot.getValue(Fight.class);

                            Log.d(TAG, "Received value: " + fight.getUid() + ", " + fight.getUser().getUsername() + fight.getState());
                            if (fight.state.equals("new")) {
                                postNotif(fight.user.getUsername());
                            }
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        Log.w(TAG, "getUser:onCancelled", databaseError.toException());
                    }
                });

        Log.d(TAG, "Started Service...");
    }

    private void postNotif(String notifString) {
        Paper.book().write("battle", new User());

        NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(this)
                        .setAutoCancel(true)
                        .setSmallIcon(R.drawable.ic_launcher)
                        .setWhen(System.currentTimeMillis())
                        .setContentTitle("My notification")
                        .setContentText(notifString);
        // Creates an explicit intent for an Activity in your app
        Intent resultIntent = new Intent(this, DebugmainActivity.class);

        // The stack builder object will contain an artificial back stack for the
        // started Activity.
        // This ensures that navigating backward from the Activity leads out of
        // your application to the Home screen.
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(this);
        // Adds the back stack for the Intent (but not the Intent itself)
        stackBuilder.addParentStack(DebugmainActivity.class);
        // Adds the Intent that starts the Activity to the top of the stack
        stackBuilder.addNextIntent(resultIntent);

        PendingIntent resultPendingIntent =
                stackBuilder.getPendingIntent(
                        0,
                        PendingIntent.FLAG_UPDATE_CURRENT
                );
        mBuilder.setContentIntent(resultPendingIntent);

        NotificationManager mNotificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        // mId allows you to update the notification later on.
        mNotificationManager.notify(0, mBuilder.build());
    }
}
