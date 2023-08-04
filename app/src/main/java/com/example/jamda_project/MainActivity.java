package com.example.jamda_project;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    WebView wv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        wv=findViewById(R.id.wv);

        //기본적으로 웹뷰는 Javascript 실행을 허용하지 않도록 설정되어 있음.
        //웹뷰의 설정을 통해 JS 사용을 허용하도록 변경
        //웹의 설정객체를 얻어오기
        WebSettings settings=wv.getSettings();
        settings.setJavaScriptEnabled(true);

        //2가지 반드시 해야할 설정
        //1. 웹문서가 열릴때 기본적으로 내 WebView가 아니라 새로운 웹뷰를 열어주는 방식을 사용함.
        //그래서 현재의 WebView안에 웹문서가 열리도록 설정
        wv.setWebViewClient(new WebViewClient());
        //2. alert(), comfirm() 같은 팝업기능의 JS코드가 사용가능하도록하는 코드 필요
        wv.setWebChromeClient(new WebChromeClient());

        //웹뷰가 보여줄 웹문서 (.html) 로드하기
        //하이브리드앱은 오프라인에서도 동작해야 하므로
        //웹문서가 이 프로젝트 안에 위치해야함
        wv.loadUrl("file:///android_asset/html/login.html"); //에셋 주소 : /android_asset
    }
}