const list = [];
const configs = [];
class Page {
    static init() {
        Page.list().then(((data) => {
            list.push(...data);
            Page.render(true);
            Page.bindEvent();
        }));
        Page.configs().then(((data) => {
            configs.push(...data);
            Page.render2(true);
            Page.bindEvent2();
        }));
    }
    
    // 绑定事件
    static bindEvent() {
        // 新增按钮事件
        $('#main .btn').on('click', () => {
            Page.showDialog(-1);
        });
        // 操作按钮事件
        $('.main tbody').on('click', 'a', function operateEvent() {
            const index = $(this).parents('tr').index() - 1;
            if ($(this).data('type') === 'modify') {
                Page.showDialog(index);
            } else {
                list.splice(index, 1);
                Page.render();
            }
        });
        // 弹框确定按钮事件
        $('#dialog .btn').on('click', function btnEvent() {
            const index = $(this).data('index') * 1.0;
            const result = {
                url: $($('#dialog input')[0]).val(),
                file: $($('#dialog input')[1]).val(),
            };
            if (!result.url.length || !result.file.length) {
                alert('请填写必要参数');
                return;
            }
            if (index === -1) {
                list.push(result);
            } else {
                list[index] = result;
            }
            Page.render();
            $('#dialog').addClass('hide');
        });
        // 弹框取消按钮事件
        $('#dialog .cancel').off().on('click', () => {
            $('#dialog').addClass('hide');
        });
    }
    static showDialog(index) {
        if (index >= 0) {
            $($('#dialog input')[0]).val(list[index].url);
            $($('#dialog input')[1]).val(list[index].file);
        } else {
            $('#dialog input').val('');
        }
        $('#dialog').removeClass('hide').find('.btn').data('index', index);
    }
    // 渲染列表
    static render(isInit ) {
        !isInit && Page.update();
        const tpl = $('#item').html();

        $('tbody tr:gt(0)').remove();
        $('.none')[list.length === 0 ? 'removeClass' : 'addClass']('hide');
        list.forEach((item) => {
            $('tbody').append(tpl.replace('{url}', item.url).replace('{file}', item.file));
        });
    }
    static list() {
        return window.fetch('/plugin.qinglong/index/list', {
            credentials: 'include',
        }).then((response) => {
            const result = response.json();
            return result;
        }).then((result) => result.data);
    }
    static update() {
        window.fetch('/plugin.qinglong/index/update', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                list,
            }),
        });
    }

    // 绑定事件
    static bindEvent2() {
        // 新增配置按钮事件
        $('.config .btn').on('click', () => {
            Page.showDialog2(-1);
        });
        // 操作按钮事件
        $('.config tbody').on('click', 'a', function operateEvent() {
            const index = $(this).parents('tr').index() - 1;
            if ($(this).data('type') === 'modify') {
                Page.showDialog2(index);
            } else {
                list.splice(index, 1);
                Page.render2();
            }
        });
        // 弹框确定按钮事件
        $('#dialog2 .btn').on('click', function btnEvent() {
            const index = $(this).data('index') * 1.0;
            const result = {
                client_id: $($('#dialog2 input')[0]).val(),
                client_secret: $($('#dialog2 input')[1]).val(),
            };
            if (!result.client_id.length || !result.client_secret.length) {
                alert('请填写必要参数');
                return;
            }
            if (index === -1) {
                configs.push(result);
            } else {
                configs[index] = result;
            }
            Page.render();
            $('#dialog').addClass('hide');
        });
        // 弹框取消按钮事件
        $('#dialog2 .cancel').off().on('click', () => {
            $('#dialog2').addClass('hide');
        });
    }
    static showDialog2(index) {
        if (index >= 0) {
            $($('#dialog2 input')[0]).val(list[index].url);
            $($('#dialog2 input')[1]).val(list[index].file);
        } else {
            $('#dialog2 input').val('');
        }
        $('#dialog2').removeClass('hide').find('.btn').data('index', index);
    }
    // 渲染列表
    static render2(isInit ) {
        !isInit && Page.updateConfig();
        const tpl = $('#item2').html();

        $('tbody tr:gt(0)').remove();
        $('.none')[list.length === 0 ? 'removeClass' : 'addClass']('hide');
        list.forEach((item) => {
            $('tbody').append(tpl.replace('{client_id}', item.client_id).replace('{client_secret}', item.client_secret));
        });
    }
    static configs() {
        return window.fetch('/plugin.qinglong/index/configs', {
            credentials: 'include',
        }).then((response) => {
            const result = response.json();
            return result;
        }).then((result) => result.data);
    }
    static updateConfig() {
        window.fetch('/plugin.qinglong/index/updateConfig', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                configs,
            }),
        });
    }
}

$(() => {
    Page.init();
});
