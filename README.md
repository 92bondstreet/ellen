# Ellen

> Take care of your team thanks [SWLW newsletter](http://softwareleadweekly.com) and [Oren Ellenbogen](http://softwareleadweekly.com/about)

![Photo by @markusspiske](https://source.unsplash.com/sFydXGrt5OA/800x600)

## 🖥️ [Live demo](https://ellen.now.sh)

## 🏗️ Installation

```sh
❯ git clone git@github.com:92bondstreet/ellen.git
❯ yarn
```

## 🕹️ Usage

### Parse all issues and save them into mongodb

```sh
❯ make parse
❯ MONGODB_HOST=ip:port make parse
```

### Start graphql sandbox

```sh
❯ make sandbox-api
❯ MONGODB_HOST=ip:port make sandbox
```

### Start graphql server

```sh
❯ make start
❯ MONGODB_HOST=ip:port make start
```

### Start react app (with apollo) sandbox

```sh
❯ make sandbox
```


## 🚀 Deploy

```sh
# define the mongodb host
❯ now secret add ellen-mongodb-host ip:port
❯ make deploy
```
