module.exports = (options, app) => {
    // 这里的 app 为 think.app 对象
    return async (ctx, next) => {
        //部分 action 下不检查
        let blankActions = ["/index/login"];
        console.log(ctx.url);
        if (blankActions.indexOf(ctx.url) >= 0) {
            return next();
        }
        let user = await ctx.session("user");
        if (think.isEmpty(user)) {
            return ctx.redirect("/index/login");
        }
        else{
            return next();
        }
    }
}