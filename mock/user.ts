import { Request, Response } from 'express';
import { delay } from 'roadhog-api-doc';

export default delay(
  {
    'POST /api/system/user/info': {
      status: 0,
      res: {
        userId: 1,
        deptId: 1,
        userName: 'XueYou',
        userType: 'boss',
        email: 'xueyoucd@gmail.com',
        phonenumber: '15521451231',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        sex: '1',
        remark: '海纳百川，有容乃大',
        buttons: [
          'system:user:view',
          'monitor:online:view',
          'system:role:view',
          'monitor:job:view',
          'tool:gen:view',
          'system:menu:view',
          'monitor:operlog:view',
          'system:dept:view',
          'monitor:loginInfo:view',
          'system:dict:view',
          'system:config:view',
          'system:notice:view',
          'system:oss:view',
        ],
      },
    },
    'POST /api/system/user/update': {
      status: 0,
    },
    'POST /api/system/notices/user': (req: Request, res: Response) => {
      return res.send({
        status: 0,
        res: [
          {
            id: '000000001',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            title: '你收到了 14 份新周报',
            datetime: '2017-08-09',
            type: 'notification',
          },
          {
            id: '000000002',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
            title: '你推荐的 曲妮妮 已通过第三轮面试',
            datetime: '2017-08-08',
            type: 'notification',
          },
          {
            id: '000000003',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
            title: '这种模板可以区分多种通知类型',
            datetime: '2017-08-07',
            read: true,
            type: 'notification',
          },
          {
            id: '000000004',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            datetime: '2017-08-07',
            type: 'notification',
          },
          {
            id: '000000005',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            title: '内容不要超过两行字，超出时自动截断',
            datetime: '2017-08-07',
            type: 'notification',
          },
          {
            id: '000000006',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '曲丽丽 评论了你',
            description: '描述信息描述信息描述信息',
            datetime: '2017-08-07',
            type: 'message',
            clickClose: true,
          },
          {
            id: '000000007',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '朱偏右 回复了你',
            description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
            datetime: '2017-08-07',
            type: 'message',
            clickClose: true,
          },
          {
            id: '000000008',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '标题',
            description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
            datetime: '2017-08-07',
            type: 'message',
            clickClose: true,
          },
          {
            id: '000000009',
            title: '任务名称',
            description: '任务需要在 2017-01-12 20:00 前启动',
            extra: '未开始',
            status: 'todo',
            type: 'event',
          },
          {
            id: '000000010',
            title: '第三方紧急代码变更',
            description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
            extra: '马上到期',
            status: 'urgent',
            type: 'event',
          },
          {
            id: '000000011',
            title: '信息安全考试',
            description: '指派竹尔于 2017-01-09 前完成更新并发布',
            extra: '已耗时 8 天',
            status: 'doing',
            type: 'event',
          },
          {
            id: '000000012',
            title: 'ABCD 版本发布',
            description: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
            extra: '进行中',
            status: 'processing',
            type: 'event',
          },
        ],
      });
    },
    'POST /api/system/menu/user': (req: Request, res: Response) => {
      return res.send({
        status: 0,
        res: [
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 8,
            menuName: 'welcome',
            parentName: null,
            parentId: 0,
            target: '',
            orderNum: '1',
            menuType: 'M',
            menuKey: '/',
            component: 'PageView',
            visible: '0',
            perms: '',
            icon: 'dashboard',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 1,
            menuName: 'system',
            parentName: null,
            parentId: 0,
            target: '',
            orderNum: '1',
            menuType: 'M',
            menuKey: 'system',
            component: 'PageView',
            visible: '0',
            perms: '',
            icon: 'setting',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 100,
            menuName: 'user',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '1',
            menuType: 'C',
            menuKey: 'user',
            component: 'system/UserList',
            visible: '0',
            perms: 'system:user:view',
            icon: 'user',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 109,
            menuName: 'online-user',
            parentName: null,
            parentId: 2,
            target: '',
            orderNum: '1',
            menuType: 'C',
            menuKey: 'online',
            component: 'monitor/OnlineList',
            visible: '0',
            perms: 'monitor:online:view',
            icon: '',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 2,
            menuName: 'monitor',
            parentName: null,
            parentId: 0,
            target: '',
            orderNum: '2',
            menuType: 'M',
            menuKey: 'monitor',
            component: 'PageView',
            visible: '0',
            perms: '',
            icon: 'video-camera',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 101,
            menuName: 'role',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '2',
            menuType: 'C',
            menuKey: 'role',
            component: 'system/RoleList',
            visible: '0',
            perms: 'system:role:view',
            icon: 'safety',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 110,
            menuName: 'job',
            parentName: null,
            parentId: 2,
            target: '',
            orderNum: '2',
            menuType: 'C',
            menuKey: 'job',
            component: 'monitor/JobList',
            visible: '0',
            perms: 'monitor:job:view',
            icon: '',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 114,
            menuName: 'gen-code',
            parentName: null,
            parentId: 3,
            target: '',
            orderNum: '2',
            menuType: 'C',
            menuKey: 'gen',
            component: 'gen/GenList',
            visible: '0',
            perms: 'tool:gen:view',
            icon: '',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 3,
            menuName: 'tool',
            parentName: null,
            parentId: 0,
            target: '',
            orderNum: '3',
            menuType: 'M',
            menuKey: 'tool',
            component: 'PageView',
            visible: '0',
            perms: '',
            icon: 'tool',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 102,
            menuName: 'menu',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '3',
            menuType: 'C',
            menuKey: 'permission',
            component: 'system/PermissionList',
            visible: '0',
            perms: 'system:menu:view',
            icon: 'menu',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 500,
            menuName: 'operlog',
            parentName: null,
            parentId: 2,
            target: '',
            orderNum: '3',
            menuType: 'C',
            menuKey: 'oper',
            component: 'monitor/OperLogList',
            visible: '0',
            perms: 'monitor:operlog:view',
            icon: '',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 103,
            menuName: 'dept',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '4',
            menuType: 'C',
            menuKey: 'dept',
            component: 'system/DeptList',
            visible: '0',
            perms: 'system:dept:view',
            icon: 'dept',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 501,
            menuName: 'loginLog',
            parentName: null,
            parentId: 2,
            target: '',
            orderNum: '4',
            menuType: 'C',
            menuKey: 'loginLog',
            component: 'monitor/LoginLogList',
            visible: '0',
            perms: 'monitor:loginInfo:view',
            icon: '',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 105,
            menuName: 'dict',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '6',
            menuType: 'C',
            menuKey: 'dict',
            component: 'system/DictList',
            visible: '0',
            perms: 'system:dict:view',
            icon: 'snippets',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 106,
            menuName: 'config',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '7',
            menuType: 'C',
            menuKey: 'config',
            component: 'system/ConfigList',
            visible: '0',
            perms: 'system:config:view',
            icon: 'control',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-03-16 11:33:00',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 107,
            menuName: 'notice',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '8',
            menuType: 'C',
            menuKey: 'notice',
            component: 'system/NoticeList',
            visible: '0',
            perms: 'system:notice:view',
            icon: 'sound',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
          {
            createBy: null,
            createTime: '2018-11-16 13:59:45',
            updateBy: null,
            updateTime: null,
            searchValue: null,
            beginTime: null,
            endTime: null,
            params: {},
            menuId: 200,
            menuName: 'oss',
            parentName: null,
            parentId: 1,
            target: '',
            orderNum: '10',
            menuType: 'C',
            menuKey: 'oss',
            component: 'system/OssList',
            visible: '0',
            perms: 'system:oss:view',
            icon: 'file',
            path: null,
            redirect: null,
            hiddenChildren: null,
            hiddenHeader: null,
            remark: null,
            children: [],
          },
        ],
      });
    },
  },
  700,
);
