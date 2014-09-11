---
layout: post
title: "Tegra Graphics Debugger"
date: 2014-09-11 11:13:25 +0800
comments: true
toc: true
categories: [graphics debugger, tegra, android]
---

## Overview

[Tegra Graphics Debugger](https://developer.nvidia.com/tegra-graphics-debugger) is a free tool from NVIDIA for debugging and profiling OpenGL ES 2.0/3.0/3.1, OpenGL 4.x and [Android Extension Pack](http://www.pcper.com/news/General-Tech/Google-IO-2014-Android-Extension-Pack-Announced). Supported host OS are Windows 7/8, Mac OS X 10.9 and Ubuntu Linux x64 10.10/11.04/12.04. Supported target platform is [Tegra K1](http://en.wikipedia.org/wiki/Tegra#Tegra_K1) Android. 

As for [PerfHUD ES](https://developer.nvidia.com/nvidia-perfhud-es), it focus on Tegra Android platform before and include [Tegra 4](http://en.wikipedia.org/wiki/Tegra#Tegra_4).

In GTC 2014, there is a talk "SG4116: Tegra K1 Developer Tools for Android, Sebastien Domine" which gives introudction of Tegra Graphics Debugger. You may watch [online video](http://www.ustream.tv/recorded/51209645) starting from 29:05 and download [presentation](http://on-demand.gputechconf.com/gtc/2014/presentations/S4825-tegra-k1-dev-tools-for-android.pdf).

## Getting Started

Tegra Graphics Debugger is part of Tegra Android Development Pack which is free for [download](https://developer.nvidia.com/gameworksdownload#?dn=tegra-android-development-pack-3-0r3), but requires NVIDIA GameWorks [Registered](https://developer.nvidia.com/sign-up-gameworks-registered-developer-program) Developer Program membership. You may check online document [here](http://docs.nvidia.com/gameworks/index.html#developertools/mobile/tegra_graphics_debugger_main.htm%3FTocPath%3DDeveloper%2520Tools|Mobile%2520Developer%2520Tools|Tegra%2520Graphics%2520Debugger|_____0) or search below doc after installation.
{% codeblock %}
~/NVPACK/Tegra_Graphics_Debugger/Tegra_Graphics_Debugger.pdf
{% endcodeblock %}

* Launch Tegra Graphics Debugger
{% codeblock lang:bash %}
~/NVPACK/Tegra_Graphics_Debugger$ ./tegra-gfx-debugger
{% endcodeblock %}

* **Performance Dashboard** will be the first view after established connection to target device and launch application.
* **Frame Debugger**: Trigger the **Capture Frame** button.
* **Frame Profiler**: From the **View** menu, select **Profiler**.
* **Dynamic Shader Editing**: Open the **API Inspector**, navigate to the **Program** page.

## Reference

[GPU Technology Conference On-Demand](http://on-demand-gtc.gputechconf.com/gtcnew/on-demand-gtc.php) <br/>
[Tegra Android Development Pack](https://developer.nvidia.com/tegra-android-development-pack)
