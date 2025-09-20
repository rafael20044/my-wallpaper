package io.personal.wallpaper;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    registerPlugin(MyPlugin.class);
    super.onCreate(savedInstanceState);
  }
}
