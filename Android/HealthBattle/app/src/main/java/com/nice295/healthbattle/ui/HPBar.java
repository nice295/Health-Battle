package com.nice295.healthbattle.ui;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;

import com.nice295.healthbattle.R;

/**
 * Created by chokobole on 2016. 9. 24..
 */

public class HPBar extends View {
    public interface HPBarListener {
        void onFullCharged();
        void onEmpty();
    }

    private HPBarListener mHPBarListener;

    private Paint mBarPaint;
    private int mBarStrokeWidth;
    private int mBarLevel;
    private int mBarColor;
    private boolean mLtr;

    private float mBarCurWidth;
    private float mCenterY;
    private float mBarOffsetX;
    private float mBarWidth;

    private final static float BAR_OFFSET = 0.1f;
    private final static float BAR_WIDTH_FACTOR = 0.8f;

    private boolean mFirst;

    public HPBar(Context context) {
        super(context);
    }

    public HPBar(Context context, AttributeSet attrs) {
        super(context, attrs);

        TypedArray typedArray = context.getTheme().obtainStyledAttributes(
            attrs,
            R.styleable.HPBar,
            0, 0);

        try {
            mBarStrokeWidth = typedArray.getDimensionPixelSize(R.styleable.HPBar_barStrokeWidth, 20);
            mBarLevel = typedArray.getInt(R.styleable.HPBar_barLevel, 100);
            mBarLevel = Math.min(Math.max(0, mBarLevel), 100);
            mBarColor = typedArray.getColor(R.styleable.HPBar_barColor, Color.CYAN);
            mLtr = typedArray.getBoolean(R.styleable.HPBar_ltr, true);
        } finally {
            typedArray.recycle();
        }

        mBarPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
        mBarPaint.setColor(mBarColor);
        mBarPaint.setStrokeWidth(mBarStrokeWidth);
        mBarPaint.setStrokeCap(Paint.Cap.ROUND);

        mFirst = true;
    }

    @Override
    protected void onSizeChanged(int curW, int curH, int prevW, int prevH) {
        if (curW != prevW || curH != prevH) {
            mBarCurWidth = 0;
            updateLayoutBound();
        }
    }

    public void setFirst(boolean first) {
        mFirst = first;
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        // Add padding to maximum height calculation.
        final int parentWidth = MeasureSpec.getSize(widthMeasureSpec);
        final int desiredWith;
        if (mFirst) {
            desiredWith = (int) (parentWidth * 0.5);
        } else {
            desiredWith = parentWidth;
        }
        final int desiredHeight = Math.round(
            mBarStrokeWidth + getPaddingTop()  + getPaddingBottom());
        // Reconcile size that this view wants to be with the size the parent will let it be.
        final int measuredWidth = reconcileSize(desiredWith, widthMeasureSpec);
        final int measuredHeight = reconcileSize(desiredHeight, heightMeasureSpec);

        // Store the final measured dimensions.
        setMeasuredDimension(measuredWidth, measuredHeight);
    }

    private int reconcileSize(int contentSize, int measureSpec) {
        final int mode = MeasureSpec.getMode(measureSpec);
        final int specSize = MeasureSpec.getSize(measureSpec);
        switch(mode) {
            case MeasureSpec.EXACTLY:
                return specSize;
            case MeasureSpec.AT_MOST:
                if (contentSize < specSize) {
                    return contentSize;
                } else {
                    return specSize;
                }
            case MeasureSpec.UNSPECIFIED:
            default:
                return contentSize;
        }
    }

    private void updateLayoutBound() {
        final int canvasWidth = getWidth();
        final int canvasHeight = getHeight();

        mCenterY = canvasHeight * 0.5f;
        mBarOffsetX = canvasWidth * BAR_OFFSET;
        mBarWidth = canvasWidth * BAR_WIDTH_FACTOR * (mBarLevel / 100.0f);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        int delay = 50;
        if (mLtr) {
            if (mBarCurWidth < mBarWidth) {
                mBarCurWidth += 10;
                if (mBarCurWidth > mBarWidth) {
                    mBarCurWidth = mBarWidth;
                }
                canvas.drawLine(mBarOffsetX, mCenterY, mBarOffsetX + mBarCurWidth, mCenterY, mBarPaint);

                postInvalidateDelayed(delay);
            } else if (mBarCurWidth > mBarWidth){
                mBarCurWidth -= 10;
                if (mBarCurWidth < mBarWidth) {
                    mBarCurWidth = mBarWidth;
                }

                canvas.drawLine(mBarOffsetX, mCenterY, mBarOffsetX + mBarCurWidth, mCenterY, mBarPaint);

                postInvalidateDelayed(delay);
            } else {
                canvas.drawLine(mBarOffsetX, mCenterY, mBarOffsetX + mBarWidth, mCenterY, mBarPaint);
                if (mHPBarListener == null)
                    return;

                if (mBarLevel == 0) {
                    mHPBarListener.onEmpty();
                } else if (mBarLevel == 100){
                    mHPBarListener.onFullCharged();
                }
            }
        } else {
            if (mBarCurWidth < mBarWidth) {
                mBarCurWidth += 10;
                if (mBarCurWidth > mBarWidth) {
                    mBarCurWidth = mBarWidth;
                }
                canvas.drawLine(getWidth() - mBarOffsetX, mCenterY, getWidth() - mBarOffsetX - mBarCurWidth, mCenterY, mBarPaint);

                postInvalidateDelayed(delay);
            } else if (mBarCurWidth > mBarWidth) {
                mBarCurWidth -= 10;
                if (mBarCurWidth < mBarWidth) {
                    mBarCurWidth = mBarWidth;
                }
                canvas.drawLine(getWidth() - mBarOffsetX, mCenterY, getWidth() - mBarOffsetX - mBarCurWidth, mCenterY, mBarPaint);

                postInvalidateDelayed(delay);
            } else {
                canvas.drawLine(getWidth() - mBarOffsetX, mCenterY, getWidth() - mBarOffsetX - mBarWidth, mCenterY, mBarPaint);
                if (mHPBarListener == null)
                    return;

                if (mBarLevel == 0) {
                    mHPBarListener.onEmpty();
                } else if (mBarLevel == 100){
                    mHPBarListener.onFullCharged();
                }
            }
        }
    }

    public void setBarLevel(int barLevel) {
        int newBarLevel = Math.min(Math.max(0, barLevel), 100);
        if (mBarLevel != newBarLevel) {
            mBarLevel = newBarLevel;
            updateLayoutBound();
            invalidate();
        }
    }

    public int getBarLevel() {
        return mBarLevel;
    }

    public void setHPFullListener(HPBarListener hpBarListener) {
        mHPBarListener = hpBarListener;
    }
}
