package com.nice295.healthbattle.Model;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Created by kyuholee on 2016. 9. 4..
 */
@IgnoreExtraProperties
public class User {

    public String username;
    public String email;
    public String imageUrl;
    public int power;
    public int skill;

    public User() {
        // Default constructor required for calls to DataSnapshot.getValue(User.class)
    }

    public User(String username, String email, String imageUrl) {
        this.username = username;
        this.email = email;
        this.imageUrl = imageUrl;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public int getPower() {
        return power;
    }

    public int getSkill() {
        return skill;
    }
}