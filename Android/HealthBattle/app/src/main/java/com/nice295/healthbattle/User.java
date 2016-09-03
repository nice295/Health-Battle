package com.nice295.healthbattle;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Created by kyuholee on 2016. 9. 4..
 */
@IgnoreExtraProperties
public class User {

    public String username;
    public String email;
    public int power;
    public int skill;

    public User() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public User(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public int  getPower() {
        return power;
    }

    public int getSkill() {
        return skill;
    }
}