package com.nice295.healthbattle.Model;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.firebase.database.IgnoreExtraProperties;

/**
 * Created by kyuholee on 2016. 9. 4..
 */
@IgnoreExtraProperties
public class User implements Parcelable {

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

    protected User(Parcel in) {
        username = in.readString();
        email = in.readString();
        imageUrl = in.readString();
        power = in.readInt();
        skill = in.readInt();
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };

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

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(username);
        parcel.writeString(email);
        parcel.writeString(imageUrl);
        parcel.writeInt(power);
        parcel.writeInt(skill);
    }
}