---
layout: post
title: "Linux Kernel"
date: 2014-09-10 15:11:33 +0800
comments: true
toc: true
categories: [linux, ftrace, gdb, kgdb, kmemleak, debug_slab, perf, device tree, irqsoff, strace, usbmon]
---

## Terminology

* [Device Tree](http://devicetree.org/Device_Tree_Usage)
* [errno](http://man7.org/linux/man-pages/man3/errno.3.html)
* [DRM = Direct Rendering Manager](https://www.kernel.org/doc/readme/drivers-gpu-drm-README.drm)
* [Linux DRM Developer Guide](https://www.kernel.org/doc/htmldocs/drm/)
* [KMS = Kernel Mode Setting](https://www.kernel.org/doc/htmldocs/drm/drm-kms-init.html)
* [ADF = Atomic Display Framework](http://lwn.net/Articles/565422/)
* [KMSCUBE](http://www.phoronix.com/scan.php?page=news_item&px=MTE3NTU)
* [epoll](http://kovyrin.net/2006/04/13/epoll-asynchronous-network-programming/)


## IPC

* [Kdbus](http://kroah.com/log/blog/2014/01/15/kdbus-details/)
* [Linux IPC](http://tldp.org/LDP/lpg/node7.html)
* [Binder](http://elinux.org/Android_Binder)
* [Semaphore](http://www.linuxdevcenter.com/pub/a/linux/2007/05/24/semaphores-in-linux.html?page=5)
* [Signals](http://www.thegeekstuff.com/2012/03/catch-signals-sample-c-code/)

## Optimization

* [Introduction to Real Time Linux](http://www.linux.com/news/featured-blogs/200-libby-clark/710319-intro-to-real-time-linux-for-embedded-developers)
* [Kernel Size Tuning Guide](http://elinux.org/Kernel_Size_Tuning_Guide)

## Debugger

* kgdb

* [gdb](https://sourceware.org/gdb/current/onlinedocs/gdb/index.html#SEC_Contents) on android

{% codeblock Target lang:bash %}
$gdbserver :1234 --attach <pid>
{% endcodeblock %}

{% codeblock Host lang:bash %}
$adb forward tcp:1234 tcp:1234
$<path>/arm-eabi-gdb <path>/symbols/system/bin/app_process32
(gdb) set solib-search-path <path to out>/symbols/system/lib:<path to out>/symbols/system/vendor/lib/
(gdb) set solib-absolute-prefix <path to out>/symbols/
(gdb) target remote :1234
(gdb) b <symbol>                # set break point
(gdb) b <address>               # set break point
(gdb) b <symbol> if <condition> # set conditional break point
(gdb) i b                       # list break points
(gdb) d <id>                    # delete break point with <id>
(gdb) bt                        # print backtrace
(gdb) s                         # step into
(gdb) n                         # step over
(gdb) c                         # continue
{% endcodeblock %}

* strace

{% codeblock lang:bash %}
$strace -tt -o<log> <executable>
{% endcodeblock %}

* [usbmon](https://www.kernel.org/doc/Documentation/usb/usbmon.txt)

{% codeblock .config lang:c %}
CONFIG_USB_DEBUG=y
CONFIG_USB_MON=y
{% endcodeblock %}

{% codeblock kernel/drivers/usb/host/ehci-xxx.c lang:c %}
#define DEBUG
{% endcodeblock %}

{% codeblock check bus id lang:bash %}
cat /sys/kernel/debug/usb/devices
T:  Bus=03 Lev=01 Prnt=01 Port=00 Cnt=01 Dev#=  2 Spd=12  MxCh= 0
{% endcodeblock %}

{% codeblock get raw text trace from <bus id> lang:bash %}
$cat /sys/kernel/debug/usb/usbmon/<bus id>u > <log>
{% endcodeblock %}

* lowlevel Debug

{% codeblock .config lang:c %}
CONFIG_DEBUG_LL=y
{% endcodeblock %}

* [kmemleak](https://www.kernel.org/doc/Documentation/kmemleak.txt)

Step1: rebuild/flash kernel

{% codeblock .config lang:c %}
CONFIG_DEBUG_KMEMLEAK=y
{% endcodeblock %}

Step2: Get memory leak information

{% codeblock lang:bash %}
$cat /sys/kernel/debug/kmemleak          # get log
$echo scan > /sys/kernel/debug/kmemleak  # trigger memory scan
$echo clear > /sys/kernel/debug/kmemleak # clear memory leaks
{% endcodeblock %}

* debug_slab

Step1: Revert this commit

```
commit 3ff84a7f36554b257cd57325b1a7c1fa4b49fbe3
Author: Pekka Enberg <penberg@kernel.org>
Date:  Mon Feb 14 17:46:21 2011 +0200

   Revert "slab: Fix missing DEBUG_SLAB last user"
```

Step2: rebuild/flash kernel

{% codeblock .config lang:c %}
CONFIG_DEBUG_SLAB=y
CONFIG_DEBUG_SLAB_LEAK=y
{% endcodeblock %}

Step3: Get slab information

{% codeblock lang:bash %}
$cat /proc/slab_allocators
$cat /proc/slabinfo
{% endcodeblock %}

* irqsoff tracer

Step1: rebuild/flash kernel

{% codeblock .config lang:c %}
CONFIG_IRQSOFF_TRACER=y
{% endcodeblock %}

Step2: testing

{% codeblock lang:bash %}
$echo irqsoff > /d/tracing/current_tracer
$echo 0 > /sys/kernel/debug/tracing/tracing_max_latency
# start testing
$cat /sys/kernel/debug/tracing/tracing_max_latency
{% endcodeblock %}

* [ftrace](https://www.kernel.org/doc/Documentation/trace/ftrace.txt)

Step1: rebuild/flash kernel

{% codeblock .config lang:c %}
CONFIG_DYNAMIC_FTRACE=y
CONFIG_FTRACE=y
CONFIG_FUNCTION_TRACER=y
{% endcodeblock %}

Step2: testing

{% codeblock lang:bash %}
$echo <pid> > /d/tracing/set_ftrace_pid
$echo function > /d/tracing/current_tracer
# start testing
$cat /d/tracing/trace_pipe
{% endcodeblock %}

* [perf](https://perf.wiki.kernel.org/index.php/Main_Page)

Step1: rebuild/flash kernel

{% codeblock .config lang:c %}
CONFIG_HAVE_PERF_EVENTS=y
CONFIG_PERF_EVENTS=y
CONFIG_PROFILING=y
CONFIG_OPROFILE=y
CONFIG_HW_PERF_EVENTS=y 
{% endcodeblock %}

Step2: testing

{% codeblock lang:bash %}
# push library symbol
$perf record -g -f -p <pid>
$perf report --sort dso,symbol >output.txt
{% endcodeblock %}

* [Tracedump](https://android.googlesource.com/kernel/tegra/+/android-tegra-3.10/Documentation/trace/tracedump.txt)

{% codeblock .config lang:c %}
CONFIG_TRACING=y 
CONFIG_FUNCTION_TRACER=y 
CONFIG_TRACEDUMP_PANIC=y 
{% endcodeblock %}

{% codeblock kernel/trace/tracedump.c lang:c %}
format_ascii = true 
{% endcodeblock %}

{% codeblock lang:bash %}
$cd /sys/kernel/debug/tracing 
$echo function > current_tracer
$echo 1 > /proc/sys/kernel/ftrace_dump_on_oops
{% endcodeblock %}

## Code Snippet

* [LIKELY and UNLIKELY](http://kernelnewbies.org/FAQ/LikelyUnlikely)

{% codeblock lang:c %}
#define LIKELY( exp )       (__builtin_expect( (exp) != 0, true  ))
#define UNLIKELY( exp )     (__builtin_expect( (exp) != 0, false ))
{% endcodeblock %}

* Kenrel independent build

{% codeblock kernel/kernel/module.c lang:c %}
diff --git a/kernel/module.c b/kernel/module.c
index 3b5a5d6..5b35c69 100644
--- a/kernel/module.c
+++ b/kernel/module.c
@@ -2704,7 +2704,6 @@ static int check_modinfo(struct module *mod, struct load_info *info, int flags)
        } else if (!same_magic(modmagic, vermagic, info->index.vers)) {
                printk(KERN_ERR "%s: version magic '%s' should be '%s'\n",
                       mod->name, modmagic, vermagic);
-               return -ENOEXEC;
        }
 
        if (!get_modinfo(info, "intree"))
{% endcodeblock %}

