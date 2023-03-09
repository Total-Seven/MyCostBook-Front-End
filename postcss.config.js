module.exports = {
    plugins: {
        "postcss-mobile-forever": {
            rootSelector: '.app',
            viewportWidth: 420, // 设计稿宽度
            // maxDisplayWidth: 600, // 视图的最大宽度，超过该宽度则视图居中，视图宽度不变
            disableLandscape: false, // 关闭横屏适配
            disableDesktop: false, // 关闭桌面端适配
            // unitPrecision: 6,
            // propList: ['*'],
        },
    }
}