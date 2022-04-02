# Introduction
Some exercises/experiments to better understand promise behavior since I need to use them so much. A better understanding should produce promise chains with a more intuitive flow.

# Running
## get packages
run > npm install
## run a test
node 01-throws.js
node 02-nested-throws.js
node 03-realistic-test.js

# Test descriptions
## 01
Experimenting with how throws get handled.
## 02
Experimenting with how rejections get handled when multiple, separate promise chains are combined.
## 03
A realistic test where you check for a config file and it gets created if it doesn't exist, stopping the program from failing.