"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      openid: "",
      managerform: {},
      userform: {},
      target: "",
      isManager: false,
      isLogin: 0,
      userInfo: {},
      color: "#7A7E83",
      pattern: {
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      content: [
        {
          iconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "学生",
          active: true
        },
        {
          iconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "教师",
          active: false
        }
      ],
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      form: {
        email: "",
        password: ""
      }
    };
  },
  onShow() {
    console.log(getApp().globalData.uid);
    common_vendor.index.request({
      header: { "Authorization": getApp().globalData.token },
      url: getApp().globalData.urlRoot + "/user/getInfo",
      data: { uid: getApp().globalData.uid },
      method: "POST",
      success: (res) => {
        console.log(res);
        if (res.data.error_code === 0) {
          this.isLogin = 1;
          this.userInfo = res.data;
        } else {
          this.isLogin = 0;
        }
      }
    });
  },
  methods: {
    userEdit() {
      var that = this;
      if (that.userform.password === that.userform.password1) {
        common_vendor.index.request({
          header: {
            "Authorization": getApp().globalData.token,
            "content-type": "application/x-www-form-urlencoded"
          },
          url: getApp().globalData.urlRoot + "/user/wx_Register",
          data: {
            "studentId": that.userform.studentId,
            "name": that.userform.name,
            "college": that.userform.college,
            "acc": that.userform.email,
            "pwd": that.userform.password,
            "phoneNumber": that.userform.number,
            "openid": that.openid
          },
          method: "POST",
          success: (res) => {
            that.form.email = that.userform.email;
            that.form.password = that.userform.password;
            that.submitLogin();
            that.$refs.userRe.close();
          }
        });
      } else {
        console.log("两次密码不一致");
      }
    },
    managerEdit() {
      var that = this;
      if (that.managerform.password == that.managerform.password1) {
        common_vendor.index.request({
          header: {
            "Authorization": getApp().globalData.token,
            "content-type": "application/x-www-form-urlencoded"
          },
          url: getApp().globalData.urlRoot + "/manager/wx_Register",
          data: {
            "acc": that.managerform.email,
            "teacherId": that.managerform.tId,
            "name": that.managerform.name,
            "pwd": that.managerform.password,
            "phoneNumber": that.managerform.number,
            "openid": that.openid
          },
          method: "POST",
          success: (res) => {
            that.form.email = that.managerform.email;
            that.form.password = that.managerform.password;
            that.submitLogin();
            that.$refs.managerRe.close();
          }
        });
      } else {
        console.log("两次密码不一致");
      }
    },
    wxlogin() {
      var that = this;
      let wxspAppid = "wxc6210b45fc53b29d";
      let wxspSecret = "a84513f04d24a63539294f919b61cacd";
      let oid = "";
      let isM = "0";
      if (this.isManager) {
        isM = "1";
      } else {
        isM = "0";
      }
      common_vendor.index.login({
        provider: "weixin",
        success(res) {
          if (res.code) {
            common_vendor.index.request({
              //这里填你自己的appid 和 wxspSecret 
              url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxspAppid + "&secret=" + wxspSecret + "&js_code=" + res.code + "&grant_type=authorization_code",
              method: "POST",
              success(res2) {
                oid = res2.data.openid;
                that.openid = oid;
                common_vendor.index.request({
                  header: {
                    "Authorization": "wutoken",
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  url: getApp().globalData.urlRoot + "/manager/wxlogin",
                  data: {
                    "openid": oid,
                    "isM": isM
                  },
                  method: "POST",
                  success: (res3) => {
                    if (res3.data.haveuser === "1") {
                      console.log("到这里");
                      that.form.email = res3.data.email;
                      that.form.password = res3.data.pwd;
                      that.wxsubmitLogin();
                    } else {
                      console.log("没有检测到");
                      if (that.isManager) {
                        that.$refs.managerRe.open("center");
                      } else {
                        that.$refs.userRe.open("center");
                      }
                    }
                  }
                });
              },
              fail(data) {
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    },
    logout() {
      this.isLogin = 0;
      getApp().globalData.uid = -1;
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/unLogin",
        data: { uid: getApp().globalData.uid },
        method: "POST",
        success: (res) => {
          console.log(res);
          if (res.data.error_code === 0) {
            this.isLogin = 1;
            this.userInfo = res.data;
            getApp().globalData.token = "wutoken";
          }
        }
      });
    },
    toweb() {
      this.$refs.toWeb.open();
    },
    goTools() {
      common_vendor.index.navigateTo({
        url: "/pages/stu-Main/stu-Main"
      });
    },
    editInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/self/self"
      });
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/newPassword/newPassword"
      });
    },
    submitLogin() {
      console.log(this.form.password);
      getApp().globalData.token = "wutoken";
      console.log(this.form);
      this.target = "/user/login";
      if (this.isManager) {
        this.target = "/manager/Login";
      }
      console.log(this.target);
      console.log(getApp().globalData.token);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + this.target,
        data: { "acc": this.form.email, "pwd": this.form.password },
        header: { "Authorization": getApp().globalData.token },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code == 0) {
            getApp().globalData.uid = res.data.uid;
            getApp().globalData.token = res.data.hash_code;
            common_vendor.index.showToast({
              title: "登录成功！",
              icon: "none"
            });
            if (this.isManager) {
              common_vendor.index.navigateTo({
                url: "/pages/Teacher/tea-main/tea-main"
              });
            } else {
              common_vendor.index.request({
                header: { "Authorization": getApp().globalData.token },
                url: getApp().globalData.urlRoot + "/user/getInfo",
                data: { uid: getApp().globalData.uid },
                method: "POST",
                success: (res2) => {
                  if (res2.data.error_code === 0) {
                    this.isLogin = 1;
                    this.userInfo = res2.data;
                  }
                }
              });
            }
          } else if (res.data.error_code == 2 || res.data.error_code == 4) {
            common_vendor.index.showToast({
              title: String("用户名或密码不正确！"),
              icon: "none"
            });
          }
        }
      });
    },
    wxsubmitLogin() {
      console.log(this.form.password);
      getApp().globalData.token = "wutoken";
      console.log(this.form);
      this.target = "/user/hashLogin";
      if (this.isManager) {
        this.target = "/manager/hashLogin";
      }
      console.log(this.target);
      console.log(getApp().globalData.token);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + this.target,
        data: { "acc": this.form.email, "pwd": this.form.password },
        header: { "Authorization": getApp().globalData.token },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code == 0) {
            getApp().globalData.uid = res.data.uid;
            getApp().globalData.token = res.data.hash_code;
            common_vendor.index.showToast({
              title: "登录成功！",
              icon: "none"
            });
            if (this.isManager) {
              common_vendor.index.navigateTo({
                url: "/pages/Teacher/tea-main/tea-main"
              });
            } else {
              common_vendor.index.request({
                header: { "Authorization": getApp().globalData.token },
                url: getApp().globalData.urlRoot + "/user/getInfo",
                data: { uid: getApp().globalData.uid },
                method: "POST",
                success: (res2) => {
                  if (res2.data.error_code === 0) {
                    this.isLogin = 1;
                    this.userInfo = res2.data;
                  }
                }
              });
            }
          } else if (res.data.error_code == 2 || res.data.error_code == 4) {
            common_vendor.index.showToast({
              title: String("用户名或密码不正确！"),
              icon: "none"
            });
          }
        }
      });
    },
    fabClick() {
      common_vendor.index.showToast({
        title: "切换登录方式",
        icon: "none"
      });
    },
    trigger(e) {
      console.log(e);
      if (e.index === 1) {
        this.content[e.index].active = !e.item.active;
        this.content[0].active = !e.item.active;
        this.isManager = true;
      } else {
        this.content[e.index].active = !e.item.active;
        this.content[1].active = !e.item.active;
        this.isManager = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_title2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_fab2 + _easycom_uni_forms2 + _easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_link2 + _easycom_uni_popup2)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_fab + _easycom_uni_forms + _easycom_uni_card + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_link + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin === 0
  }, $data.isLogin === 0 ? common_vendor.e({
    b: !$data.isManager
  }, !$data.isManager ? {
    c: common_vendor.p({
      type: "h1",
      title: "学生登录"
    })
  } : {}, {
    d: $data.isManager
  }, $data.isManager ? {
    e: common_vendor.p({
      type: "h1",
      color: "orange",
      title: "教师登录"
    })
  } : {}, {
    f: common_vendor.o(($event) => $data.form.email = $event),
    g: common_vendor.p({
      type: "text",
      placeholder: "请输入邮箱",
      modelValue: $data.form.email
    }),
    h: common_vendor.p({
      label: "邮箱",
      name: "name"
    }),
    i: common_vendor.o(($event) => $data.form.password = $event),
    j: common_vendor.p({
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.form.password
    }),
    k: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    l: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    m: common_vendor.sr("fab", "2ba1e30c-7,2ba1e30c-5"),
    n: common_vendor.o($options.trigger),
    o: common_vendor.o($options.fabClick),
    p: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: "right",
      vertical: "bottom",
      direction: _ctx.direction
    }),
    q: common_vendor.p({
      label: "密码",
      name: "name"
    }),
    r: common_vendor.p({
      modelValue: $data.form,
      ["label-position"]: "top"
    }),
    s: common_vendor.o((...args) => $options.submitLogin && $options.submitLogin(...args)),
    t: common_vendor.o((...args) => $options.wxlogin && $options.wxlogin(...args))
  }) : {}, {
    v: $data.isLogin === 1
  }, $data.isLogin === 1 ? {
    w: common_vendor.t($data.userInfo.college),
    x: common_vendor.t($data.userInfo.acc),
    y: common_vendor.t($data.userInfo.phoneNumber),
    z: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    A: common_vendor.p({
      title: $data.userInfo.name,
      extra: "学工号:" + $data.userInfo.studentId
    }),
    B: common_vendor.p({
      type: "eye-filled",
      size: "30"
    }),
    C: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    D: common_vendor.p({
      type: "person",
      size: "30"
    }),
    E: common_vendor.o((...args) => $options.editInfo && $options.editInfo(...args)),
    F: common_vendor.p({
      type: "settings-filled",
      size: "30"
    }),
    G: common_vendor.o((...args) => $options.goTools && $options.goTools(...args)),
    H: common_vendor.p({
      column: 3,
      highlight: true,
      square: true,
      ["show-border"]: false
    }),
    I: common_vendor.p({
      titleFontSize: "18px",
      title: "已登录",
      type: "line"
    })
  } : {}, {
    J: common_vendor.p({
      href: "http://121.4.160.157:8080/",
      text: "http://121.4.160.157:8080/"
    }),
    K: common_vendor.sr("toWeb", "2ba1e30c-17"),
    L: common_vendor.p({
      type: "top",
      ["background-color"]: "#fff"
    }),
    M: common_vendor.p({
      type: "h1",
      align: "center",
      title: "填写个人信息"
    }),
    N: common_vendor.o(($event) => $data.managerform.tId = $event),
    O: common_vendor.p({
      type: "text",
      placeholder: "您的学号",
      modelValue: $data.managerform.tId
    }),
    P: common_vendor.p({
      label: "工号",
      name: "name"
    }),
    Q: common_vendor.o(($event) => $data.managerform.name = $event),
    R: common_vendor.p({
      type: "text",
      placeholder: "您的姓名",
      modelValue: $data.managerform.name
    }),
    S: common_vendor.p({
      label: "姓名",
      name: "name"
    }),
    T: common_vendor.o(($event) => $data.managerform.email = $event),
    U: common_vendor.p({
      type: "text",
      placeholder: "您的邮箱",
      modelValue: $data.managerform.email
    }),
    V: common_vendor.p({
      label: "邮箱",
      name: "name"
    }),
    W: common_vendor.o(($event) => $data.managerform.number = $event),
    X: common_vendor.p({
      type: "text",
      placeholder: "您的电话",
      modelValue: $data.managerform.number
    }),
    Y: common_vendor.p({
      label: "电话",
      name: "name"
    }),
    Z: common_vendor.o(($event) => $data.managerform.password = $event),
    aa: common_vendor.p({
      type: "password",
      placeholder: "您的密码",
      modelValue: $data.managerform.password
    }),
    ab: common_vendor.p({
      label: "密码",
      name: "name"
    }),
    ac: common_vendor.o(($event) => $data.managerform.password1 = $event),
    ad: common_vendor.p({
      type: "password",
      placeholder: "重新输入您的密码",
      modelValue: $data.managerform.password1
    }),
    ae: common_vendor.p({
      label: "确认密码",
      name: "name"
    }),
    af: common_vendor.p({
      modelValue: $data.managerform,
      ["label-position"]: "left"
    }),
    ag: common_vendor.o(($event) => $options.managerEdit()),
    ah: common_vendor.sr("managerRe", "2ba1e30c-19"),
    ai: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    aj: common_vendor.p({
      type: "h1",
      align: "center",
      title: "填写个人信息"
    }),
    ak: common_vendor.o(($event) => $data.userform.studentId = $event),
    al: common_vendor.p({
      type: "text",
      placeholder: "您的学号",
      modelValue: $data.userform.studentId
    }),
    am: common_vendor.p({
      label: "学号",
      name: "name"
    }),
    an: common_vendor.o(($event) => $data.userform.name = $event),
    ao: common_vendor.p({
      type: "text",
      placeholder: "您的姓名",
      modelValue: $data.userform.name
    }),
    ap: common_vendor.p({
      label: "姓名",
      name: "name"
    }),
    aq: common_vendor.o(($event) => $data.userform.college = $event),
    ar: common_vendor.p({
      type: "text",
      placeholder: "您的学院",
      modelValue: $data.userform.college
    }),
    as: common_vendor.p({
      label: "学院",
      name: "name"
    }),
    at: common_vendor.o(($event) => $data.userform.email = $event),
    av: common_vendor.p({
      type: "text",
      placeholder: "您的邮箱",
      modelValue: $data.userform.email
    }),
    aw: common_vendor.p({
      label: "邮箱",
      name: "name"
    }),
    ax: common_vendor.o(($event) => $data.userform.number = $event),
    ay: common_vendor.p({
      type: "text",
      placeholder: "您的电话",
      modelValue: $data.userform.number
    }),
    az: common_vendor.p({
      label: "电话",
      name: "name"
    }),
    aA: common_vendor.o(($event) => $data.userform.password = $event),
    aB: common_vendor.p({
      type: "password",
      placeholder: "您的密码",
      modelValue: $data.userform.password
    }),
    aC: common_vendor.p({
      label: "密码",
      name: "name"
    }),
    aD: common_vendor.o(($event) => $data.userform.password1 = $event),
    aE: common_vendor.p({
      type: "password",
      placeholder: "重新输入您的密码",
      modelValue: $data.userform.password1
    }),
    aF: common_vendor.p({
      label: "确认密码",
      name: "name"
    }),
    aG: common_vendor.p({
      modelValue: $data.userform,
      ["label-position"]: "left"
    }),
    aH: common_vendor.o(($event) => $options.userEdit()),
    aI: common_vendor.sr("userRe", "2ba1e30c-35"),
    aJ: common_vendor.p({
      ["background-color"]: "#fff"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/git_clong/Tool_manage_BUAA/TTools/TTools/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
