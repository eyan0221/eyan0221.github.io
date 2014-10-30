---
layout: post
title: "Android Window System"
date: 2014-10-29 14:55:34 +0800
comments: true
toc: true
categories: [Android, SurfaceFlinger, ANativeWindow]
---


## Overview 

* [Graphics](https://source.android.com/devices/graphics.html)
* [Graphics Architecutre](https://source.android.com/devices/graphics/architecture.html)

" Android SurfaceFlinger drives the composition of surface area and the rendering to the display screen. UI application must obtain a surface to draw graphics from SurfaceFlinger. "

### Android Graphics Components

![Android Graphics Components](https://source.android.com/devices/graphics/images/graphics_surface.png)

### Graphics Pipeline

![Graphics Pipeline](https://source.android.com/devices/graphics/images/graphics_pipeline.png)

### BufferQueue

![SurfaceFlinger+BufferQueue](https://source.android.com/devices/graphics/images/surfaceflinger_bufferqueue.png)

![BufferQueue Sync](https://source.android.com/devices/graphics/images/bufferqueue.png)

* [BufferQueue](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/include/gui/BufferQueue.h)
* [IGraphicBufferConsumer](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/include/gui/IGraphicBufferConsumer.h)
* [IGraphicBufferProducer](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/include/gui/IGraphicBufferProducer.h)

{% img /images/20141030-bufferqueue.png %}

## Understanding Android Internals 
### Graphics Basics [I](https://charleszblog.wordpress.com/2014/02/20/understanding-android-internals-graphics-basics-i/) and [II](https://charleszblog.wordpress.com/2014/02/20/understanding-android-internals-graphics-basicsii/)

{% img /images/20141029-class-diagram.png %}

#### Surface

"Surface is a rectangle canvas window on the screen with 2d geometrical metrics and particular color scheme."

* [Surface](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/include/gui/Surface.h)

#### Window

"Window is associated a certain count of graphics buffers which are used to contain drawing artifacts. "

* [android_native_base_t ](https://android.googlesource.com/platform/system/core/+/android-l-preview_r2/include/system/window.h)
* [ANativeWindow](https://android.googlesource.com/platform/system/core/+/android-l-preview_r2/include/system/window.h)
* [EGLNativeWindowType](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/opengl/include/EGL/eglplatform.h)

#### Graphic Buffer

* [native_handle](https://android.googlesource.com/platform/system/core/+/android-l-preview_r2/include/cutils/native_handle.h)
* [ANativeWindowBuffer](https://android.googlesource.com/platform/system/core/+/android-l-preview_r2/include/system/window.h)
* [Flattenable](https://android.googlesource.com/platform/system/core/+/android-l-preview_r2/include/utils/Flattenable.h)
* [GraphicBuffer](https://android.googlesource.com/platform/frameworks/native/+/android-l-preview_r2/include/ui/GraphicBuffer.h)
* [Graphic Buffer Handling Interface](https://charleszblog.wordpress.com/2014/02/21/understanding-android-internals-graphic-buffer-handling-interfacres/)

### SurfaceFlinger 

* [I](https://charleszblog.wordpress.com/2014/02/22/understanding-android-internals-surfaceflinger-i/)
* [II](https://charleszblog.wordpress.com/2014/02/22/understanding-android-internals-surfaceflinger-ii/)
* [III](https://charleszblog.wordpress.com/2014/02/23/understanding-android-internals-surfaceflinger-iii/)
* [IV](https://charleszblog.wordpress.com/2014/02/24/understanding-android-graphic-surfaceflinger-iv/)
* [V](https://charleszblog.wordpress.com/2014/02/24/understanding-android-graphics-internals-surfaceflingerv/)

### [The Graphic Surface Service Interfaces](https://charleszblog.wordpress.com/2014/02/20/understanding-android-internals-the-graphics-service-interfaces/)

### [ Gralloc and HwComposer](https://charleszblog.wordpress.com/2014/02/21/understanding-android-internals-gralloc-and-hwcomposer/)


