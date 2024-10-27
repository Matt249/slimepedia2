# Slimepedia 2
A web equivalent of the Slimepedia in Slime Rancher 2 :)

# Runing locally
Don't forget to install packages first before running with `npm install`.

Then you can run the app with `npm start`, and will be accessible to `localhot:3000`. If anything Node will tell you what is the app's adress.

# Build/Publish
You can build this app with `npm run build`, wich will create a version usable with any web page provider such as Apache2 or Nginx.
By default, it will be located in a build/ folder, but you can override with a .env file (already in the .gitignore) and specify your path for this with this:
```
BUILD_PATH='your/path/to/build/location/'
PUBLIC_URL='url/of/the/target'
```
