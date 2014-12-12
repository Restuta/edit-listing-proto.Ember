##Todo:
 * ~~define app urls~~
 * ~~when price is entered, price labels should be recalculated in real-time~~
 * ~~drop-downs should be pre-populated with different data, depending on what is selected~~
 * ~~load view with model and populate template with model data~~
 * ~~load model using GET `localhost/api/listings/drafts/:id`~~
 * ~~may need local server for that (can be done with node and express in 5 mins or Nancy for .NET)~~
 * after editing is done do PUT to `/api/listings/drafts/:id`
 * support async model loading in some way, show a spinner on top of pre-rendered model

##Ember specific:
 * split templates/controllers/views/ and routes to separate files
 * move it to EmberCLI
 * ~~upgrade to Ember 1.9~~
 * switch proto to Fortune.JS from Express
 * figure out how to define recursive model "category that has sub-categories"
 
##How to run on Windows
```
#clone project from GitHub
git clone https://github.com/Restuta/edit-listing-proto.Ember.git

#install chocolatey
iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))

#install NodeJS and npm
choco install nodejs.install

#download and install all project dependencies
npm update 

#instaull Grunt javascript task runner and it's cli tools
npm install -g grunt
npm install -g grunt-cli

#install Ruby
choco install ruby
choco install rubygems

#restart console to refresh env variables

#fix nasty Ruby issue with SSL
Invoke-WebRequest http://curl.haxx.se/ca/cacert.pem -OutFile c:\cacert.pem
Set-Item -Path env:SSL_CERT_FILE -Value C:\cacert.pem

#install Compass css pre-processor using Ruby gems
gem install compass

#install Bower
npm install -g bower

#download dependencies from bower
bower update

#run local server + autoreload for the project
grunt serve
```
