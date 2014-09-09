---
layout: post
title: "Ubuntu Tips"
date: 2014-09-09 18:35:34 +0800
comments: true
toc: true
categories: [Ubuntu, Linux, vim, cscope, tmux, rdesktop, mount, bash]
---
## bash

[Run bash terminal as a login shell](http://askubuntu.com/questions/161249/bashrc-not-executed-when-opening-new-terminal)
{% codeblock ~/.profile lang:bash %}
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
        . "$HOME/.bashrc"
    fi
fi
{% endcodeblock %}



## vim

![vim cheatsheet](http://www.viemu.com/vi-vim-cheat-sheet.gif)

```
.               # Position of the last change
' or `          # Position before last jump
`. or '.        # Go back to last edit top
:               # command mode
:set paste      # auto indent for code paste
:set number     # display line number
:1,$s/<target string>/<replace string>/ # replace strings
```

## [cscope](http://softsmith.blogspot.tw/2009/01/vim-cscope-trace.html)
```
cscope -bkR     # create tags
ctrl-]          # go to symbol
ctrl-t          # return to last tag stack
```

## [tmux](http://blog.longwin.com.tw/2011/04/tmux-learn-screen-config-2011/)
```
tmux ls                             # list tmux sessions
tmux new session -s [session name]  # create new session
tmux attach -t [session name]       # attach session
ctrl-b + c                          # create new window
ctrl-b + ,                          # rename window
ctrl-b + w                          # switch windows
ctrl-b + s                          # switch sessions
```

## [shellscript](http://www.suse.url.tw/sles10/lesson10.htm shell)

{% codeblock declare integer lang:bash %}
declare -i y=10
declare -i z=0
z=$(( x + y ))
{% endcodeblock %}

{% codeblock while loop lang:bash %}
loop=0
while true;
do
loop=$(($loop+1))
echo $loop
done
{% endcodeblock %}

{% codeblock rename folder lang:bash %}
for NAME in `ls`;
do
    NEWNAME=`echo $NAME | tr -d 'bug'`;
    mv $NAME $NEWNAME;
done
{% endcodeblock %}

## remote desktop

* Access Windows OS Desktop

{% codeblock lang:bash %}
rdesktop -u "[domain name]\[account]" -g 1920x1080 -D [ip address]
{% endcodeblock %}

* Access Ubuntu Shared Folders

Check [link](http://www.7tutorials.com/how-access-ubuntu-shared-folders-windows-7)

## mount

* Samba 

{% codeblock lang:bash %}
sudo apt-get install cifs-utils
sudo mkdir /media/test/
sudo mount.cifs //[path to share folder] /media/test/ -o username=[account],password="[password]"
{% endcodeblock %}

* ISO Image

{% codeblock lang:bash %}
sudo mkdir /media/iso/
sudo mount [file].iso /media/iso/ -t iso9660 -o loop
{% endcodeblock %}

## Useful utility

* man: on-line reference manuals interface
{% codeblock lang:bash %}
$man -f <utility|function>
{% endcodeblock %}

* axel: A light download accelerator for Linux
{% codeblock lang:bash %}
$axel -n <number of connections> <link to file>
{% endcodeblock %}

* gqview: read raw file

* ffmpeg: strip video from file
{% codeblock lang:bash %}
$ffmpeg -i sling60.ts -an -vcodec copy avc.ts
{% endcodeblock %}

* date
{% codeblock lang:bash %}
$date +%G%m%d-%H%M%S
{% endcodeblock %}

* tcpdump
{% codeblock lang:bash %}
$tcpdump -i any -s 2048 -tt -n -vvv -xX -w <log.txt>
{% endcodeblock %}
