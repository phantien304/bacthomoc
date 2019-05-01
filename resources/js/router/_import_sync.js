module.exports = (file) => {
    return require(`../components/${file}.vue`).default
};
