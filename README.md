# Virtual Machine

**Project droped, working on a new one.**

It's a very simple virtual machine with basic operations. It works as a page application to interact with virtual arbitrary data.
The virtual machine is just at the beggining point with the client-side only. Next goal is to build a server in golang to interconnect with other virtual machines.

And all this for learning and fun! :)

## Updates

+ 1.0.0
  + Created Process Monitor
  + Created Desktop Component
    + Attach event message;
    + Open software on desktop area;
  + Created Softwares
    + Created default software RawText to open file data;
  + EventMessage for Desktop
    + Adpat to attach objects to communicate between VirtualMachine and Desktop;
  + FileSystem
    + Open File;
  + OperatingSystem
    + Many checks and locks to file;
    + Check opened softwares;

## TO-DO

+ Client-Side
  + Open files;
  + Module to communicate via HTTP;
+ Server-Side
  + Build it from the scratch;

## Technologies

+ Babel (ES2015);
  + Transform Class (Static classes);
+ React JS;
+ WebPack;

## Install

In the repository the main 'js' is already transformed. If something changes you will have to install NodeJs with NPM modules.

To install all the modules:
>npm install

To pack and transform the code:
>npm run pack

Any question, just let me know! :)
