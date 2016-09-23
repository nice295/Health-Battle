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

import android.os.Bundle;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;
import com.nice295.healthbattle.ui.HPBar;

/**
 * Argo.Lee
 */
public class BattleActivity extends BaseActivity {

    HPBar mHPBar1;
    HPBar mHPBar2;
    ImageView mImageView;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_battle_00);

        mImageView = (ImageView) findViewById(R.id.battle_image_view);
        mHPBar1 = (HPBar) findViewById(R.id.hpbar1);
        mHPBar2 = (HPBar) findViewById(R.id.hpbar2);

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

}
