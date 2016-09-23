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

import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.gifdecoder.GifDecoder;
import com.bumptech.glide.request.target.GlideDrawableImageViewTarget;

import java.io.IOException;
import java.io.InputStream;

/**
 * Argo.Lee
 */
public class BattleActivity extends BaseActivity {

    ImageView imageview_Battle;
    Button button_Start;
    boolean button_selected=false;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_battle);
/*
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        Log.i("test","activity is on");*/


        //FIXME: temporarily blocked
        imageview_Battle = (ImageView) findViewById(R.id.ivBattle);
        button_Start = (Button) findViewById(R.id.start_battle_btn);
        button_Start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(button_selected==false) {
                    imageview_Battle.setVisibility(View.VISIBLE);
                    button_selected=true;
                    button_Start.setText("Done");
                }else
                {
                    imageview_Battle.setVisibility(View.GONE);
                    button_selected=false;
                    button_Start.setText("Start");
                }

            }
        });
        GlideDrawableImageViewTarget imageViewTarget = new GlideDrawableImageViewTarget(imageview_Battle);
        Glide.with(this)
                .load(R.drawable.dancingbanna)
                .asGif()
                .crossFade()
                .into(imageview_Battle);

    }

}
