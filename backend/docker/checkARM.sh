#!/bin/bash

cmd() {
    cat /proc/cpuinfo | grep ARM
}

string="$(cmd)"

if [[ $string == *"ARM"* ]]
then
    echo true
else
    echo false
fi