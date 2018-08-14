/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.ionic.starter;

/*import android.os.Bundle;
import android.support.annotation.VisibleForTesting;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    public static final String KEY_URL_TO_LOAD = "KEY_URL_TO_LOAD";

    @VisibleForTesting
    protected static final String WEB_FORM_URL = "file:///android_asset/www/index.html";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }
}*/
        /*
         * Copyright 2015, The Android Open Source Project
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
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.VisibleForTesting;
import android.text.TextUtils;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import static android.support.test.espresso.web.internal.deps.guava.base.Preconditions.checkNotNull;

/**
 * An {@link Activity} that gets a text string from the user and displays it back when the user
 * clicks on one of the two buttons. The first one shows it in the same activity and the second
 * one opens another activity and displays the message.
 */
public class MainActivity extends Activity {

    public static final String KEY_URL_TO_LOAD = "KEY_URL_TO_LOAD";

    @VisibleForTesting
    protected static final String WEB_FORM_URL = "file:///android_asset/www/index.html";

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);
        mWebView = (WebView) findViewById(R.id.web_view);
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.loadUrl(urlFromIntent(getIntent()));
        mWebView.requestFocus();
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });
    }

    private static String urlFromIntent(@NonNull Intent intent) {
        checkNotNull(intent, "Intent cannot be null!");
        String url = intent.getStringExtra(KEY_URL_TO_LOAD);
        return !TextUtils.isEmpty(url) ? url : WEB_FORM_URL;
    }

}
