package com.nice295.healthbattle;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ArrayAdapter;
import android.widget.ListView;

/**
 * Created by kyuholee on 2016. 9. 4..
 */

public class DebugmainActivity  extends AppCompatActivity {
    private ListView mLvList;

    private String[] mStrings = {
            "Users",
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
    }
}
