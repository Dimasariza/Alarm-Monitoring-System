module.exports = {
    resolve: {
        fallback: { "path": require.resolve("path-browserify") }
    },
    target: 'electron-renderer'
}
