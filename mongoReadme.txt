First, install MongoDB by running the following command from the Terminal:

$ sudo apt-get install -y mongodb-org
Then, from the terminal, run the following command to start Mongo:

$ mongod --bind_ip=$IP --nojournal
The output will include:

...
waiting for connections on port 27017
Now you can open the mongo shell in a new Terminal, running following command:

$ mongo
To stop the MongoDB instance press Control + C in the Terminal where mongod is running. Now have a look at the currently used database:

$ mongo
mongo> db
test

cd ~
wget -O cf.tgz 'https://cli.run.pivotal.io/stable?release=linux64-binary&source=github'
tar xvzf cf.tgz