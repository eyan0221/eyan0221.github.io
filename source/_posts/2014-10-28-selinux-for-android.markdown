---
layout: post
title: "SELinux for Android"
date: 2014-10-28 12:02:35 +0800
comments: true
toc: true
categories: [Android, SELinux] 
---

## Reference

* [SELinux Project Wiki](http://selinuxproject.org/page/Main_Page)
* [SE for Android](http://selinuxproject.org/page/NB_SEforAndroid_1)
* [Security Enhancements for Android](http://seandroid.bitbucket.org/)
* [Validating Security-Enhanced Linux in Android](http://source.android.com/devices/tech/security/se-linux.html)
* [2012 Red Hat Summit: SELinux For Mere Mortals](http://www.youtube.com/watch?v=MxjenQ31b70)

## Projects

* [external/sepolicy/README](https://android.googlesource.com/platform/external/sepolicy/+/master/README)
* external/libselinux/
* external/libsepol/
* device/manufacturer/device-name/sepolicy

## Control

* Permissive mode
{% codeblock BOARD_KERNEL_CMDLINE %}
androidboot.selinux=permissive
{% endcodeblock %}

## [HowTo](http://securityblog.org/2013/06/28/se-for-android-gs4-howto-and-exploit-demo/)

{% codeblock %}
# reload policy
adb remount && adb push sepolicy /data/security/
adb shell setprop selinux.reload_policy <0|1>
# toggle enforcing and permissive
adb shell setenforce <0|1|permissive|enforcing>
adb shell getenforce
{% endcodeblock %}

## Policy

The policy rules come in the form: allow domains types:classes permissions;, where:

* Domain - A label for the process or set of processes.
* Type - A label for the object (e.g. file, socket) or set of objects.
* Class - The kind of object (e.g. file, socket) being accessed.
* Permission - The operation (e.g. read, write) being performed.

And so an example use of this would follow the structure:

{% codeblock %}
allow appdomain app_data_file:file rw_file_perms;
{% endcodeblock %}

