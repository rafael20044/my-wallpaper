package io.personal.wallpaper;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.Log;

import java.net.HttpURLConnection;
import java.net.URL;

public class Wallpaper {

  private final Context context;

  public Wallpaper(Context context) {
    this.context = context;
  }

  public boolean setWallpaper(String imgUrl, String target) {
    if (imgUrl == null || imgUrl.isEmpty()) {
      return false;
    }

    try {

      // 1. Descargar la imagen
      var url = new URL(imgUrl);
      HttpURLConnection connection = (HttpURLConnection) url.openConnection();
      connection.setDoInput(true);
      connection.connect();

      var input = connection.getInputStream();
      var bitmap = BitmapFactory.decodeStream(input);

      if (bitmap == null) {
        return false;
      }

      // 2. Obtener instancia de WallpaperManager
      WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);

      // 3. Determinar destino
      int flag = WallpaperManager.FLAG_SYSTEM; // por defecto Home
      if ("lock".equalsIgnoreCase(target)) {
        flag = WallpaperManager.FLAG_LOCK;
      } else if ("both".equalsIgnoreCase(target)) {
        flag = WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK;
      }

      // 4. Aplicar wallpaper
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        wallpaperManager.setBitmap(bitmap, null, true, flag);
      } else {
        wallpaperManager.setBitmap(bitmap);
      }

      return true;

    } catch (Exception e) {
      return false;
    }
  }
}

