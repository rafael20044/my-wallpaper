package io.personal.wallpaper;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MyPlugin")
public class MyPlugin extends Plugin {


  @PluginMethod()
  public void execute(PluginCall pluginCall){
    var url = pluginCall.getString("imgUrl");
    var target = pluginCall.getString("target");
    var wallpaper = new Wallpaper(getContext());
    var isOk = wallpaper.setWallpaper(url, target);
    var res = new JSObject();
    res.put("isOk", isOk);
    pluginCall.resolve(res);
  }
}
