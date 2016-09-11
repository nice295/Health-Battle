package com.nice295.healthbattle.Debug;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.nice295.healthbattle.BaseActivity;
import com.nice295.healthbattle.Debug.JumpingJackActivity;
import com.nice295.healthbattle.R;

/**
 * Created by kyuholee on 2016. 9. 4..
 */

public class DebugmainActivity extends BaseActivity implements AdapterView.OnItemClickListener {
    private ListView mLvList;

    private String[] mStrings = {
            "Shoulder press",
            "Jumping jack",
            "All members"
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
            case 0: // shoulder press
                intent = new Intent(getApplicationContext(), ShoulderPressActivity.class);
                break;
            case 1: // jumping jack
                intent = new Intent(getApplicationContext(), JumpingJackActivity.class);
                break;
            case 2: // all members
                intent = new Intent(getApplicationContext(), AllMembersActivity.class);
                break;
            default:
                intent = new Intent(getApplicationContext(), ShoulderPressActivity.class);
                break;
        }
        startActivity(intent);
    }
}
