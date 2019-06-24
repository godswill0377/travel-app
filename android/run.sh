#!/bin/bash

./gradlew ${1:-installDevDebug} --stacktrace && adb shell am start -n com.yourcompany.appname/host.exp.exponent.MainActivity
