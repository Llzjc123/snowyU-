export default {
    login: 'login/wxlogin',
    index: {
        banner: 'banner/index',
        nav_one: 'index/indexNav',
        nav_hot: 'index/get_hot_category',
        goods_list: 'index/getgoodslist',
        search_list: 'index/search_atr',
        qR_code: 'weixin/generateQRcode', //获取二维码
        index_gxz: 'index/gxz', //消费扶贫排行榜
        index_fptp: 'index/fptp', //扶贫首页轮播
        index_thk_s: 'index/thk_s', //提货卡搜索接口
        index_thk_dh: 'index/thk_dh', //兑换接口
        index_thk_user: 'index/thk_user', //我的提货卡兑换记录列表
        index_thk_ny: 'index/thk_ny', //提货卡兑换记录详情
        index_banner: 'index/banner_api', //拼团秒杀图片
        is_show_shop:'index/is_show_sj',//是否展示商家
    },
    category: {
        producy_category: 'index/get_secondary_category',
        store_list: 'store/storeList',
        store_info: 'store/storeinfo'
    },
    coupon: {
        get_coupon_list: 'index/getcouponlist',
        get_coupon: 'index/receivecoupon'
    },

    cart: {
        cart_list: 'index/getshopcartlist',
        add_cart: 'index/shopcartadd',
        edit_cart: 'index/shopcartedit',
        del_cart: 'index/shopcartdel',
        collect: 'index/getcollectlist',
        add_collect: 'index/goodscollectadd',
        del_collect: 'index/goodscollectdel',
        cart_num: 'index/getusercartnums',
    },

    product: {
        pro_detail: 'index/getgoodsinfo',
        pro_seckill_detail: 'seckill/getseckillsinfo',
        pro_attr: 'index/getgoodsattr',
        add_order: 'index/orderadd',
        order_list: 'index/getorderlist',
        order_detail: 'index/getorderinfo',
        now_buy: 'index/ordernowadd', //立即购买
        order_del: 'index/orderdel', //删除订单
        pay_order: 'index/payment', //去支付
        pay_refund: 'user/userrefundapply', //申请退款
        pay_tuan_order: 'combination/payment', //团购去支付
        pay_miao_order: 'seckill/payment', //秒杀去支付
        confirm_order: 'user/userconfirmgoods', //确认收货
        comment_order: 'user/goodsevaluate', //评价商品
        comment_list: 'index/goodsevaluatelist', //商品评价列表
        product_time_list: 'seckill/getseckillslist', //秒杀商品列表
        product_time_buy: 'seckill/seckillorder', //秒杀商品购买
        product_combination_list: 'combination/getcombinalist', //团购商品列表
        product_combination_detail: 'combination/getcombinainfo', //团购商品详情
        product_combination_add: 'combination/opencombinaadd', //团购开团
        product_combination_info: 'combination/getcombinainfos', //拼团详情
        user_getuserintegral: 'index/getuserintegral', //用户可用积分
        cart_order_list: 'index/order_list', //获取购物车订单列表
        store_wuliu: 'store/wuliu', //查询物流
        store_wuliu_company: 'store/wuliu_company', //快递公司名称  
    },

    user: {
        unit_sign: 'user/unit_sign', //身份标识
        update_userInfo: 'user/updateUserInfo',
        save_address: 'user/save_address',
        sign: 'user/usersignadd',
        sign_list: 'user/usersign',
        address_list: 'index/getaddresslist', //地址列表
        add_address: 'index/addressadd', //添加地址
        edit_address: 'index/addressedit', //修改地址
        set_moren: 'index/addressdel', //设置默认地址/删除地址
        get_moren: 'index/getaddressinfo', //获取默认地址
        my_coupon: 'index/getmycouponlist',
        user_center: 'user/index', //个人中心
        cash_out: 'user/userextractadd', //提现申请
        user_apply: 'user/user_apply', //分销申请
        my_store: 'user/getuserdistribute', //分销中心
        fenxiao_info: 'index/fenxiao', //分销说明
        order_profit_list: 'user/getorderprofitlist', //分销订单
        store_center_login: 'store/storeCenter', //商户中心登录
        user_add_leave: 'user/add_leave', //用户留资
        user_team_list: 'user/getuserteamlist', //分销团队
        order_money_list: 'user/getorderprofitlistB', //分销账单
        order_extract_list: 'user/getuserextractlist', //交易流水
        user_store_list: 'store/getorderlist', //商户订单信息
        store_fahuo: 'store/fahuo', //商户发货
        store_tuikuan: 'index/updateRefundY', //商户退款

    },
    news: {
        news_list: 'news/getnewslist', //新闻列表
        news_info: 'news/getnewsinfo', //活动推送详情
        news_message: 'index/bmxx', //便民信息
        bmxx_info: 'index/onleave'
    }
};