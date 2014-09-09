---
layout: post
title: "SurfaceFlinger"
date: 2014-09-09 15:54:50 +0800
comments: true
toc: true
categories: [Android, SurfaceFlinger]
---

## Dump of SERVICE SurfaceFlinger

Find more information about [dumpsys](https://source.android.com/devices/tech/input/dumpsys.html)

{% codeblock lang:bash %}
adb shell dumpsys SurfaceFlinger
{% endcodeblock %}

## Frame Latency

{% codeblock Prints information about last 128 frames displayed in specific window lang:bash %}
adb shell dumpsys SurfaceFlinger --latency [window name]
{% endcodeblock %}

According to [output definitive](https://android.googlesource.com/platform/external/chromium_org/+/d0247b1/build/android/pylib/perf/surface_stats_collector.py#215),
The data returned looks like this:
```
16954612
7657467895508 7657482691352 7657493499756
7657484466553 7657499645964 7657511077881
7657500793457 7657516600576 7657527404785
(...)
```

The first line is the refresh period (here 16.95 ms), it is followed
by 128 lines w/ 3 timestamps in nanosecond each:

A) when the app started to draw <br/>
B) the vsync immediately preceding SF submitting the frame to the h/w <br/>
C) timestamp immediately after SF submitted that frame to the h/w <br/>

The difference between the 1st and 3rd timestamp is the frame-latency.

## Observe composite rate in logcat

{% codeblock lang:bash %}
adb shell service call SurfaceFlinger 1001 i32 1
{% endcodeblock %}

## Force using SurfaceFlinger as compositor

{% codeblock lang:bash %}
adb shell service call SurfaceFlinger 1008 i32 1
{% endcodeblock %}

