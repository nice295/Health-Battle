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
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.AnimationUtils;
import android.view.animation.ScaleAnimation;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.nice295.healthbattle.ui.HPBar;

/**
 * Argo.Lee
 */
public class BattleActivity extends BaseActivity implements View.OnClickListener, HPBar.HPBarListener {
    private LinearLayout mLl00;
    private LinearLayout mLl01;
    private LinearLayout mLlWin;
    private LinearLayout mLlLost;

    HPBar mHPBar1;
    HPBar mHPBar2;
    ImageView mImageView;
    ImageView mFightTextImageView;
    private Animation mAnimation;

    private Button mbtStart;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_battle);

        mLl00 = (LinearLayout) findViewById(R.id.ll00);
        mLl01 = (LinearLayout) findViewById(R.id.ll01);
        mLlWin = (LinearLayout) findViewById(R.id.llWin);
        mLlLost = (LinearLayout) findViewById(R.id.llLost);

        mLl01.setVisibility(View.GONE);
        mLlWin.setVisibility(View.GONE);
        mLlLost.setVisibility(View.GONE);

        mImageView = (ImageView) findViewById(R.id.battle_image_view);
        mHPBar1 = (HPBar) findViewById(R.id.hpbar1);
        mHPBar2 = (HPBar) findViewById(R.id.hpbar2);

        mHPBar1.setHPFullListener(this);

        mbtStart = (Button) findViewById(R.id.btStart);
        mbtStart.setOnClickListener(this);

        final int hpbar[] = new int[]{
            80, 80, 60, 20, 10
        };
        final int hpbar2[] = new int[]{
            90, 70, 50, 30, 0
        };

        final Handler handler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                int index = msg.what;
                mHPBar1.setBarLevel(hpbar[index]);
                mHPBar2.setBarLevel(hpbar2[index]);

                if (index == 4) {
                    mLl01.setVisibility(View.GONE);
                    mLlWin.setVisibility(View.VISIBLE);
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
                Log.d("BATTLE", "end");
                mFightTextImageView.setVisibility(View.GONE);
                handler.sendEmptyMessageDelayed(0, 1000l);
            }

            @Override
            public void onAnimationRepeat(Animation animation) {

            }
        });

        GlideDrawableImageViewTarget imageViewTarget = new GlideDrawableImageViewTarget(mImageView);
        Glide.with(this)
                .load(R.drawable.dancingbanna)
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
    public void onClick(View view) {
        if (view == mbtStart) {
            mLl00.setVisibility(View.GONE);
            mLl01.setVisibility(View.VISIBLE);
        }
    }

    @Override
    public void onFullCharged() {
        mFightTextImageView.setVisibility(View.VISIBLE);
        mFightTextImageView.startAnimation(mAnimation);
    }

    @Override
    public void onEmpty() {

    }
}
