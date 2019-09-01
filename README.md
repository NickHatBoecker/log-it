# Log-it!

> Log-it! is a log viewer for local and remote log files built with electron-vue.

### Features
- Add local or remote log files to watch
- Remove log files
- Reload current watched log file automatically or manually
- Filter added log files
- Color highlighting (Violets are blue, errors are red...)
- Clear local log files
- Settings page
    - Show logfile name or full path
    - Toggle color highlighting

### More coming soon
- Detect and alert about new lines/errors

### Requirements
- rsync for remote log files (because log files are copied)
- ssh access to remote log files

### Install
@TODO

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
