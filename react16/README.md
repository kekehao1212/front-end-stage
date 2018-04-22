# 贝付收银台

## Author 

    <a href='https://github.com/TristanDongMaster '>tristan.dong</a>
    
## Github 

    

## 发布版本

   
    ## 发布版本
   5     日期 2017-03-25  版本 1.0.0 'daf82050'
   6     日期 2017-03-31  版本 1.0.1 '21f47a5b'
   7     日期 2017-04-01  版本 1.0.2 'b24db5c8'
   8     日期 2017-04-06  版本 1.0.3 '12376378'
   9     日期 2017-04-07  版本 1.0.4 '15ca9602'
  10     日期 2017-04-14  版本 1.0.6 'b0019d9b'
  11     日期 2017-04-28  版本 1.1.0 '7d23ff90'
  12     日期 2017-05-04  版本 1.1.1 '872ccd9c'
  13     日期 2017-05-19  版本 1.1.3 'ad2f9818'
  14     日期 2017-05-24  版本 1.1.2 '522c33ef' hotfix
  15     日期 2017-05-20  版本 1.2.0 '62abc69f'  -- 充转提
         日期 2017-05-25  版本 1.2.1 'acb766c6'  -- 钱包
         日期 2017-06-20  版本 1.2.4 '08b3d4e3'  -- 优化
         日期 2017-06-20  版本 1.3.1 '54acb57a'  -- 埋点 hot fix
         #日期 2017-06-29  版本 1.3.2 '38dfe638'  -- 收银台交互优化
         日期 2017-07-13  版本 1.3.3 '5b28ee39'  -- logo更新

         日期 2017-07-27  版本 1.4.0 '1bf6e69c'  -- 收银台UI优化
         日期 2017-08-10  版本 1.5.0 '35c36e89'  -- 收银台防刷
         日期 2017-08-15  版本 1.5.1 '35c36e89'  -- 收银台toast取消
         日期 2017-08-31  版本 1.6.1 'e34cf977'  -- 埋点
         日期 2017-09-01  版本 1.6.2 '861d527b'  -- 支付成功页兼容二维码
         
         日期 2017-09-07  版本 1.7.1 '91a57076'  -- 还款收银台
         日期 2017-09-21  版本 1.7.2 '98bc0585'  -- 后端埋点
         日期 2017-10-09  版本 1.7.3 'badec679'  -- hotfix 防刷
         日期 2017-10-12  版本 2.0.0 'd233662f'  -- 迁移绑卡实名支付
         日期 2017-10-19  版本 2.0.1 '47354877'  -- 唯品花还款rest 风格传参
         日期 2017-10-23  版本 2.0.2 'dd8a1508'  -- banner hotfix
         日期 2017-11-02  版本 2.0.3 'a2fe3d9f'  -- 支付后返和营销埋点
         日期 2017-11-02  版本 2.0.8 '55d3fccc'  -- 广告位跳转 hotfix
         日期 2017-11-16  版本 2.1.0 '5337810b'  -- 禁止刷新
         日期 2017-11-17  版本 2.1.1 '9db53190'  -- 禁止刷新cordova问题
         日期 2017-12-01  版本 2.2.1 '2c837ab2'  -- 金融APP接入ETC
         日期 2017-12-14  版本 3.0.0 '272f0a04'  -- 付款码二期-支付成功页页面改造
         日期 2017-12-21  版本 3.0.1 '3d4b11f6'  -- 绑卡支付结果查询失败
         日期 2017-01-18  版本 4.0.1 '23fb9488'  -- 唯品花
         日期 2017-02-08  版本 5.0.1 'e6be6003'  -- 商城主扫
         日期 2017-03-20  版本 5.1.0 '06ed58a0'  -- 唯金豆还款收银台
         日期 2017-04-03  版本 5.2.0 '06ed58a0'  -- 迁移收银台



## 文档说明

	1 api文档地址  http://gitlab.tools.vipshop.com/vpalDevelopDoc/vpal

	2 wiki交付物 http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=169119664

	3 唯宝精简SDK与H5协议 http://wiki.corp.vipshop.com/pages/viewpage.action?pageId=169444489

    4 react 15.6版本升级
        a. 重新安装：
            cnpm install --save react@^15.6.1 react-dom@^15.6.1
            cnpm install --save react-router@^3.0.5
        b. react-vera重新获取，分支react-vera-156
        c.  PropTypes单独引入
            import React, { Component,PropTypes } from 'react'
            改成：
             import React, { Component } from 'react'
             import PropTypes from 'prop-types'

## mock server 说明

1 http://10.101.141.175:9966

回归收单
10.199.48.114 test-mock.vpal.com
http://test-mock.vpal.com/paymock/cashier/CashierIndex.html

## host

    127.0.0.1 mc.vpal.com
    127.0.0.1 s.vpal.com

## nginx 

	http {
        include       mime.types;
        default_type  application/octet-stream;

        sendfile        on;
        keepalive_timeout  65;
        client_max_body_size 8M;

        upstream html-vpal {
            server  127.0.0.1:9000;
        }
        upstream static-vpal {
            server  127.0.0.1:9000;
        }
        upstream c-api-vpal {
            server  10.101.141.175:9966;# mock server
        }
        server {
            listen 443;
            server_name mc.vpal.com s.vpal.com;

            ssl on;
            ssl_certificate cert/admin.vip.vpal.com.crt;  # your ssl path
            ssl_certificate_key cert/admin.vip.vpal.com.key; # your ssl path

            location /api {
                proxy_pass http://c-api-vpal/api;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            }

            location / {
                proxy_pass http://html-vpal/;
                proxy_set_header Host $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Connection '';
                proxy_buffering off;
                proxy_http_version 1.1;
                chunked_transfer_encoding off;
            }
        }
    }

## scp

    scp -r build/*  root@10.199.201.106:/apps/svr/www/s.vpal.com/cashier-h5/


## url

支付成功页 - 标准收银台

    https://mc.ebatong.com/result?resultData=%7B%22payee%22%3A%22%E5%B9%BF%E5%B7%9E%E5%94%AF%E5%93%81%E4%BC%9A%E4%BF%A1%E6%81%AF%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8%22%2C%22payAmount%22%3A%220.95%22%2C%22amount%22%3A%220.75%22%2C%22payType%22%3A%7B%22type%22%3A%22PQ%22%2C%22bankCode%22%3A%22CMB%22%2C%22bankLogo%22%3A%22https%3A%2F%2Fs.vpalstatic.com%2Fappimage%2F170331%2FbankLogo%2Ficon_CMB%402x.png%22%2C%22cardPrefix%22%3A%22622576%22%2C%22cardSuffix%22%3A%224785%22%2C%22desc%22%3A%22%E6%8B%9B%E5%95%86%E9%93%B6%E8%A1%8C%E4%BF%A1%E7%94%A8%E5%8D%A1(4785)%22%7D%2C%22promotionModel%22%3A%7B%22type%22%3A%22MF%22%2C%22amount%22%3A%220.20%22%7D%2C%22coupons%22%3A%5B%5D%2C%22defaultCallback%22%3A%22http%3A%2F%2Ftest-mock.ebatong.com%2Fbeifu%2Fcallback%2FPayNotify2.jsp%22%2C%22callbackParams%22%3A%7B%22payment_order_no%22%3A%221708310001910360100%22%2C%22merc_no%22%3A%22100001%22%2C%22ac%22%3A%221089910000323090000%22%2C%22amount%22%3A%220.95%22%2C%22payment_time%22%3A%222017-08-31%2010%3A40%3A20%22%2C%22sign%22%3A%22JVhrqsj3iHOjLEo2pLePAsEhHcJQIdKDd3wVccb1FnRACqFFVSuPRTizw8baPbKqnmpf3oUtwcxZRqn5G7kKmyWK7LNt%2BNUrbM46tZLkMGdQYgpyeC0C0G0aK3ZjVyVgo1hxY94KGB88mu8m4F0nThoOpVodOe1MNMqXL9S9yPSXeVIQ3t3Fx7SQrRsZ0sVm%2BexgmbORAenaeDW0vi9NNGgqio2Wo0MDZ9YepsTYp1qvJbpNoURmXzhqnDLfCwuSsVswbA0Y%2FF6O1WKU8cGHyBgb9zeU3ddzoa8dmvx%2B7MhqNVlwNIwHRbjyxJ2PgE5cr0KronJwCqqMWNezEM1oSg%3D%3D%22%2C%22merc_order_no%22%3A%2240423761608173%22%2C%22token%22%3A%222089910000274970000%22%2C%22status%22%3A%221%22%7D%7D

支付成功页 - 银联二维码

    https://mc.ebatong.com/result?resultData=%7B%22amount%22%3A%22296.3%22%2C%22payAmount%22%3A%22300.0%22%2C%22payType%22%3A%7B%22bankCode%22%3A%22PAB%22%2C%22cardPrefix%22%3A%22621626%22%2C%22cardSuffix%22%3A%222485%22%2C%22cardType%22%3A1%2C%22desc%22%3A%22%E5%B9%B3%E5%AE%89%E9%93%B6%E8%A1%8C%282485%29%22%2C%22type%22%3A%22PQ%22%7D%2C%22payee%22%3A%22%E5%94%AF%E5%93%81%E6%94%AF%E4%BB%98%22%2C%22unionPromos%22%3A%7B%22amount%22%3A%223.7%22%2C%22name%22%3A%22%E9%83%91%E5%A8%9C%22%2C%22type%22%3A%22DD01%22%7D%7D


## add flow cli

### 1 install

    npm i  --save-dev babel-cli babel-preset-flow flow-babel-webpack-plugin

### 2 flow init  

    ./node_modules/.bin/flow init   

or

    flow init

### 3 .babelrc file 

    {
      "plugins" : [
        "transform-flow-comments"
      ]
    }

### 4 webpack.config.js file

    var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
    
    plugins: [
        new FlowBabelWebpackPlugin(),
    ],

### over!!!!

### deploy
    
    先执行： npm tun build
    完成后执行下面的：
    
    参数必写

    test 部署
    npm run deployHtml --b 'test' --cm 'autp deploy for new tool 3'
    npm run deployStatic --b 'test' --cm 'this is common s for autp deploy for new tool 3'

    release 部署
    npm run deployHtml --b 'release' --cm 'autp deploy for new tool 3'
    npm run deployStatic --b 'release' --cm 'this is common s for autp deploy for new tool 3'


    
