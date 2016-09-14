package com.nice295.healthbattle.model;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Created by kyuholee on 2016. 9. 4..
 */
@IgnoreExtraProperties
public class Fight {

    public String uid;
    public String state;
    public User user;

    public Fight() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public Fight(String state, String uid, User user) {
        this.state = state; // old, new
        this.uid = uid;
        this.user = user;
    }

    public String getUid() {
        return uid;
    }

    public String getState() {
        return state;
    }

    public User getUser() {
        return user;
    }
}