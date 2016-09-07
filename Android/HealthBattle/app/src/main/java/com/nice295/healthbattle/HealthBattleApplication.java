package com.nice295.healthbattle;

import android.app.Application;

import com.tsengvn.typekit.Typekit;

/**
 * Created by kyuholee on 2016. 9. 8..
 */
public class HealthBattleApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        Typekit.getInstance()
                .addNormal(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"))
                .addBold(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"))
                .addItalic(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"))
                .addBoldItalic(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"))
                .addCustom1(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"))
                .addCustom2(Typekit.createFromAsset(this, "BMDOHYEON_ttf.ttf"));
    }
}
