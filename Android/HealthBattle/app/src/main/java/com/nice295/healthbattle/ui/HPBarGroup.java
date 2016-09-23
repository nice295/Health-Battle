package com.nice295.healthbattle.ui;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

/**
 * Created by chokobole on 2016. 9. 24..
 */

public class HPBarGroup extends ViewGroup{
    private int mEndX;

    public HPBarGroup(Context context) {
        super(context);
    }

    public HPBarGroup(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    protected boolean checkLayoutParams(ViewGroup.LayoutParams p) {
        return p instanceof MarginLayoutParams;
    }

    @Override
    protected LayoutParams generateDefaultLayoutParams() {
        return new MarginLayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.MATCH_PARENT);
    }

    @Override
    public LayoutParams generateLayoutParams(AttributeSet attrs) {
        return new MarginLayoutParams(getContext(), attrs);
    }

    @Override
    protected LayoutParams generateLayoutParams(ViewGroup.LayoutParams p) {
        return generateDefaultLayoutParams();
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        final int childCount = getChildCount();
        int heightMax = 0;
        int widthUsed = 0;
        for (int i = 0; i < childCount; i++) {
            HPBar childView = (HPBar) getChildAt(i);
            if (i == 0) {
                childView.setFirst(true);
            } else {
                childView.setFirst(false);
            }
            measureChildWithMargins(childView,
                widthMeasureSpec, widthUsed,
                heightMeasureSpec, 0);
            Log.d("HPBAR", "maesured width : " +childView.getMeasuredWidth());
            Log.d("HPBAR", "maesured height : " +childView.getMeasuredHeight());
            heightMax = Math.max(heightMax, childView.getMeasuredHeight());
            widthUsed += childView.getMeasuredWidth();
            Log.d("HPBAR", "with used : " +widthUsed);
        }
        setMeasuredDimension(widthUsed, heightMax);
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        final int childCount = getChildCount();
        int x = getPaddingLeft();
        int y = getPaddingTop();
        for (int i = 0; i < childCount; i++) {
            View childView = getChildAt(i);
            MarginLayoutParams layoutParams = (MarginLayoutParams) childView.getLayoutParams();
            childView.layout(
                x + layoutParams.leftMargin, y + layoutParams.topMargin,
                x + childView.getMeasuredWidth(), y +childView.getMeasuredHeight());
            x += layoutParams.leftMargin + childView.getWidth();
        }
    }
}
