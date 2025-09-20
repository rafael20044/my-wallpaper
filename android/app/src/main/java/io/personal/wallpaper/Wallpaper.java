package io.personal.wallpaper;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.Build;

import java.net.HttpURLConnection;
import java.net.URL;

public class Wallpaper{

  private final Context context;
  public Wallpaper(Context context){
    this.context = context;
  }

  public boolean setWallpaper(String imgUrl, String target) {
    if (imgUrl == null || imgUrl.isEmpty()) {
      return false;
    }

    try {
      var url = new URL(imgUrl);
      var connection = (HttpURLConnection) url.openConnection();
      connection.setDoInput(true);
      connection.connect();

      var input = connection.getInputStream();
      var bitmap = BitmapFactory.decodeStream(input);

      var wallpaperManager = WallpaperManager.getInstance(context);

      int flag = WallpaperManager.FLAG_SYSTEM;

      if ("lock".equalsIgnoreCase(target)) {
        flag = WallpaperManager.FLAG_LOCK;
      } else if ("both".equalsIgnoreCase(target)) {
        flag = WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK;
      }
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        wallpaperManager.setBitmap(bitmap, null, true, flag);
      }else{
        wallpaperManager.setBitmap(bitmap);
      }

      return true;

    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}
