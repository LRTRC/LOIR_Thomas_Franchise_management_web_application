# front-end

## Build Setup
(Be sure to be in the root folder /LOIR_Thomas_Franchise_management_web_application/front/)
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3001
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).


## Environment variables
On dev setup, create a .env file in root folder : '/LOIR_Thomas_Franchise_management_web_application/front/' and set
```bash
# API url
API_URL=http://localhost:3000
```
For detailed explanation on how things work, check out the [documentation](https://github.com/motdotla/dotenv).


## Unit tests with Jest
To run tests
(Be sure to be in the root folder /LOIR_Thomas_Franchise_management_web_application/front/)
```bash
# run all tests
$ npm run test
# run the 'delete' franchisee component tests
$ npm test franchisees/store_franchisees
# run vuex store
$ npm test franchisees/store_franchisees
# run vuex store 'errors'
$ npm test errors/store_errors
```

For detailed explanation on how things work, check out the [documentation](https://jestjs.io/).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
