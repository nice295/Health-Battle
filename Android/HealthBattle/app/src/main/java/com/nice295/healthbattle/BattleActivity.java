/*
 * Copyright (C) 2015 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.nice295.healthbattle;

import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.nice295.healthbattle.Model.User;
import com.nice295.healthbattle.ui.HPBar;

/**
 * Argo.Lee
 */
public class BattleActivity extends BaseActivity implements  HPBar.HPBarListener {
    private LinearLayout mLl01;
    private LinearLayout mLlWin;

    HPBar mHPBar1;
    HPBar mHPBar2;
    ImageView mImageView;
    ImageView mFightTextImageView;

    TextView mMeTextView;
    ImageView mReenableImageView;
    TextView mOtherTextView;
    TextView mMeHPTextView;
    TextView mOtherHPTextView;

    private Animation mAnimation;
    private Handler mHandler;

    MediaPlayer voice_fight_start;
    MediaPlayer voice_fight_finish;
    MediaPlayer voice_fight_winner;

    private User mMe;
    private User mOther;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_battle);

        Intent intent = getIntent();
        mMe = intent.getParcelableExtra("me");
        mOther = intent.getParcelableExtra("opponent");

        voice_fight_start= MediaPlayer.create(this, R.raw.voice_fight_start);
        voice_fight_finish= MediaPlayer.create(this, R.raw.voice_fight_finish);
        voice_fight_winner= MediaPlayer.create(this, R.raw.voice_fight_winner);

        mLl01 = (LinearLayout) findViewById(R.id.ll01);
        mLlWin = (LinearLayout) findViewById(R.id.llWin);

        mLl01.setVisibility(View.VISIBLE);
        mLlWin.setVisibility(View.GONE);

        mImageView = (ImageView) findViewById(R.id.battle_image_view);
        mHPBar1 = (HPBar) findViewById(R.id.hpbar1);
        mHPBar2 = (HPBar) findViewById(R.id.hpbar2);

        mMeTextView = (TextView) findViewById(R.id.tvName);
        mMeTextView.setText(mMe.getUsername());
        mReenableImageView = (ImageView) findViewById(R.id.reenable_image_view);
        mReenableImageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        mHPBar1.setHPFullListener(this);
        mHPBar2.setHPFullListener(this);

        mMeTextView = (TextView) findViewById(R.id.me_text_view);
        mMeHPTextView = (TextView) findViewById(R.id.me_hp_text_view);
        mOtherTextView = (TextView) findViewById(R.id.other_text_view);
        mOtherHPTextView = (TextView) findViewById(R.id.other_hp_text_view);

        mMeTextView.setText(String.format("P1: %s", mMe.getUsername()));
        mOtherTextView.setText(String.format("P2: %s", mOther.getUsername()));
        mMeHPTextView.setText(String.valueOf(mHPBar1.getBarLevel()));
        mOtherHPTextView.setText(String.valueOf(mHPBar2.getBarLevel()));

        final int hpbar[] = new int[]{
            80, 80, 60, 20, 10
        };
        final int hpbar2[] = new int[]{
            90, 70, 50, 30, 0
        };

        mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                int index = msg.what;
                mMeHPTextView.setText(String.valueOf(mHPBar1.getBarLevel()));
                mOtherHPTextView.setText(String.valueOf(mHPBar2.getBarLevel()));
                mHPBar1.setBarLevel(hpbar[index]);
                mHPBar2.setBarLevel(hpbar2[index]);

                if (index == 4) {
                    return;
                }

                sendEmptyMessageDelayed(index + 1, 1000l);
            }
        };

        mFightTextImageView = (ImageView) findViewById(R.id.fight_text_image_view);
        mFightTextImageView.setVisibility(View.GONE);
        mAnimation = AnimationUtils.loadAnimation(this, R.anim.scale_up);
        mAnimation.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation animation) {

            }

            @Override
            public void onAnimationEnd(Animation animation) {
                mFightTextImageView.setVisibility(View.GONE);
                mImageView.setVisibility(View.VISIBLE);
                mHandler.sendEmptyMessageDelayed(0, 1000l);
                voice_fight_start.start();
            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

        GlideDrawableImageViewTarget imageViewTarget = new GlideDrawableImageViewTarget(mImageView);
        Glide.with(this)
                .load(R.drawable.fight)
                .asGif()
                .crossFade()
                .into(mImageView);

/*
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        Log.i("test","activity is on");*/
    }

    @Override
    public void onFullCharged() {
        if (mAnimation.hasStarted())
            return;

        mFightTextImageView.setVisibility(View.VISIBLE);
        mFightTextImageView.startAnimation(mAnimation);
    }

    @Override
    public void onEmpty() {
        if (mLl01.getVisibility() == View.GONE)
            return;

        mLl01.setVisibility(View.GONE);
        mLlWin.setVisibility(View.VISIBLE);

        voice_fight_finish.start();
        voice_fight_winner.start();
    }
}
