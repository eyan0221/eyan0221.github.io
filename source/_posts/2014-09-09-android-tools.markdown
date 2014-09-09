---
layout: post
title: "Android"
date: 2014-09-09 16:44:09 +0800
comments: true
toc: true
categories: [Android, debug, Google I/O, bootchart, backtrace, keyevent]
---

## [Codenames](https://source.android.com/source/build-numbers.html)

## [Google I/O](https://www.google.com/events/io/)

* [2013](https://developers.google.com/events/io/2013/sessions)
* [2012](https://developers.google.com/events/io/2012/)

## Debug

* [Systrace](http://developer.android.com/tools/help/systrace.html)
* [uiautomator](http://developer.android.com/tools/help/uiautomator/index.html)
* [Memory leak debugging with libc](http://sujaiantony.wordpress.com/)
* [Android Memory Usage](http://elinux.org/Android_Memory_Usage)
* [Logger](http://elinux.org/Android_logger)
* [CallStack in Java](http://stackoverflow.com/questions/1069066/how-can-i-get-the-current-stack-trace)
{% codeblock lang:java %}
import java.lang.Thread
Thread.dumpStack();
{% endcodeblock %}

* [CallStack in C/C++](http://stackoverflow.com/questions/11470190/how-to-use-callstack-in-callstack-tpp-in-a-executable-on-android-platform)
{% codeblock lang:c %}
#include <utils/CallStack.h>
CallStack stack;
stack.dump("[log prefix]");
{% endcodeblock %}

* KeyEvent

Find keycode in [frameworks/base/core/java/android/view/KeyEvent.java](https://android.googlesource.com/platform/frameworks/base.git/+/076357b8567458d4b6dfdcf839ef751634cd2bfb/core/java/android/view/KeyEvent.java#27)
{% codeblock lang:bash %}
$adb shell input keyevent [key code]
$adb shell input keyevent 27    # camera
$adb shell input keyevent 82    # unlock screen
$adb shell input text "ANDROID" # input string
{% endcodeblock %}

## Optimization

* [Boot time](http://www.slideshare.net/kanru/android-boot-time-optimization)

* [bootchart](http://elinux.org/Using_Bootchart_on_Android)

Step1: Installing the bootchart tool

Download [bootchart](http://www.bootchart.org/download.html)

{% codeblock lang:bash %}
$tar xjf bootchart-0.9.tar.bz2
$cd bootchart-0.9
$sudo ./install.sh
{% endcodeblock %}

Step2: Compile init with bootchart enabled and flash images

{% codeblock lang:bash %}
$touch [mydroid]/system/core/init/init.c
$export INIT_BOOTCHART=true
$m init ramdisk bootimage
{% endcodeblock %}

Step3: Trigger bootchart

{% codeblock lang:bash %}
$adb shell 'echo 20 > /data/bootchart-start'
$adb shell mkdir /data/bootchart
{% endcodeblock %}

Step4: Get bootchart.tgz
 
{% codeblock lang:bash %}
$/system/core/init/grab-bootchart.sh
{% endcodeblock %}

Step5: Generate bootchart image

{% codeblock lang:bash %}
$java -jar [path to bootchart]/bootchart-0.9/bootchart.jar bootchart.tgz
{% endcodeblock %}

## Display

* [DPI Calculator](https://www.sven.de/dpi/)

* Display Timeout

{% codeblock set display timeout and stay awake lang:bash %}
$adb shell
#sqlite3 /data/data/com.android.providers.settings/databases/settings.db
#.databases
#.tables
#.dump
#select * from <table>;
#delete from <table> where <condition>;
#update system set value="1800000" where name="screen_off_timeout";
#update system set value="3" where name="stay_on_while_plugged_in";
#.exit
{% endcodeblock %}

## Code Snippet

* Property Permission

[system/core/init/property_service.c](https://android.googlesource.com/platform/system/core/+/fb1c9cf6fa4efafb3e0c6b0bc93c7f087d926a48/init/property_service.c#58)

* Device ID
{% codeblock Device ID lang:bash %}
$adb shell cat /sys/class/android_usb/android0/iSerial
$adb shell getprop ro.serialno
{% endcodeblock %}

{% codeblock out/target/product/[target name]/recovery/root/init.rc lang:c %}
write /sys/class/android_usb/android0/iSerial ${ro.serialno}
{% endcodeblock %}

{% codeblock system/core/init/init.c  lang:c %}
property_set("ro.serialno")
{% endcodeblock %}

## Others

{% codeblock Open Browser with url lang:bash %}
$adb shell am start [url]
{% endcodeblock %}

{% codeblock Start Java App lang:bash %}
$adb shell am start -n [com.package.name]/[com.package.name.ActivityName]
{% endcodeblock %}

{% codeblock Playback Video lang:bash %}
$adb shell am start -a android.intent.action.VIEW -d ////[path to video]/[video file name] -t video/* -n com.android.gallery3d/.app.MovieActivity
{% endcodeblock %}


