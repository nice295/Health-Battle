package com.nice295.healthbattle.Debug;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.nice295.healthbattle.Debug.JumpingJackActivity;
import com.nice295.healthbattle.R;

/**
 * Created by kyuholee on 2016. 9. 4..
 */

public class DebugmainActivity extends AppCompatActivity implements AdapterView.OnItemClickListener {
    private ListView mLvList;

    private String[] mStrings = {
            "Jumping jack",
            "Shake"
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_debugmain);

        mLvList = (ListView) findViewById(R.id.listView);

        mLvList.setAdapter(new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, mStrings));
        mLvList.setTextFilterEnabled(true);
        mLvList.setOnItemClickListener(this);
    }

    public void onItemClick(AdapterView<?> parentView, View clickedView, int position, long id) {
        Intent intent;

        switch (position) {
            case 0:
                intent = new Intent(getApplicationContext(), JumpingJackActivity.class);
                break;
            default:
                intent = new Intent(getApplicationContext(), JumpingJackActivity.class);
                break;
        }
        startActivity(intent);
    }
}
